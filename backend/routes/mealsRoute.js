const express = require("express");
const router = express.Router();
const {
  listMeals,
  addMeal,
  updateMeal,
  deleteMeal,
} = require("../controllers/mealsController");
const { protect } = require("../middleware/authMiddleware");

router.post("/add", protect, addMeal);
router.post("/update", protect, updateMeal);
router.delete("/delete", protect, deleteMeal);
router.get("/list", listMeals);

module.exports = router;
