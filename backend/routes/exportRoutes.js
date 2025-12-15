const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const { exportCSV, exportPDF } = require("../controllers/exportController");

router.get("/csv", auth, exportCSV);
router.get("/pdf", auth, exportPDF);

module.exports = router;
