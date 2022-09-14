const express = require("express");
const router = express.Router();
const {
  getUser,
  getToken,
  registerUser,
  updateUser,
  listAllUsers,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

router.post("/createUser", registerUser);
router.post("/updateUser", protect, updateUser);
router.get("/listUsers", protect, listAllUsers);
router.post("/getToken", getToken);
router.get("/getUser", protect, getUser);

module.exports = router;
