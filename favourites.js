const express = require("express");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// GET /api/favourites
router.get("/", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ favourites: user.favourites });
  } catch (err) {
    console.error("Get favourites error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// POST /api/favourites/toggle
router.post("/toggle", authMiddleware, async (req, res) => {
  try {
    const { recipeId } = req.body;
    if (!recipeId) {
      return res.status(400).json({ message: "recipeId is required" });
    }

    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const index = user.favourites.indexOf(recipeId);
    if (index === -1) {
      user.favourites.push(recipeId);
    } else {
      user.favourites.splice(index, 1);
    }

    await user.save();
    res.json({ favourites: user.favourites });
  } catch (err) {
    console.error("Toggle favourites error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
