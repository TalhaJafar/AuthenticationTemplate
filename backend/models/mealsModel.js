const mongoose = require("mongoose");

const mealsSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a meal name"],
    },
    limit: {
      type: Number,
      required: [true, "Please provide a number"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Meals", mealsSchema);
