import { useEffect, useState } from "react";
import API from "../api/axios";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";

export default function Dashboard() {
  const [expenses, setExpenses] = useState([]);

  const fetchExpenses = async () => {
    const res = await API.get("/expenses?month=9&year=2025");
    setExpenses(res.data);
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      <ExpenseForm refresh={fetchExpenses} />
      <ExpenseList expenses={expenses} refresh={fetchExpenses} />
    </div>
  );
}
