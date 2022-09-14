const express = require("express");
const router = express.Router();
const {
  addFoodEntry,
  updateFoodEntry,
  deleteFoodEntry,
  listFoodEntries,
  listUserFoodEntries,
} = require("../controllers/foodEntryController");
const { protect } = require("../middleware/authMiddleware");

router.post("/add", protect, addFoodEntry);
router.post("/update", protect, updateFoodEntry);
router.delete("/delete", protect, deleteFoodEntry);
router.get("/listEntries", protect, listUserFoodEntries);
router.get("/adminlist", protect, listFoodEntries);

module.exports = router;
