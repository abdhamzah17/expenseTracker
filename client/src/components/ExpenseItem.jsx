import PropTypes from "prop-types";
import { MdDelete, MdEdit } from "react-icons/md";
ExpenseItem.propTypes = {
  expense: PropTypes.object,
  handleDeleteClick: PropTypes.func,
  handleEditClick: PropTypes.func,
};
function ExpenseItem({ expense, handleDeleteClick, handleEditClick }) {
  return (
    <div className="flex w-full items-center justify-between gap-2 rounded-md border-l-4 border-blue-500 px-4 py-2 shadow-md">
      <div className="space-y-2">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-4">
          <p className="text-[1rem] font-semibold md:text-lg">
            {expense.expensename}
          </p>
          <p className="h-fit w-min rounded-2xl bg-blue-500 px-2 py-1 text-[0.6rem] font-medium text-white md:text-xs">
            {expense.expensecategory}
          </p>
        </div>

        <p className="text-left text-xs md:text-sm">
          {new Date(expense.expensedate).toLocaleDateString("en-GB")}
        </p>
      </div>
      <div className="flex w-2/5 flex-col justify-around gap-2 md:w-1/5 md:flex-row">
        <span className="text-[1rem] font-bold text-blue-500 md:w-2/5 md:text-lg">
          &#8377;{expense.expenseamount}
        </span>
        <div className="flex justify-around md:w-3/5">
          <span
            className="cursor-pointer"
            onClick={() => handleDeleteClick(expense.expenseid)}
          >
            <MdDelete className="text-xl text-red-600 hover:text-red-800 md:text-2xl" />
          </span>
          <span
            className="cursor-pointer"
            onClick={() => handleEditClick(expense.expenseid)}
          >
            <MdEdit className="text-xl text-blue-600 hover:text-blue-800 md:text-2xl" />
          </span>
        </div>
      </div>
    </div>
  );
}

export default ExpenseItem;
