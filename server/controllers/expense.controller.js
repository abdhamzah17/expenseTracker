import db from "../config/db.js";
import crypto from "crypto";
import { errorHandler } from "../utils/error.js";
export async function getExpenses(req, res, next) {
  try {
    const response = await db.query("SELECT * FROM Expenses");
    res.status(200).json({ data: response.rows, success: true });
  } catch (error) {
    next(error);
  }
}

export async function addExpense(req, res, next) {
  const { expenseName, expenseCategory, expenseDate, expenseAmount } = req.body;
  if (
    !expenseName.trim() ||
    !expenseCategory.trim() ||
    !String(expenseDate).trim() ||
    !String(expenseAmount).trim()
  ) {
    return next(errorHandler(422, "Please provide all values properly"));
  }
  const expenseId = String(crypto.randomInt(0, 100000000)).padEnd(9, 0);
  const createdAt = new Date();
  const updatedAt = createdAt;
  try {
    await db.query(
      "INSERT INTO Expenses(expenseid, expensename, expensecategory, expensedate, expenseamount, createdat, updatedat) VALUES ($1,$2,$3,$4,$5,$6,$7);",
      [
        Number(expenseId),
        expenseName,
        expenseCategory,
        new Date(expenseDate),
        Number(expenseAmount),
        createdAt,
        updatedAt,
      ]
    );
    res
      .status(201)
      .json({ message: "Expense added successfully", success: true });
  } catch (error) {
    next(error);
  }
}

export async function updateExpense(req, res, next) {
  const expenseId = req.params.id;
  const { expenseName, expenseCategory, expenseDate, expenseAmount } = req.body;
  if (
    !expenseName.trim() ||
    !expenseCategory.trim() ||
    !String(expenseDate).trim() ||
    !String(expenseAmount).trim()
  ) {
    return next(errorHandler(422, "Please provide all values properly"));
  }
  const updatedAt = new Date();

  try {
    await db.query(
      "UPDATE Expenses SET expensename = $1, expensecategory = $2, expensedate = $3, expenseamount = $4, updatedat = $5 WHERE expenseId = $6;",
      [
        expenseName,
        expenseCategory,
        expenseDate,
        Number(expenseAmount),
        new Date(updatedAt),
        Number(expenseId),
      ]
    );
    res
      .status(200)
      .json({ message: "Expense updated successfully", success: true });
  } catch (error) {
    next(error);
  }
}

export async function deleteExpense(req, res, next) {
  const expenseId = req.params.id;
  try {
    await db.query("DELETE FROM Expenses WHERE expenseID = $1", [
      Number(expenseId),
    ]);
    res
      .status(200)
      .json({ message: "Expense removed successfully", success: true });
  } catch (error) {
    next(error);
  }
}

export async function getExpensesByCategory(req, res, next) {
  const expenseCategory = req.params.category;
  try {
    const response = await db.query(
      "SELECT * FROM Expenses WHERE expenseCategory = $1",
      [expenseCategory]
    );
    res.status(200).json({ data: response.rows, success: true });
  } catch (error) {
    next(error);
  }
}

export async function getExpensesByTimeStamp(req, res, next) {
  const { month, year } = req.query;
  try {
    const response = await db.query("SELECT * FROM Expenses");

    const reqData = response.rows.filter((expense) => {
      const expenseDate = new Date(expense.expensedate);
      const istDate = new Date(
        expenseDate.toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
      );
      return (
        istDate.getMonth() == Number(month) &&
        istDate.getFullYear() == Number(year)
      );
    });
    res.status(200).json({ data: reqData, success: true });
  } catch (error) {
    next(error);
  }
}
