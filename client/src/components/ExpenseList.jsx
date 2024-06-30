import PropTypes from "prop-types";
import ExpenseItem from "./ExpenseItem";
import { HiEmojiHappy } from "react-icons/hi";
import LoadingExpense from "./LoadingExpense";

ExpenseList.propTypes = {
  expenses: PropTypes.array,
  isLoading: PropTypes.bool,
  handleDeleteClick: PropTypes.func,
  handleEditClick: PropTypes.func,
};
function ExpenseList({
  expenses,
  isLoading,
  handleDeleteClick,
  handleEditClick,
}) {
  return (
    <article className="scrollbar-thin scrollbar-track-white scrollbar-thumb-blue-500 mx-auto mb-4 h-[50vh] w-[95%] space-y-4 overflow-y-scroll rounded-2xl border-2 border-blue-500 bg-white p-4 text-center shadow-xl md:w-4/5">
      {isLoading ? (
        [0, 1, 2, 3, 4].map((ele) => <LoadingExpense key={ele} />)
      ) : expenses.length === 0 ? (
        <div>
          <p className="my-2 text-gray-800">No expenses made</p>
          <HiEmojiHappy className="mx-auto text-4xl text-gray-400" />
        </div>
      ) : (
        expenses.map((expense) => (
          <ExpenseItem
            expense={expense}
            key={expense.expenseid}
            handleDeleteClick={handleDeleteClick}
            handleEditClick={handleEditClick}
          />
        ))
      )}
    </article>
  );
}

export default ExpenseList;
