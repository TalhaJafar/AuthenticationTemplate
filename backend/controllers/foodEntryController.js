const asyncHandler = require("express-async-handler");
const FoodEntry = require("../models/foodEntriesModel");
const Meals = require("../models/mealsModel");

// @desc    Register new FoodEntry
// @route   POST /api/foodEntry
// @access  Public

const listFoodEntries = asyncHandler(async (req, res) => {
  const { date, userId } = req.body;

  // Create FoodEntry
  const entry = await FoodEntry.find();

  if (entry) {
    res.status(201).json(entry);
  } else {
    res.status(400);
    throw new Error("No entries exist");
  }
});

const addFoodEntry = asyncHandler(async (req, res) => {
  const { userId, date, caloriesConsumed, dayFoodEntries } = req.body;

  const convertedDate = new Date(date).toISOString();

  const obj = {
    userId,
    date: new Date(date),
    caloriesConsumed,
    dayFoodEntries,
  };

  // Create FoodEntry
  const entry = await FoodEntry.create(obj);

  if (entry) {
    res.status(201).json(entry);
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const updateFoodEntry = asyncHandler(async (req, res) => {
  const { id, userId, date, caloriesConsumed, dayFoodEntries } = req.body;

  const updatedEntry = {
    userId,
    date: new Date(date),
    caloriesConsumed,
    dayFoodEntries,
  };

  // Update FoodEntry
  const entry = await FoodEntry.findOneAndUpdate(id, updatedEntry);

  if (entry) {
    res.status(201).json(entry);
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const deleteFoodEntry = asyncHandler(async (req, res) => {
  const { id } = req.body;

  // Delete FoodEntry
  const entry = await FoodEntry.deleteOne({ _id: id });

  if (entry) {
    res.status(201).json(entry);
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

module.exports = {
  listFoodEntries,
  addFoodEntry,
  updateFoodEntry,
  deleteFoodEntry,
};
