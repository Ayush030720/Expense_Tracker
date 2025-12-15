const Expense = require("../models/Expense");

exports.categoryAnalytics = async (req, res) => {
  const data = await Expense.aggregate([
    { $match: { userId: req.user.id } },
    { $group: { _id: "$category", total: { $sum: "$amount" } } }
  ]);
  res.json(data);
};
