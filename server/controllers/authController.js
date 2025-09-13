const User = require("../models/User");
const Org = require("../models/Org");
const Donar = require("../models/Donor");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const generateToken = (id, phno, role, isApproved = true) => {
    return jwt.sign({ id, phno, role, isApproved }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

// USER REGISTER
const registerUser = async (req, res) => {
    try {
        const { name, phno, password, role } = req.body;
        if (!["user", "admin"].includes(role)) {
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

// ORG REGISTER
const registerOrg = async (req, res) => {
    try {
        const { name, phno, password } = req.body;
        const existingOrg = await Org.findOne({ phno });
        if (existingOrg) return res.status(400).json({ error: "Organization already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const org = new Org({ name, phno, password: hashedPassword });
        await org.save();
        res.json({ message: "Organization registered successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// DONOR REGISTER
const registerDonar = async (req, res) => {
    try {
        const { name, phno, password } = req.body;
        const existingDonar = await Donar.findOne({ phno });
        if (existingDonar) return res.status(400).json({ error: "Donor already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const donar = new Donar({ name, phno, password: hashedPassword });
        await donar.save();
        res.json({ message: "Donor registered successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// UNIFIED LOGIN
const login = async (req, res) => {
    try {
        const { phno, password } = req.body;

        // Check in User collection
        const user = await User.findOne({ phno });
        if (user && await bcrypt.compare(password, user.password)) {
            const token = generateToken(user._id, user.phno, user.role);
            return res.json({
                success: true,
                token,
                user: {
                    role: user.role,
                    isLoggedIn: true,
                    phno: user.phno,
                    name: user.name
                }
            });
        }

        // Check in Org collection
        const org = await Org.findOne({ phno });
        if (org && await bcrypt.compare(password, org.password)) {
            const token = generateToken(org._id, org.phno, "organization", org.is_approved);
            return res.json({
                success: true,
                token,
                user: {
                    role: "organization",
                    isApproved: org.is_approved,
                    isLoggedIn: true,
                    phno: org.phno,
                    name: org.name
                }
            });
        }

        // Check in Donar collection
        const donar = await Donar.findOne({ phno });
        if (donar && await bcrypt.compare(password, donar.password)) {
            const token = generateToken(donar._id, donar.phno, "donor", donar.is_approved);
            return res.json({
                success: true,
                token,
                user: {
                    role: "donor",
                    isApproved: donar.is_approved,
                    isLoggedIn: true,
                    phno: donar.phno,
                    name: donar.name
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
    registerOrg,
    registerDonar,
    login
};
