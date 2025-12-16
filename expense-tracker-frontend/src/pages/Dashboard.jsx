import { useEffect, useState } from "react";
import API from "../api/axios";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";

export default function Dashboard() {
  const [expenses, setExpenses] = useState([]);

  const fetchExpenses = async () => {
    const res = await API.get("/expenses");
    setExpenses(res.data);
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Dashboard</h3>

      <div className="row g-3">
        <div className="col-12 col-md-4">
          <ExpenseForm refresh={fetchExpenses} />
        </div>

        <div className="col-12 col-md-8">
          <ExpenseList expenses={expenses} refresh={fetchExpenses} />
        </div>
      </div>
    </div>
  );
}
