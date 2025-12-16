import { useState } from "react";
import API from "../api/axios";

export default function ExpenseList({ expenses, refresh }) {
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: "",
  });

  // DELETE
  const deleteExpense = async (id) => {
    try {
      await API.delete(`/expenses/${id}`);
      refresh();
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  // START EDIT
  const startEdit = (expense) => {
    setEditingId(expense._id);
    setForm({
      title: expense.title,
      amount: expense.amount,
      category: expense.category,
    });
  };

  // HANDLE INPUT
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // UPDATE
  const updateExpense = async (id) => {
    try {
      await API.put(`/expenses/${id}`, form);
      setEditingId(null);
      refresh();
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  return (
    <div className="card shadow-sm mt-4">
      <div className="card-body">
        <h5 className="card-title">Expenses</h5>

        <div className="table-responsive">
          <table className="table table-striped align-middle">
            <thead>
              <tr>
                <th>Title</th>
                <th>Amount</th>
                <th>Category</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>

            <tbody>
              {/* EMPTY STATE */}
              {Array.isArray(expenses) && expenses.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center text-muted">
                    No expenses found
                  </td>
                </tr>
              )}

              {/* LIST */}
              {Array.isArray(expenses) &&
                expenses.map((e) => (
                  <tr key={e._id}>
                    {/* TITLE */}
                    <td>
                      {editingId === e._id ? (
                        <input
                          name="title"
                          value={form.title}
                          onChange={handleChange}
                          className="form-control"
                        />
                      ) : (
                        e.title
                      )}
                    </td>

                    {/* AMOUNT */}
                    <td>
                      {editingId === e._id ? (
                        <input
                          name="amount"
                          type="number"
                          value={form.amount}
                          onChange={handleChange}
                          className="form-control"
                        />
                      ) : (
                        `₹${e.amount}`
                      )}
                    </td>

                    {/* CATEGORY */}
                    <td>
                      {editingId === e._id ? (
                        <input
                          name="category"
                          value={form.category}
                          onChange={handleChange}
                          className="form-control"
                        />
                      ) : (
                        e.category
                      )}
                    </td>

                    {/* ACTIONS */}
                    <td className="text-end">
                      {editingId === e._id ? (
                        <>
                          <button
                            className="btn btn-sm btn-success me-2"
                            onClick={() => updateExpense(e._id)}>
                            Save
                          </button>
                          <button
                            className="btn btn-sm btn-secondary"
                            onClick={() => setEditingId(null)}>
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            className="btn btn-sm btn-primary me-2"
                            onClick={() => startEdit(e)}>
                            Edit
                          </button>
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => deleteExpense(e._id)}>
                            Delete
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
