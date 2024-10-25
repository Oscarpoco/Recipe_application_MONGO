import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const protect  = async (req, res, next) => {

    // TOKEN
    let token;

    if(req.headers.authorization &&  req.headers.authorization.startsWith('Bearer')){
        try {
            console.log(req.headers.authorization);
        } catch (error) {
            
        }

    }

}
