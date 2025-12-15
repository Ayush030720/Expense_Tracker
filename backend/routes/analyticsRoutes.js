const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const { categoryAnalytics } = require("../controllers/analyticsController");

// Category-wise analytics
router.get("/category", auth, categoryAnalytics);

module.exports = router;
