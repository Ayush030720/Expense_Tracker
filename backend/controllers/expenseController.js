const Expense = require("../models/Expense");

exports.addExpense = async (req, res) => {
  const expense = await Expense.create({
    ...req.body,
    userId: req.user.id
  });
  res.json(expense);
};

exports.getExpenses = async (req, res) => {
  const { month, year } = req.query;
  const start = new Date(year, month - 1, 1);
  const end = new Date(year, month, 0);

  const expenses = await Expense.find({
    userId: req.user.id,
    date: { $gte: start, $lte: end }
  });

  res.json(expenses);
};

exports.updateExpense = async (req, res) => {
  const expense = await Expense.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(expense);
};

exports.deleteExpense = async (req, res) => {
  await Expense.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};
