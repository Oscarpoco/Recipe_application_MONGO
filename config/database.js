import mongoose from "mongoose";

const connectDB = async() => {

    try {
        const connection = await mongoose.connect(process.env.MONGO_URL);
        console.log("MongoDB Connected TO : ", connection.connection.host);

    } catch (error) {
        console.error('Error', error)
    }
}

export default connectDB;