const Expense = require("../models/Expense");
const User = require("../models/User");
const generateCSV = require("../utils/generateCSV");
const generatePDF = require("../utils/generatePDF");

exports.exportCSV = async (req, res) => {
  const expenses = await Expense.find({ userId: req.user.id }).lean();

  const csv = generateCSV(expenses);

  res.setHeader("Content-Type", "text/csv");
  res.setHeader("Content-Disposition", "attachment; filename=expenses.csv");
  res.send(csv);
};

exports.exportPDF = async (req, res) => {
  const expenses = await Expense.find({ userId: req.user.id });
  const user = await User.findById(req.user.id);

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", "attachment; filename=expenses.pdf");

  generatePDF(res, expenses, user.name);
};
