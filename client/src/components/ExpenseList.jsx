import PropTypes from "prop-types";
import ExpenseItem from "./ExpenseItem";
import { HiEmojiHappy } from "react-icons/hi";
import LoadingExpense from "./LoadingExpense";

ExpenseList.propTypes = {
  expenses: PropTypes.array,
  isLoading: PropTypes.boolean,
};
function ExpenseList({ expenses, isLoading }) {
  return (
    <article className="mx-auto min-h-[50vh] w-4/5 space-y-4 overflow-y-auto rounded-2xl border-2 border-blue-500 bg-white p-4 text-center shadow-xl">
      <h2 className="text-xl font-bold text-blue-500">Recent Expenses</h2>
      {expenses.length === 0 ? (
        <div>
          <p className="my-2 text-gray-800">No expenses made</p>
          <HiEmojiHappy className="mx-auto text-4xl text-gray-400" />
        </div>
      ) : isLoading ? (
        [0, 1, 2, 3, 4, 5].map((ele) => <LoadingExpense key={ele} />)
      ) : (
        expenses.map((expense) => (
          <ExpenseItem expense={expense} key={expense.expenseid} />
        ))
      )}
    </article>
  );
}

export default ExpenseList;
