import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema(

    // RECIPE ITEM

    {
        title: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            trim: true
        },

        ingredients: [
            {
                name: { type: String, required: true },
                quantity: { type: String, required: true },
                unit: { type: String }
            }
        ],

        steps: [
            {
                step_number: { type: Number, required: true },
                instruction: { type: String, required: true }
            }
        ],

        cook_time: {
            prep_time: { type: String },
            cook_time: { type: String },
            total_time: { type: String }
        },

        servings: {
            type: Number,
            required: true
        },

        difficulty: {
            type: String,
            enum: ["Easy", "Medium", "Hard"],
            required: true
        },

        category: {
            type: String
        },

        cuisine: {
            type: String
        },

        nutrition_info: {
            calories: { type: Number },
            fat: { type: String },
            protein: { type: String },
            carbohydrates: { type: String }
        },

        author: {
            name: { type: String, required: true },
            profile_url: { type: String }
        },

        images: [
            {
                type: String
            }
        ],

        tags: [
            {
                type: String
            }
        ],

        date_created: {
            type: Date,
            default: Date.now
        },

        ratings: {
            average_rating: { type: Number, default: 0 },
            number_of_reviews: { type: Number, default: 0 }
        },
        
        notes: {
            type: String
        }
    },
    { timestamps: true }
);

const Recipe = mongoose.model("Recipe", recipeSchema);

export default Recipe;
