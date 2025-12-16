import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  if (!token) return null;

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const downloadCSV = async () => {
    const res = await API.get("/export/csv", { responseType: "blob" });
    const url = window.URL.createObjectURL(new Blob([res.data]));
    const a = document.createElement("a");
    a.href = url;
    a.download = "expenses.csv";
    a.click();
  };

  const downloadPDF = async () => {
    const res = await API.get("/export/pdf", { responseType: "blob" });
    const url = window.URL.createObjectURL(new Blob([res.data]));
    const a = document.createElement("a");
    a.href = url;
    a.download = "expenses.pdf";
    a.click();
  };

  return (
 <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
  <span className="navbar-brand fw-bold">Expense Tracker</span>

  <div className="ms-auto d-flex gap-2">
    <button className="btn btn-outline-light btn-sm" onClick={downloadCSV}>
      Export CSV
    </button>
    <button className="btn btn-outline-light btn-sm" onClick={downloadPDF}>
      Export PDF
    </button>
    <button className="btn btn-danger btn-sm" onClick={logout}>
      Logout
    </button>
  </div>
</nav>

  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    padding: "12px 20px",
    background: "#222",
    color: "#fff"
  },
  logo: { margin: 0 },
  links: { display: "flex", gap: "10px", alignItems: "center" },
  link: { color: "#fff", textDecoration: "none" },
  btn: {
    background: "#4CAF50",
    color: "#fff",
    border: "none",
    padding: "6px 12px",
    cursor: "pointer"
  },
  logout: {
    background: "red",
    color: "#fff",
    border: "none",
    padding: "6px 12px",
    cursor: "pointer"
  }
};
