import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import ExpenseList from "../components/ExpenseList";
import MenuBar from "../components/MenuBar";
import ExpenseForm from "../components/ExpenseForm";
import Header from "../components/Header";

const { VITE_API_BASE_URL } = import.meta.env;
function Expenses() {
  const [expenses, setExpenses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sortBy, setSortBy] = useState("recent");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [selectedExpense, setSelectedExpense] = useState(null);
  const searchedExpenses =
    query.length > 2
      ? expenses.filter((expense) =>
          expense.expensename.toLowerCase().includes(query.toLowerCase()),
        )
      : expenses;

  async function handleAdd(expense) {
    try {
      setIsLoading(true);
      const { data: response } = await axios.post(
        `${VITE_API_BASE_URL}/expense/add`,
        expense,
      );
      console.log(response);
      if (!response.success) {
        toast.error(response.message);
      } else {
        toast.success(response.message);
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

  useEffect(() => {
    async function getExpenses() {
      try {
        setIsLoading(true);
        const { data: response } = await axios.get(
          `${VITE_API_BASE_URL}/expense`,
        );
        console.log(response);
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
    if (selectedExpense == null && category == "all") getExpenses();
  }, [selectedExpense, category]);

  useEffect(
    function () {
      async function getExpenses() {
        try {
          setIsLoading(true);
          const { data: response } = await axios.get(
            `${VITE_API_BASE_URL}/expense/${category}`,
          );
          console.log(response);
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
      if (category != "all") getExpenses();
    },
    [category],
  );

  useEffect(
    function () {
      switch (sortBy) {
        case "recent":
          setExpenses((exp) =>
            exp.sort(
              (a, b) => new Date(b.expensedate) - new Date(a.expensedate),
            ),
          );
          break;
        case "oldest":
          setExpenses((exp) =>
            exp.sort(
              (a, b) => new Date(a.expensedate) - new Date(b.expensedate),
            ),
          );
          break;
        case "lowest":
          setExpenses((exp) =>
            exp.sort(
              (a, b) =>
                parseFloat(a.expenseamount) - parseFloat(b.expenseamount),
            ),
          );
          break;
        case "highest":
          setExpenses((exp) =>
            exp.sort(
              (a, b) =>
                parseFloat(b.expenseamount) - parseFloat(a.expenseamount),
            ),
          );
          break;
        default:
          console.log("Some problem occured");
      }
    },
    [sortBy],
  );

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-around">
      <Header />
      <MenuBar
        query={query}
        setQuery={setQuery}
        sortBy={sortBy}
        setSortBy={setSortBy}
        category={category}
        setCategory={setCategory}
      />
      <ExpenseForm handleAdd={handleAdd} />
      <ExpenseList expenses={searchedExpenses} isLoading={isLoading} />
    </main>
  );
}

export default Expenses;
