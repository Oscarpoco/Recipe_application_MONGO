import User from "../models/user.js";
import bcrypt from "bcrypt";
import GenerateToken from "../utils/index.js";


// CREATE A USER
export const createUser = async (req, res) => {


    try {
        const { email, password } = req.body;
        const userExists = await User.findOne({ email });

        // CHECKING THE EXISTENT OF THE USER
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({ email, password: hashedPassword });
        res.status(201).json({message: "User Successfully registered", id: user.id, email: user.email });


    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
        console.error(error);
    }


}
// ENDS

// LOGIN

export const LoginUser = async(req, res)=>{

    try {

        // DATA RECEIVED FROM THE USER
        const { email, password } = req.body;

        // FIND THE USER
        const fetchUser = await User.findOne({email});

        if (!fetchUser || !(await fetchUser.matchPassword(password))){
            return res.status(401).json({error: "Invalid credentials"});
        }

        const UserToken = await  GenerateToken(fetchUser.id);
        res.status(200).json({message:  "User logged in successfully with", id: User.id, email: User.email, token: UserToken});

    } catch (error) {
        res.status(500).json({error: "Internal server error"});
    }
}
// ENDS


// GET USERS

export const getUsers = async(req, res)=>{

    try {
        const allUsers = await User.find();

        if (allUsers.length > 0) {
            // Map over users to remove sensitive data
            const users = allUsers.map(user => ({
                id: user.id,
                email: user.email,
                password:  user.password,

            }));

            res.status(200).json(users);
        }

        else{
            console.error({message: error})
            res.status(404).json({message: "No users found"});
        }
    } catch (error) {
        res.status(500).json({error: "External error occured"});
    }
}
