const asyncHandler = require("express-async-handler");
const Meals = require("../models/mealsModel");

const listMeals = asyncHandler(async (req, res) => {
  const meals = await Meals.find();
  if (meals) {
    res.status(201).json(meals);
  } else {
    res.status(400);
    throw new Error("No meals found");
  }
});

const addMeal = asyncHandler(async (req, res) => {
  const { name, limit } = req.body;
  // Create Meals
  const meal = await Meals.create({ name, limit });
  if (meal) {
    res.status(201).json(meal);
  } else {
    res.status(400);
    throw new Error("Error while adding meal");
  }
});

const updateMeal = asyncHandler(async (req, res) => {
  const { id, name, limit } = req.body;
  // Update Meal
  const entry = await Meals.findByIdAndUpdate(
    id,
    { name, limit },
    { new: true }
  );
  if (entry) {
    res.status(201).json(entry);
  } else {
    res.status(400);
    throw new Error("Invalid Meal Entry");
  }
});

const deleteMeal = asyncHandler(async (req, res) => {
  const { id } = req.body;
  // Delete Meal
  const entry = await Meals.deleteOne({ _id: id });
  if (entry) {
    res.status(201).json(entry);
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

module.exports = {
  listMeals,
  addMeal,
  updateMeal,
  deleteMeal,
};
