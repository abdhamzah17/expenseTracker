import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { HiEmojiHappy } from "react-icons/hi";
import Expense from "./Expense";
import LoadingExpense from "./LoadingExpense";
const { VITE_API_BASE_URL } = import.meta.env;
function RecentExpenses() {
  const [expenses, setExpenses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    async function getExpenses() {
      try {
        setIsLoading(true);
        const { data: response } = await axios.get(
          `${VITE_API_BASE_URL}/expense`,
        );
        if (!response.success) {
          toast.error(response.message);
        } else {
          setExpenses(response.data.slice(0, 10));
        }
      } catch (error) {
        console.log(error);
        if (error?.response?.data?.message)
          toast.error(error?.response?.data?.message);
        else toast.error("Something went wrong!");
      } finally {
        setIsLoading(false);
      }
    }
    getExpenses();
  }, []);
  return (
    <article className="m-auto min-h-[36rem] w-[90%] max-w-96 space-y-4 overflow-y-auto rounded-2xl bg-white p-4 text-center shadow-2xl">
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
          <Expense expense={expense} key={expense.expenseid} />
        ))
      )}
    </article>
  );
}

export default RecentExpenses;
