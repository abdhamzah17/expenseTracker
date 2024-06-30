import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { formatDate } from "../constants/utils";

ExpenseForm.propTypes = {
  handleAdd: PropTypes.func,
  selectedExpense: PropTypes.object,
  isEditing: PropTypes.bool,
  handleCancel: PropTypes.func,
  handleEdit: PropTypes.func,
};
function ExpenseForm({
  handleAdd,
  isEditing,
  selectedExpense,
  handleCancel,
  handleEdit,
}) {
  const [newExpense, setNewExpense] = useState({
    expenseName: "",
    expenseCategory: "Entertainment",
    expenseDate: "",
    expenseAmount: "",
  });

  function handleClick() {
    if (
      !newExpense.expenseName.trim() ||
      !String(newExpense.expenseDate).trim() ||
      !newExpense.expenseAmount.trim()
    ) {
      toast.error("Please fill all fields properly!");
      return;
    }
    handleEdit(newExpense);
    setNewExpense({
      expenseName: "",
      expenseCategory: "",
      expenseDate: "",
      expenseAmount: "",
    });
  }
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

  useEffect(
    function () {
      if (isEditing) {
        setNewExpense((prev) => ({
          ...prev,
          expenseName: selectedExpense.expensename,
          expenseAmount: selectedExpense.expenseamount,
          expenseDate: formatDate(selectedExpense.expensedate),
          expenseCategory: selectedExpense.expensecategory,
        }));
      }
    },
    [isEditing, selectedExpense],
  );
  return (
    <form
      onSubmit={isEditing ? handleClick : handleSubmit}
      className="mx-auto w-[95%] space-y-2 rounded-xl border-2 border-blue-500 p-4 shadow-xl md:w-4/5 md:space-y-4"
    >
      <section className="flex flex-col justify-between md:flex-row md:gap-4">
        <div className="flex w-full flex-col md:w-[45%] md:flex-row md:gap-4">
          <label
            htmlFor="expenseName"
            className="w-52 p-1 font-semibold md:text-lg"
          >
            Name
          </label>
          <input
            type="text"
            name="expenseName"
            id="expenseName"
            className="w-full rounded-3xl border border-blue-500 px-2 py-1 focus:outline-none md:text-lg"
            required
            value={newExpense.expenseName}
            onChange={handleChange}
          />
        </div>
        <div className="flex w-full flex-col md:w-[45%] md:flex-row md:gap-4">
          <label
            htmlFor="expenseCategory"
            className="w-52 p-1 font-semibold md:text-lg"
          >
            Category
          </label>
          <select
            value={newExpense.expenseCategory}
            onChange={handleChange}
            name="expenseCategory"
            className="w-full rounded-3xl border border-blue-500 px-2 py-1 focus:outline-none md:text-lg"
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
      <section className="flex flex-col justify-between md:flex-row md:gap-4">
        <div className="flex w-full flex-col md:w-[45%] md:flex-row md:gap-4">
          <label
            htmlFor="expenseAmount"
            className="w-52 p-1 font-semibold md:text-lg"
          >
            Amount
          </label>
          <input
            className="w-full rounded-3xl border border-blue-500 px-2 py-1 focus:outline-none md:text-lg"
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
            className="w-52 p-1 font-semibold md:text-lg"
          >
            Date
          </label>
          <input
            type="date"
            className="w-full rounded-3xl border border-blue-500 px-2 py-1 focus:outline-none md:text-lg"
            name="expenseDate"
            id="expenseDate"
            required
            value={newExpense.expenseDate}
            onChange={handleChange}
          />
        </div>
      </section>
      <div className={`${isEditing ? "flex gap-4" : ""}`}>
        {isEditing && (
          <button
            className="text-semibold w-full rounded-3xl bg-red-500 px-4 py-2 text-white"
            onClick={handleCancel}
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="text-semibold w-full rounded-3xl bg-blue-500 px-4 py-2 text-white"
        >
          {isEditing ? "Update" : "Add Expense"}
        </button>
      </div>
    </form>
  );
}

export default ExpenseForm;
