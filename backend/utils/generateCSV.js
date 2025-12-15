const { createObjectCsvStringifier } = require("csv-writer");

module.exports = (expenses) => {
  const csvStringifier = createObjectCsvStringifier({
    header: [
      { id: "title", title: "Title" },
      { id: "amount", title: "Amount" },
      { id: "category", title: "Category" },
      { id: "date", title: "Date" }
    ]
  });

  return (
    csvStringifier.getHeaderString() +
    csvStringifier.stringifyRecords(expenses)
  );
};
