import express from "express";
import { createNewRecipe, deleteRecipe, updateRecipe, getRecipe, getAllRecipe } from "../Controllers/recipeController.js";
import { LoginUser, createUser, getUsers } from "../Controllers/userController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { body, validationResult } from 'express-validator';

const router = express.Router();

// USER REGISTER AND LOGIN

router.post("/user", createUser);
router.post("/user/login",  LoginUser);

// FOR DEBUGGING CASE
router.get("/users", getUsers);

// ENDS


// POST REQUEST
router.post(
    "/recipes",
    [
        // CHECKING THE TITLE IF IT IS AVAILABLE
      body("title").notEmpty().withMessage("Title is required"),

        // CHECKING THE  ingredients IF IT IS AVAILABLE

      body("ingredients").isArray({ min: 1 }).withMessage("Ingredients must be an array and contain at least one item"),
      body("ingredients.*.name").notEmpty().withMessage("Each ingredient must have a name"),
      body("ingredients.*.quantity").notEmpty().withMessage("Each ingredient must have a quantity"),

        // CHECKING THE STEPS IF THEY ARE AVAILALE
      body("steps").isArray({ min: 1 }).withMessage("Steps must be an array and contain at least one step"),
      body("steps.*.instruction").notEmpty().withMessage("Each step must have an instruction"),

        // CHECKING IF THE SERVINGS  IS A NUMBER

      body("servings").isInt({ min: 1 }).withMessage("Servings must be a positive number"),

        // CHECKING THE DIFFICULTY  LEVEL IF IT IS AVAILABLE

      body("difficulty").isIn(["Easy", "Medium", "Hard"]).withMessage("Difficulty must be one of: Easy, Medium, or Hard"),

        // CHECKING THE AUTHOR NAME IF IT  IS AVAILABLE

      body("author.name").notEmpty().withMessage("Author name is required"),
    ],

    // ENDS

    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    },
    protect,
    createNewRecipe
  );
//   ENDS

// GET REQUEST
router.get("/recipes", getAllRecipe);

// GET REQUEST USING ID
router.get("/recipes/:id", protect, getRecipe);


// EDIT REQUEST
router.put("/recipes/:id", protect, updateRecipe);

//  DELETE REQUEST
router.delete("/recipes/:id", protect, deleteRecipe);


export default router;