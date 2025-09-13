const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const generateToken = (id, phno, role) => {
    return jwt.sign({ id, phno, role }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

// REGISTER USER
const registerUser = async (req, res) => {
    try {
        const { name, phno, password, role } = req.body;
        if (!["admin", "organization", "donor"].includes(role)) {
            return res.status(400).json({ error: "Invalid role for user registration" });
        }
        const existingUser = await User.findOne({ phno });
        if (existingUser) return res.status(400).json({ error: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, phno, password: hashedPassword, role });
        await user.save();
        res.json({ message: `${role.charAt(0).toUpperCase() + role.slice(1)} registered successfully` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// LOGIN USER
const login = async (req, res) => {
    try {
        const { phno, password } = req.body;
        const user = await User.findOne({ phno });
        if (user) {
           // const token = generateToken(user._id, user.phno, user.role);
            return res.json({
                id:user._id,
                success: true,
              //  token,
                user: {
                    id: user._id,
                    role: user.role,
                    isLoggedIn: true,
                    phno: user.phno,
                    name: user.name
                }
            });
        }
        return res.status(401).json({ success: false, error: "Invalid credentials" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = {
    registerUser,
    login
};
