const Expense = require("../models/Expense");
exports.addExpense = async (req, res) => {
  try {
    const expense = await Expense.create({
      ...req.body,
      userId: req.user.id,
    });
    res.json(expense);
  } catch (err) {
    res.status(500).json({ message: "Failed to add expense" });
  }
};



exports.getExpenses = async (req, res) => {
  try {
    const { month, year } = req.query;

    let query = { userId: req.user.id };

    // apply filter ONLY if month & year are provided
  if (month && year) {
  const start = new Date(year, month - 1, 1);
  const end = new Date(year, month, 0, 23, 59, 59, 999);
  query.date = { $gte: start, $lte: end };
}

    const expenses = await Expense.find(query).sort({ date: -1 });
    res.json(expenses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch expenses" });
  }
};
exports.updateExpense = async (req, res) => {
  const expense = await Expense.findOneAndUpdate(
    { _id: req.params.id, userId: req.user.id },
    req.body,
    { new: true }
  );
  res.json(expense);
};

exports.deleteExpense = async (req, res) => {
  await Expense.findOneAndDelete({
    _id: req.params.id,
    userId: req.user.id,
  });
  res.json({ message: "Deleted" });
};
