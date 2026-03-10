const express = require("express");
const verifyToken = require("../middleware/verify-token.js");
const Restaurant = require("../models/restaurant.js");
const router = express.Router();

router.post("/", verifyToken, async (req, res) => {
  try {
    req.body.author = req.user._id;
    const restaurant = await Restaurant.create(req.body);
    restaurant._doc.author = req.user;
    res.status(201).json(restaurant);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

router.get("/", verifyToken, async (req, res) => {
  try {
    const restaurants = await Restaurant.find({})
      .populate("author")
      .sort({ createdAt: "desc" });
    res.status(200).json(restaurants);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

module.exports = router;
