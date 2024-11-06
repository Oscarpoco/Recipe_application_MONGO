import mongoose from "mongoose";
import validator from "validator";

const recipeSchema = new mongoose.Schema(
  {
    // USERID
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },

    // TITLE
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      validate: {
        validator: (value) => !validator.isEmpty(value),
        message: "Title cannot be empty",
      },
    },

    // DESCRIPTION

    description: {
      type: String,
      trim: true,
      validate: {
        validator: (value) => !validator.isEmpty(value),
        message: "Description cannot be empty",
      },
    },

    // INGREDIENTS

    ingredients: [
      {
        name: { type: String, required: [true, "Ingredient name is required"] },
        quantity: {
          type: String,
          required: [true, "Ingredient quantity is required"],
          validate: {
            validator: (value) => !validator.isEmpty(value),
            message: "Quantity cannot be empty",
          },
        },
        unit: {
          type: String,
          trim: true,
          default: "units",
        },
      },
    ],
    
    // STEPS

    steps: [
      {
        step_number: {
          type: Number,
          required: [true, "Step number is required"],
          min: [1, "Step number must be at least 1"],
        },
        instruction: {
          type: String,
          required: [true, "Instruction is required"],
          validate: {
            validator: (value) => !validator.isEmpty(value),
            message: "Instruction cannot be empty",
          },
        },
      },
    ],

    // COOK TIME

    cook_time: {
      prep_time: {
        type: String,
        validate: {
          validator: (value) => !validator.isEmpty(value),
          message: "Prep time cannot be empty",
        },
      },
      cook_time: {
        type: String,
        validate: {
          validator: (value) => !validator.isEmpty(value),
          message: "Cook time cannot be empty",
        },
      },
      total_time: {
        type: String,
        validate: {
          validator: (value) => !validator.isEmpty(value),
          message: "Total time cannot be empty",
        },
      },
    },

    // SERVINGS
    servings: {
      type: Number,
      required: [true, "Number of servings is required"],
      min: [1, "Servings must be at least 1"],
    },

    // DIFFICULTY
    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      required: [true, "Difficulty level is required"],
    },

    // CATEGORY
    category: {
      type: String,
      trim: true,
    },

    // CUISINE
    cuisine: {
      type: String,
      trim: true,
    },

    // NUTRITION INFO
    nutrition_info: {
      calories: { type: Number, min: [0, "Calories cannot be negative"] },
      fat: {
        type: String,
        validate: {
          validator: (value) => !validator.isEmpty(value),
          message: "Fat cannot be empty",
        },
      },
      protein: {
        type: String,
        validate: {
          validator: (value) => !validator.isEmpty(value),
          message: "Protein cannot be empty",
        },
      },
      carbohydrates: {
        type: String,
        validate: {
          validator: (value) => !validator.isEmpty(value),
          message: "Carbohydrates cannot be empty",
        },
      },
    },

    // AUTHOR
    author: {
      name: {
        type: String,
        required: [true, "Author name is required"],
        validate: {
          validator: (value) => !validator.isEmpty(value),
          message: "Author name cannot be empty",
        },
      },
      profile_url: {
        type: String,
        validate: {
          validator: (value) => validator.isURL(value),
          message: "Profile URL must be a valid URL",
        },
      },
    },

    // IMAGES
    images: [
      {
        type: String,
        validate: {
          validator: (value) => validator.isURL(value),
          message: "Each image must be a valid URL",
        },
      },
    ],

    // TAGS
    tags: [
      {
        type: String,
        trim: true,
      },
    ],

    // DATE CREATED
    date_created: {
      type: Date,
      default: Date.now,
    },

    // RATINGS
    ratings: {
      average_rating: {
        type: Number,
        default: 0,
        min: [0, "Rating cannot be negative"],
        max: [5, "Rating cannot exceed 5"],
      },
      number_of_reviews: {
        type: Number,
        default: 0,
        min: [0, "Number of reviews cannot be negative"],
      },
    },

    // NOTES
    notes: {
      type: String,
      trim: true,
    },
  },

//   TIMESTAMPS
  { timestamps: true }
);

// COLLECTION
const Recipe = mongoose.model("Recipe", recipeSchema);

export default Recipe;
