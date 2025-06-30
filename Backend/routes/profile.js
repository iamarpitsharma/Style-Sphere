const express = require("express");
const router = express.Router();
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");

// ✅ GET user profile
// router.get("/", authMiddleware, async (req, res) => {
//   res.json({ user: req.user });
// });
router.get("/", authMiddleware, async (req, res) => {
    try {
        // Fetch fresh user data from DB to have all fields
        const user = await User.findById(req.user._id).select("-password");
        if (!user) return res.status(404).json({ message: "User not found" });

        // Auto-fill missing optional fields if not present
        user.bio = user.bio || "";
        user.gender = user.gender || "male";
        user.dateOfBirth = user.dateOfBirth || "";

        res.json({ user });
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch profile", error: err.message });
    }
});

// ✅ PUT update user profile
// router.put("/", authMiddleware, async (req, res) => {
//   const updates = req.body;
//   try {
//     const updatedUser = await User.findByIdAndUpdate(
//       req.user._id,
//       updates,
//       { new: true, runValidators: true }
//     ).select("-password");

//     res.json({ user: updatedUser });
//   } catch (err) {
//     res.status(500).json({ message: "Failed to update profile", error: err.message });
//   }
// });
// routes/user.js
router.put("/profile", authMiddleware, async (req, res) => {
    try {
        const userId = req.user.id;
        const update = req.body;

        const updatedUser = await User.findByIdAndUpdate(userId, update, {
            new: true,
            runValidators: true,

        }).select("-password");

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({ user: updatedUser });
    } catch (err) {
        res.status(500).json({ message: "Failed to update profile", error: err.message });
    }
});

module.exports = router;
