const asyncHandler = require("express-async-handler");
const FoodEntry = require("../models/foodEntriesModel");
const Meals = require("../models/mealsModel");

const addFoodEntry = asyncHandler(async (req, res) => {
  const { userId, date, caloriesTarget, caloriesConsumed, dayFoodEntries } =
    req.body;
  const { id, isAdmin } = req.user;

  if (id === userId || isAdmin) {
    const convertedDate = new Date(date).toISOString();

    const entryCheck = await FoodEntry.find({ userId, date: convertedDate });
    if (entryCheck.length) {
      res.status(400);
      throw new Error("Same Day entry against user already exists");
    }

    if (dayFoodEntries.length === 0) {
      res.status(400);
      throw new Error("Add Meals in the records");
    }

    const obj = {
      userId,
      date: convertedDate,
      caloriesTarget,
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
  const {
    foodEntryId,
    userId,
    date,
    caloriesTarget,
    caloriesConsumed,
    dayFoodEntries,
  } = req.body;
  const { id, isAdmin } = req.user;

  if (id === userId || isAdmin) {
    const convertedDate = new Date(date).toISOString();

    // const entryCheck = await FoodEntry.find({ userId, date: convertedDate });
    // if (entryCheck.length) {
    //   res.status(400);
    //   throw new Error("Same Day entry against user already exists");
    // }

    if (dayFoodEntries.length === 0) {
      res.status(400);
      throw new Error("Add Meals in the records");
    }

    const updatedEntry = {
      userId,
      date: convertedDate,
      caloriesTarget,
      caloriesConsumed,
      dayFoodEntries,
    };

    const mealsList = await Meals.find();

    if (mealsList) {
      dayFoodEntries.forEach((element) => {
        const { mealId, mealFoods } = element;
        const meal = mealsList.find((x) => x._id.toString() === mealId);
        if (meal === undefined || mealFoods.length > meal?.limit) {
          res.status(400);
          throw new Error("Meal Error or limit exceeding");
        }
      });

      const entry = await FoodEntry.findOneAndUpdate(
        { _id: foodEntryId },
        updatedEntry,
        { new: true }
      );

      if (entry) {
        res.status(201).json(entry);
      } else {
        res.status(400);
        throw new Error("Record not Updated Successfully");
      }
    }
  } else {
    res.status(400);
    throw new Error("Invalid user");
  }
});

const deleteFoodEntry = asyncHandler(async (req, res) => {
  const { foodEntryId } = req.body;
  const { id, isAdmin } = req.user;

  if ((id || isAdmin) && foodEntryId) {
    const entry = await FoodEntry.deleteOne({ _id: foodEntryId });
    if (entry) {
      res.status(201).json(entry);
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  } else {
    res.status(400);
    throw new Error("Error occured");
  }
});

const listUserFoodEntries = asyncHandler(async (req, res) => {
  const { id } = req.user;
  const { startDate, endDate } = req.query;
  let filter = {};
  if (startDate && endDate) {
    filter = { date: { $gte: startDate, $lte: endDate } };
  }
  const entry = await FoodEntry.find({ $and: [{ userId: id }, filter] })
    .sort({ date: "desc" })
    .populate({ path: "userId", select: "name" });
  // .populate({ path: "dayFoodEntries.mealId", select: "name" });
  if (entry) {
    res.status(201).json(entry);
  } else {
    res.status(400);
    throw new Error("No entries exist");
  }
});

const listFoodEntries = asyncHandler(async (req, res) => {
  const { startDate, endDate } = req.query;
  const { isAdmin } = req.user;

  if (!isAdmin) {
    res.status(400);
    throw new Error("Not Authorized");
  }

  let query = {};
  if (startDate && endDate) {
    query = { date: { $gte: startDate, $lte: endDate } };
  }

  const entry = await FoodEntry.find(query)
    .sort({ date: "desc" })
    .populate({ path: "userId", select: "name" });
  // .populate({ path: "dayFoodEntries.mealId", select: "name" });
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
