import { useState } from "react";
import API from "../api/axios";

export default function ExpenseForm({ refresh }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");

  const addExpense = async () => {
    await API.post("/expenses", { title, amount, category, date });
    refresh();
  };

  return (
    <div>
      <input placeholder="Title" onChange={(e) => setTitle(e.target.value)} />
      <input type="number" placeholder="Amount" onChange={(e) => setAmount(e.target.value)} />
      <input placeholder="Category" onChange={(e) => setCategory(e.target.value)} />
      <input type="date" onChange={(e) => setDate(e.target.value)} />
      <button onClick={addExpense}>Add</button>
    </div>
  );
}
