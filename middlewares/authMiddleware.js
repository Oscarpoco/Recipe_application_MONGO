import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const protect  = async (req, res, next) => {

    // TOKEN
    let token;

    console.log(req.headers.authorization)

    if(req.headers.authorization &&  req.headers.authorization.startsWith('Bearer')){
        try {
            token = req.headers.authorization.split(' ')[1];
            const decode = jwt.verify(token, process.env.JWT_SECRET);

            // HANDLE FETCHING USER ITEMS
            req.user = await User.findById(decode.id).select("-password");
            next();
        } catch (error) {
            res.status(401).json({error: error})
        }

    } else{
        res.status(401).json({error: "Unauthorized user"});
    }

}
