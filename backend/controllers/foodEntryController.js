const asyncHandler = require("express-async-handler");
const FoodEntry = require("../models/foodEntriesModel");
const Meals = require("../models/mealsModel");

const listFoodEntries = asyncHandler(async (req, res) => {
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
  const { id, isAdmin } = req.user;

  if (id === userId || isAdmin) {
    const convertedDate = new Date(date).toISOString();
    const obj = {
      userId,
      date: convertedDate,
      caloriesConsumed,
      dayFoodEntries,
    };

    const mealsList = await Meals.find();
    dayFoodEntries.forEach((element) => {
      const { mealId, mealFoods } = element;
      const limit = mealsList.find((x) => {
        if (x._id === mealId) return x.limit;
      });
      if (mealFoods.length > limit) {
        res.status(400);
        throw new Error("Limit exceeding");
      }
    });

    // Create FoodEntry
    const entry = await FoodEntry.create(obj);

    if (entry) {
      res.status(201).json(entry);
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  } else {
    res.status(400);
    throw new Error("Invalid user");
  }
});

const updateFoodEntry = asyncHandler(async (req, res) => {
  const { foodEntryId, userId, date, caloriesConsumed, dayFoodEntries } =
    req.body;
  const { id, isAdmin } = req.user;

  if (id === userId || isAdmin) {
    const convertedDate = new Date(date).toISOString();

    const updatedEntry = {
      userId,
      date: convertedDate,
      caloriesConsumed,
      dayFoodEntries,
    };

    const mealsList = await Meals.find();

    if (mealsList) {
      dayFoodEntries.forEach((element) => {
        const { mealId, mealFoods } = element;
        const meal = mealsList.find((x) => x._id.toString() === mealId);
        console.log(meal, "meal");
        if (meal === undefined || mealFoods.length > meal?.limit) {
          res.status(400);
          throw new Error("Meal Error or limit exceeding");
        }
      });

      const entry = await FoodEntry.findOneAndUpdate(
        foodEntryId,
        updatedEntry,
        { new: true }
      );

      if (entry) {
        res.status(201).json(entry);
      } else {
        res.status(400);
        throw new Error("Invalid user data");
      }
    }
  } else {
    res.status(400);
    throw new Error("Invalid user");
  }
});

const deleteFoodEntry = asyncHandler(async (req, res) => {
  const { foodEntryId, userId } = req.body;
  const { id, isAdmin } = req.user;

  if (userId === id || isAdmin) {
    const entry = await FoodEntry.deleteOne({ _id: foodEntryId });
    if (entry) {
      res.status(201).json(entry);
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const listUserFoodEntries = asyncHandler(async (req, res) => {
  const { id } = req.user;
  const entry = await FoodEntry.find({ id });
  if (entry) {
    res.status(201).json(entry);
  } else {
    res.status(400);
    throw new Error("No entries exist");
  }
});

module.exports = {
  listFoodEntries,
  listUserFoodEntries,
  addFoodEntry,
  updateFoodEntry,
  deleteFoodEntry,
};
