# Recipe API

A RESTful API for managing cooking recipes, built with Node.js, Express, and MongoDB.

## 🚀 Features

- Complete CRUD operations for recipes
- Pagination support for recipe listings
- Input validation and error handling
- Detailed recipe schema including ingredients, steps, nutrition info, and more
- Author attribution and rating system
- Flexible search and filtering options

## 📋 Prerequisites

Before running this project, make sure you have:

- Node.js (v14 or higher)
- MongoDB
- npm or yarn package manager

## 🛠️ Installation

1. Clone the repository:
```bash
git clone oscarpoco/Recipe_application_MONGO
cd recipe-api
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```env
PORT=7000
MONGO_URL=your_mongodb_connection_string
```

4. Start the server:
```bash
npx run dev
npx nodemond server.js
```

## 🔌 API Endpoints

### Recipes

| Method | Endpoint               | Description                       |
|--------|------------------------|-----------------------------------|
| POST   | `/api/v1/recipes`      | Create a new recipe               |
| GET    | `/api/v1/recipes`      | Get all recipes (with pagination) |
| GET    | `/api/v1/recipes/:id`  | Get a specific recipe             |
| PUT    | `/api/v1/recipes/:id`  | Update a recipe                   |
| DELETE | `/api/v1/recipes/:id`  | Delete a recipe                   |

### Query Parameters

- `page`: Page number for pagination (default: 1)
- `limit`: Number of items per page (default: 15)

## 📝 Recipe Schema

```javascript
{
    title: String (required),
    description: String,
    ingredients: [
        {
            name: String (required),
            quantity: String (required),
            unit: String
        }
    ],
    steps: [
        {
            step_number: Number (required),
            instruction: String (required)
        }
    ],
    cook_time: {
        prep_time: String,
        cook_time: String,
        total_time: String
    },
    servings: Number (required),
    difficulty: String (enum: ["Easy", "Medium", "Hard"]) (required),
    category: String,
    cuisine: String,
    nutrition_info: {
        calories: Number,
        fat: String,
        protein: String,
        carbohydrates: String
    },
    author: {
        name: String (required),
        profile_url: String
    },
    images: [String],
    tags: [String],
    ratings: {
        average_rating: Number,
        number_of_reviews: Number
    },
    notes: String
}
```

## 🔒 Input Validation

The API implements validation for recipe creation:
- Title is required
- Ingredients must include at least one item with name and quantity
- Steps must include at least one instruction
- Servings must be a positive number
- Difficulty must be either "Easy", "Medium", or "Hard"
- Author name is required

## 🛡️ Error Handling

The API includes global error handling and returns appropriate HTTP status codes:
- 200: Successful operation
- 201: Resource created
- 400: Bad request (validation errors)
- 404: Resource not found
- 500: Server error

## 💻 Development

To run the server in development mode with hot reloading:
```bash
npm run dev
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is under the premises of mLab CodeTribe

## 👥 Authors

- Oscar Poco - MERN STACK DEVELOPER

## 🙏 Acknowledgments

- Express.js team
- Mongoose team
- All contributors
