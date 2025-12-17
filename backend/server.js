const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");

connectDB();
const app = express();

/**
 * MUST be FIRST middleware
 */
app.use(
  cors({
    origin: "https://expense-tracker-liard-six-51.vercel.app",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

/**
 * Explicit preflight handling (IMPORTANT)
 */
app.options("*", cors());

app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/expenses", require("./routes/expenseRoutes"));
app.use("/api/analytics", require("./routes/analyticsRoutes"));
app.use("/api/export", require("./routes/exportRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
