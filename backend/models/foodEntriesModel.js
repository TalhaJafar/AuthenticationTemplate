const mongoose = require("mongoose");

const foodEntry = new mongoose.Schema({
  itemName: {
    type: String,
    required: [true, "provide food name"],
  },
  calories: {
    type: Number,
    required: [true, "provide food calories"],
  },
});

const mealEntry = new mongoose.Schema({
  mealId: {
    type: String,
    required: [true, "provide meal Id"],
  },
  mealFoods: [foodEntry],
});

const mealsSchema = mongoose.Schema({
  userId: {
    type: String,
    required: [true, "Please provide a user id"],
  },

  date: {
    type: Date,
    required: [true, "please provide a date"],
  },

  caloriesConsumed: {
    type: Number,
    required: [true, "please provide calories"],
  },

  dayFoodEntries: [mealEntry],
});

module.exports = mongoose.model("FoodEntries", mealsSchema);
