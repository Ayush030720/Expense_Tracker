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
    <nav style={styles.nav}>
      <h3 style={styles.logo}>Expense Tracker</h3>

      <div style={styles.links}>
        <Link to="/dashboard" style={styles.link}>Dashboard</Link>
        <button onClick={downloadCSV} style={styles.btn}>Export CSV</button>
        <button onClick={downloadPDF} style={styles.btn}>Export PDF</button>
        <button onClick={logout} style={styles.logout}>Logout</button>
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
