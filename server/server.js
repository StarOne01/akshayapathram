const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const authMiddleware = require("./middleware/authMiddleware");

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log(err));

app.use("/", authRoutes);

app.get("/protected", authMiddleware, (req, res) => {
    res.json({ message: "Protected data", user: req.user });
});

app.listen(port, () => console.log(`Server running on port ${port}`));
