const express = require("express");
const router = express.Router();
const { addFoodEntry } = require("../controllers/foodEntryController");
const { protect } = require("../middleware/authMiddleware");

router.post("/add", addFoodEntry);
router.post("/update", addFoodEntry);
router.post("/delete", addFoodEntry);
router.get("/list", addFoodEntry);

module.exports = router;
