import API from "../api/axios";

export default function ExpenseList({ expenses, refresh }) {
  const deleteExpense = async (id) => {
    await API.delete(`/expenses/${id}`);
    refresh();
  };

  return (
    <ul>
      {expenses.map((e) => (
        <li key={e._id}>
          {e.title} - ₹{e.amount} ({e.category})
          <button onClick={() => deleteExpense(e._id)}>X</button>
        </li>
      ))}
    </ul>
  );
}
