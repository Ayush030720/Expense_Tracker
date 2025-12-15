const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const controller = require("../controllers/expenseController");

router.post("/", auth, controller.addExpense);
router.get("/", auth, controller.getExpenses);
router.put("/:id", auth, controller.updateExpense);
router.delete("/:id", auth, controller.deleteExpense);

module.exports = router;
