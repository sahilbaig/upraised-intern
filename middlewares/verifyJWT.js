import jwt from 'jsonwebtoken';
import { config } from 'dotenv';


config();

export function verifyToken(req, res, next) {
    let token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ message: "No token provided" });
    }

    if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length); // sending auth header via postman Created errors otherwisae
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Invalid token" });
        }

        req.user = decoded;
        next();
    });
}
