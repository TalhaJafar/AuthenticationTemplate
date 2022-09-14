const express = require("express");
const router = express.Router();
const { adminReport } = require("../controllers/reportsController");
const { protect } = require("../middleware/authMiddleware");

router.get("/reports", protect, adminReport);

module.exports = router;
