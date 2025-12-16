import { useState } from "react";
import API from "../api/axios";

export default function ExpenseForm({ refresh }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");

  const addExpense = async () => {
    try {
      await API.post("/expenses", {
        title,
        amount: Number(amount),
        category,
        date,
      });

      refresh();

      // clear form (optional but good UX)
      setTitle("");
      setAmount("");
      setCategory("");
      setDate("");
    } catch (err) {
      console.error("Add expense failed:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Failed to add expense");
    }
  };

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h5 className="card-title">Add Expense</h5>

        <input
          className="form-control mb-2"
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          className="form-control mb-2"
          type="number"
          placeholder="Amount"
          onChange={(e) => setAmount(e.target.value)}
        />
        <input
          className="form-control mb-2"
          placeholder="Category"
          onChange={(e) => setCategory(e.target.value)}
        />
        <input
          className="form-control mb-3"
          type="date"
          onChange={(e) => setDate(e.target.value)}
        />

        <button className="btn btn-success w-100" onClick={addExpense}>
          Add Expense
        </button>
      </div>
    </div>
  );
}
