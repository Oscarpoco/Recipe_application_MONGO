import Recipe from "../models/recipe.js";


// CREATE RECIPE
const createRecipe = async (req, res) => {
    try {
        const newRecipe = await Recipe.create(...req.body, userID = req.user._id);

        res.status(201).json(newRecipe);
    } catch (error) {
        res.status(500).json({ message: "Error creating recipe: " + error.message });
    }
}
// ENDS


// GET ALL RECIPES WITH PAGINATION
const getAllRecipes = async (req, res) => {

    // DEFAUL TO PAGE 1 AN LIMIT OF 15
    const { page = 1, limit = 15 } = req.query;
    // ENDS


    try {
        const recipes = await Recipe.find()

            // LIMIT THE NUMBER OF RECIPES RETURNED
            .limit(Number(limit))      
            // ENDS

            // SKIP THE NUMBER OF RECIPES RETURNED
            .skip((page - 1) * limit) // Skip the number of recipes based on the current page
            // ENDS

            // EXECUTE THE  QUERY
            .exec();
            // ENDS

        // GET THE TOTAL COUNT OF RECIPES
        const total = await Recipe.countDocuments(); 

        res.status(200).json({
            total,                          // Total number of recipes
            page: Number(page),             // Current page number
            limit: Number(limit),           // Items per page
            recipes                         // Recipes for the current page
        });
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// ENDS


// GET RECIPE  BY ID

const getRecipeById = async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);
        if (!recipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }
        res.status(200).json(recipe);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// ENDS


//  UPDATE  RECIPE BY ID

const updateRecipeById = async (req, res) => {
    try {
        const updatedRecipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, {
            new: true,  // Return the updated document
            runValidators: true  // Ensure the update follows schema validation rules
        });

        if (!updatedRecipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }

        res.status(200).json(updatedRecipe);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// ENDS


// DELETE RECIPE BY ID
const deleteRecipeById = async (req, res) => {
    try {
        const deletedRecipe = await Recipe.findByIdAndDelete(req.params.id);
        
        if (!deletedRecipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }

        res.status(200).json({ message: "Recipe deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// ENDS


// EXPORT ALL THE FUNCTIONS
export const createNewRecipe = createRecipe;
export const deleteRecipe =  deleteRecipeById;
export const updateRecipe = updateRecipeById;
export const getRecipe = getRecipeById;
export const getAllRecipe = getAllRecipes;
