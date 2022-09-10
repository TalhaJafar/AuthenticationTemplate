const express = require("express");
const router = express.Router();
const {
  listMeals,
  addMeal,
  updateMeal,
  deleteMeal,
} = require("../controllers/mealsController");
const { protect } = require("../middleware/authMiddleware");

router.post("/add", addMeal);
router.post("/update", updateMeal);
router.delete("/delete", deleteMeal);
router.get("/list", listMeals);

module.exports = router;
