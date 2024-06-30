import PropTypes from "prop-types";
Expense.propTypes = {
  expense: PropTypes.object,
};
function Expense({ expense }) {
  return (
    <div className="flex w-full items-center justify-between gap-2 rounded-md border-l-4 border-blue-500 px-4 py-2 shadow-md">
      <div className="space-y-1">
        <h3 className="font- text-[1rem] font-semibold">
          {expense.expensename}
        </h3>
        {/* <p className="w-min rounded-2xl bg-blue-500 px-2 py-1 text-xs font-semibold text-white">
          {expense.expensecategory}
        </p> */}
        <p className="text-xs">
          {new Date(expense.expensedate).toLocaleDateString("en-GB")}
        </p>
      </div>
      <div>
        <span className="text-lg font-bold text-blue-500">
          &#8377;{expense.expenseamount}
        </span>
      </div>
    </div>
  );
}

export default Expense;
