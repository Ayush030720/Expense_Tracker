const PDFDocument = require("pdfkit");

module.exports = (res, expenses, userName) => {
  const doc = new PDFDocument({ margin: 40 });
  doc.pipe(res);

  doc.fontSize(18).text("Expense Report", { align: "center" });
  doc.moveDown();
  doc.fontSize(12).text(`User: ${userName}`);
  doc.text(`Generated: ${new Date().toLocaleDateString()}`);
  doc.moveDown();

  expenses.forEach((e, i) => {
    doc.text(
      `${i + 1}. ${e.title} | ₹${e.amount} | ${e.category} | ${new Date(e.date).toDateString()}`
    );
  });

  doc.end();
};
