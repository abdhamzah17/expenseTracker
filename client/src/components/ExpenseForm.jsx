import PropTypes from "prop-types";
import { useState } from "react";
import { toast } from "react-toastify";

ExpenseForm.propTypes = {
  handleAdd: PropTypes.func,
};
function ExpenseForm({ handleAdd }) {
  const [newExpense, setNewExpense] = useState({
    expenseName: "",
    expenseCategory: "",
    expenseDate: "",
    expenseAmount: "",
  });

  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    setNewExpense((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (
      !newExpense.expenseName.trim() ||
      !String(newExpense.expenseDate).trim() ||
      !newExpense.expenseAmount.trim()
    ) {
      toast.error("Please fill all fields properly!");
      return;
    }
    handleAdd(newExpense);
    setNewExpense({
      expenseName: "",
      expenseCategory: "",
      expenseDate: "",
      expenseAmount: "",
    });
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto w-[95%] space-y-4 rounded-xl border-2 border-blue-500 p-4 shadow-xl md:w-4/5"
    >
      <section className="flex flex-col justify-between gap-4 md:flex-row">
        <div className="flex w-full flex-col md:w-[45%] md:flex-row md:gap-4">
          <label
            htmlFor="expenseName"
            className="w-52 p-1 text-lg font-semibold"
          >
            Name
          </label>
          <input
            type="text"
            name="expenseName"
            id="expenseName"
            className="w-full rounded-3xl border border-blue-500 px-2 py-1 text-lg focus:outline-none"
            required
            value={newExpense.expenseName}
            onChange={handleChange}
          />
        </div>
        <div className="flex w-full flex-col md:w-[45%] md:flex-row md:gap-4">
          <label
            htmlFor="expenseCategory"
            className="w-52 p-1 text-lg font-semibold"
          >
            Category
          </label>
          <select
            value={newExpense.expenseCategory}
            onChange={handleChange}
            name="expenseCategory"
            className="w-full rounded-3xl border border-blue-500 px-2 py-1 text-lg focus:outline-none"
            id="expenseCategory"
          >
            <option value="Entertainment">Entertainment</option>
            <option value="Housing">Housing</option>
            <option value="Transport">Transport</option>
            <option value="Food">Food</option>
            <option value="Healthcare">Health Care</option>
            <option value="Education">Education</option>
            <option value="Investment">Investment</option>
            <option value="Debt">Debt Payments</option>
            <option value="Insuarance">Insuarance</option>
            <option value="Personalcare">Personal Care</option>
            <option value="Miscellaneous">Miscellaneous</option>
          </select>
        </div>
      </section>
      <section className="flex flex-col justify-between gap-4 md:flex-row">
        <div className="flex w-full flex-col md:w-[45%] md:flex-row md:gap-4">
          <label
            htmlFor="expenseAmount"
            className="w-52 p-1 text-lg font-semibold"
          >
            Amount
          </label>
          <input
            className="w-full rounded-3xl border border-blue-500 px-2 py-1 text-lg focus:outline-none"
            type="text"
            name="expenseAmount"
            id="expenseAmount"
            required
            value={newExpense.expenseAmount}
            onChange={handleChange}
          />
        </div>
        <div className="flex w-full flex-col md:w-[45%] md:flex-row md:gap-4">
          <label
            htmlFor="expenseDate"
            className="w-52 p-1 text-lg font-semibold"
          >
            Date
          </label>
          <input
            type="date"
            className="w-full rounded-3xl border border-blue-500 px-2 py-1 text-lg focus:outline-none"
            name="expenseDate"
            id="expenseDate"
            required
            value={newExpense.expenseDate}
            onChange={handleChange}
          />
        </div>
      </section>
      <button className="text-semibold w-full rounded-3xl bg-blue-500 px-4 py-2 text-white">
        Add Expense
      </button>
    </form>
  );
}

export default ExpenseForm;
