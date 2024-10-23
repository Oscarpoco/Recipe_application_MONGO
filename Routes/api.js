import express from "express";
import { createNewRecipe, deleteRecipe, updateRecipe, getRecipe, getAllRecipe } from "../Controllers/recipeController.js";
import { body, validationResult } from 'express-validator';

const router = express.Router();

// POST REQUEST
router.post(
    "/recipes",
    [
      body("title").notEmpty().withMessage("Title is required"),
      body("ingredients").isArray({ min: 1 }).withMessage("Ingredients must be an array and contain at least one item"),
      body("ingredients.*.name").notEmpty().withMessage("Each ingredient must have a name"),
      body("ingredients.*.quantity").notEmpty().withMessage("Each ingredient must have a quantity"),
      body("steps").isArray({ min: 1 }).withMessage("Steps must be an array and contain at least one step"),
      body("steps.*.instruction").notEmpty().withMessage("Each step must have an instruction"),
      body("servings").isInt({ min: 1 }).withMessage("Servings must be a positive number"),
      body("difficulty").isIn(["Easy", "Medium", "Hard"]).withMessage("Difficulty must be one of: Easy, Medium, or Hard"),
      body("author.name").notEmpty().withMessage("Author name is required"),
    ],
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    },
    createNewRecipe
  );

// GET REQUEST
router.get("/recipes", getAllRecipe);

// GET REQUEST USING ID
router.get("/recipes/:id", getRecipe);

// EDIT REQUEST
router.put("/recipes/:id", updateRecipe);

//  DELETE REQUEST
router.delete("/recipes/:id", deleteRecipe);


export default router;