const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const generateToken = (user) => jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
);

const register = async (req, res) => {
    const { name, email, password, role } = req.body;
    if (!["admin", "organization", "donor"].includes(role)) {
        return res.status(400).json({ error: "Invalid role" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword, role });
    await user.save();
    res.json({ message: `${role} registered successfully` });
};

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && await bcrypt.compare(password, user.password)) {
        const token = generateToken(user);
        return res.json({
            success: true,
            token,
            user: {
                isAdmin: user.role === "admin",
                isOrganization: user.role === "organization",
                isDonor: user.role === "donor",
                isLoggedIn: true,
                email: user.email,
                role: user.role
            }
        });
    }
    return res.status(401).json({ success: false, error: "Invalid credentials" });
};

module.exports = { register, login };
