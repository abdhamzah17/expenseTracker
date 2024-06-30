import express from "express";
import {
  addExpense,
  deleteExpense,
  getExpenses,
  getExpensesByCategory,
  getExpensesByTimeStamp,
  updateExpense,
} from "../controllers/expense.controller.js";
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json("You hit the expense tracker route");
});

router.get("/expense", getExpenses);
router.get("/expense/timestamp", getExpensesByTimeStamp);
router.get("/expense/:category", getExpensesByCategory);
router.post("/expense/add", addExpense);
router.put("/expense/edit/:id", updateExpense);
router.delete("/expense/delete/:id", deleteExpense);

router.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});

router.use("*", (req, res) => {
  res.json({ message: "404 Not found", success: false });
});

export default router;
