const asyncHandler = require("express-async-handler");
const FoodEntry = require("../models/foodEntriesModel");
const Users = require("../models/userModel");

const adminReport = asyncHandler(async (req, res) => {
  const { isAdmin } = req.user;

  if (!isAdmin) {
    res.status(400);
    throw new Error("Not Authorized");
  }

  const startDate = new Date(
    new Date().getTime() - 14 * 24 * 60 * 60 * 1000
  ).toDateString();
  const endDate = new Date().toDateString();

  const thresholdDate = new Date(
    new Date().getTime() - 7 * 24 * 60 * 60 * 1000
  ).toDateString();

  let query = {};
  if (startDate && endDate) {
    query = { date: { $gte: new Date(startDate), $lte: new Date(endDate) } };
  }

  const results = await FoodEntry.aggregate([
    { $match: query },
    { $unwind: { path: "$dayFoodEntries" } },
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "user",
        pipeline: [{ $project: { _id: 0, name: 1 } }],
      },
    },
    { $unwind: { path: "$user" } },
  ]).exec();

  if (results) {
    let currentWeekResults = [];
    let currentTotalEntries = 0;
    let previousWeekResults = [];
    let previousTotalEntries = 0;
    let usersAverageCalories = [];

    results.forEach((item) => {
      const {
        _id,
        userId,
        date,
        caloriesConsumed,
        dayFoodEntries: { mealFoods },
        user: { name },
      } = item;

      if (new Date(date) >= new Date(thresholdDate)) {
        // Entries Data
        const checkExist = currentWeekResults.findIndex(
          (x) => x.id.toString() === _id.toString()
        );
        if (checkExist === -1) {
          const obj = {
            id: _id,
            userId: userId,
            userName: name,
            date,
            caloriesTotal: caloriesConsumed,
            items: mealFoods.length,
          };
          currentWeekResults.push(obj);
          currentTotalEntries = currentTotalEntries + mealFoods.length;
        } else {
          const itemsCount =
            currentWeekResults[checkExist].items + mealFoods.length;
          currentWeekResults[checkExist].items = itemsCount;
          currentTotalEntries = currentTotalEntries + mealFoods.length;
        }
      } else {
        const checkExist = previousWeekResults.findIndex(
          (x) => x.id.toString() === _id.toString()
        );
        if (checkExist === -1) {
          const obj = {
            id: _id,
            userId: userId,
            date,
            caloriesTotal: caloriesConsumed,
            items: mealFoods.length,
          };
          previousWeekResults.push(obj);
          previousTotalEntries = previousTotalEntries + mealFoods.length;
        } else {
          const itemsCount =
            previousWeekResults[checkExist].items + mealFoods.length;
          previousWeekResults[checkExist].items = itemsCount;
          previousTotalEntries = previousTotalEntries + mealFoods.length;
        }
      }
    });

    currentWeekResults.forEach((item) => {
      const { userId, userName, caloriesTotal } = item;

      const checkUser = usersAverageCalories.findIndex(
        (x) => x.id.toString() === userId.toString()
      );

      if (checkUser === -1) {
        const userObj = {
          id: userId,
          userName,
          totalCalories: caloriesTotal,
        };
        usersAverageCalories.push(userObj);
      } else {
        usersAverageCalories[checkUser].totalCalories =
          usersAverageCalories[checkUser].totalCalories + caloriesTotal;
      }
    });

    res.status(201).json({
      currentWeekResults,
      previousWeekResults,
      usersAverageCalories,
      currentTotalEntries,
      previousTotalEntries,
    });
  } else {
    res.status(400);
    throw new Error("No entries exist");
  }
});

module.exports = {
  adminReport,
};
