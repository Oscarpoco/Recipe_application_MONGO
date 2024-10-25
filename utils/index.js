import jwt from "jsonwebtoken";

export default function GenerateToken(id) {
    return jwt.sign({ id: id }, process.env.JWT_SECRET, { expiresIn: "1h" });
}