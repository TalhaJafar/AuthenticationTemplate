const mongoose = require("mongoose");
const { Schema } = mongoose;

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
  // mealId: {
  //   type: String,
  //   required: [true, "provide meal Id"],
  // },

  mealId: { type: Schema.Types.ObjectId, ref: "Meals" },
  mealFoods: [foodEntry],
});

const mealsSchema = mongoose.Schema({
  // userId: {
  //   type: String,
  //   required: [true, "Please provide a user id"],
  // },

  userId: { type: Schema.Types.ObjectId, ref: "User" },

  date: {
    type: Date,
    required: [true, "please provide a date"],
  },

  caloriesTarget: {
    type: Number,
    required: [true, "please provide calories target"],
  },

  caloriesConsumed: {
    type: Number,
    required: [true, "please provide calories consumed"],
  },

  dayFoodEntries: [mealEntry],
});

module.exports = mongoose.model("FoodEntries", mealsSchema);
