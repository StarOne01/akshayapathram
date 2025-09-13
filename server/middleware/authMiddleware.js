const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) return res.status(401).json({ error: "Access denied. No token provided." });

    try {
        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET is not configured in the environment variables.");
        }

        req.user = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (error) {
        console.error("Authentication error:", error);
        res.status(400).json({ error: "Invalid token." });
    }
};

module.exports = authMiddleware;
