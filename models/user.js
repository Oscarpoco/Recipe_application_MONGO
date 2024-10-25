import mongoose, { mongo } from "mongoose";
import * as bcrypt from "bcrypt";
import validator from "validator";

const userShema = new mongoose.Schema({

    email: {
        type: String,
        required: true,
        unique: true,
        validate: [validator.isEmail, "PLease enter a valid email"]
    },

    password: {
        type: String,
        required: true,
        minLength: 8,
        validate: {
            validator: (value) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value),
            message: "Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one number, and one special character.",
        },
    }

});

userShema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

const User = mongoose.model("Users", userShema);
export default User;