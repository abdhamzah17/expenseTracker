import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import ExpenseList from "../components/ExpenseList";
import MenuBar from "../components/MenuBar";
import ExpenseForm from "../components/ExpenseForm";
import Header from "../components/Header";
import DialogBox from "../components/DialogBox";

const { VITE_API_BASE_URL } = import.meta.env;
function Expenses() {
  const [expenses, setExpenses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sortBy, setSortBy] = useState("recent");
  const [query, setQuery] = useState("");
  const [timeStamp, setTimeStamp] = useState("");
  const [category, setCategory] = useState("all");
  const [lastChanged, setLastChanged] = useState("");
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [dialog, setDialog] = useState({
    message: "",
    isVisible: false,
  });

  const searchedExpenses = expenses.filter((expense) =>
    expense.expensename.toLowerCase().includes(query.toLowerCase()),
  );

  function handleEditClick(id) {
    setSelectedExpense(() => {
      const chosen = expenses.find((expense) => expense.expenseid === id);
      return chosen;
    });
    setIsEditing(true);
  }

  function handleCancel() {
    setSelectedExpense(null);
    setIsEditing(false);
  }
  function handleDeleteClick(id) {
    setSelectedExpense(() => {
      const chosen = expenses.find((expense) => expense.expenseid === id);
      return chosen;
    });
    setDialog((dialog) => ({
      ...dialog,
      message: "Are you sure you want to delete this expense?",
      isVisible: true,
    }));
  }

  async function handleAdd(expense) {
    try {
      setIsLoading(true);
      setSelectedExpense(expense);
      const { data: response } = await axios.post(
        `${VITE_API_BASE_URL}/expense/add`,
        expense,
      );
      if (!response.success) {
        toast.error(response.message);
      } else {
        toast.success(response.message);
      }
    } catch (error) {
      if (error?.response?.data?.message)
        toast.error(error?.response?.data?.message);
      else toast.error("Something went wrong!");
    } finally {
      setIsLoading(false);
      setSelectedExpense(null);
    }
  }

  async function handleEdit(expense) {
    try {
      setIsLoading(true);
      const { data: response } = await axios.put(
        `${VITE_API_BASE_URL}/expense/edit/${selectedExpense.expenseid}`,
        expense,
      );
      if (!response.success) {
        toast.error(response.message);
      } else {
        toast.success(response.message);
      }
    } catch (error) {
      if (error?.response?.data?.message)
        toast.error(error?.response?.data?.message);
      else toast.error("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
    setSelectedExpense(null);
    setIsEditing(null);
  }

  async function handleDelete(res) {
    if (res) {
      try {
        setIsLoading(true);
        const { data: response } = await axios.delete(
          `${VITE_API_BASE_URL}/expense/delete/${selectedExpense.expenseid}`,
        );
        if (!response.success) {
          toast.error(response.message);
        } else {
          toast.success(response.message);
        }
      } catch (error) {
        if (error?.response?.data?.message)
          toast.error(error?.response?.data?.message);
        else toast.error("Something went wrong!");
      } finally {
        setIsLoading(false);
      }
    }
    setSelectedExpense(null);
    setDialog((dialog) => ({ ...dialog, message: "", isVisible: false }));
  }

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
          setExpenses(response.data);
        }
      } catch (error) {
        if (error?.response?.data?.message)
          toast.error(error?.response?.data?.message);
        else toast.error("Something went wrong!");
      } finally {
        setIsLoading(false);
      }
    }
    async function getExpensesByCategory() {
      try {
        setIsLoading(true);
        const { data: response } = await axios.get(
          `${VITE_API_BASE_URL}/expense/${category}`,
        );
        if (!response.success) {
          toast.error(response.message);
        } else {
          setExpenses(response.data);
        }
      } catch (error) {
        if (error?.response?.data?.message)
          toast.error(error?.response?.data?.message);
        else toast.error("Something went wrong!");
      } finally {
        setIsLoading(false);
      }
    }
    async function getExpensesByTimeStamp() {
      const [year, month] = timeStamp.split("-");
      try {
        setIsLoading(true);
        const { data: response } = await axios.get(
          `${VITE_API_BASE_URL}/expense/timestamp?month=${parseInt(month) - 1}&year=${year}`,
        );
        if (!response.success) {
          toast.error(response.message);
        } else {
          setExpenses(response.data);
        }
      } catch (error) {
        if (error?.response?.data?.message)
          toast.error(error?.response?.data?.message);
        else toast.error("Something went wrong!");
      } finally {
        setIsLoading(false);
      }
    }
    if (selectedExpense == null) {
      if (category == "all" && timeStamp == "") {
        getExpenses();
      } else if (lastChanged == "category" && category != "all") {
        getExpensesByCategory();
      } else if (lastChanged == "timeStamp" && timeStamp != "") {
        getExpensesByTimeStamp();
      } else {
        getExpenses();
      }
    }
  }, [selectedExpense, category, timeStamp, lastChanged]);

  useEffect(() => {
    setIsLoading(true);

    const sortExpenses = (expenses) => {
      const sortedExpenses = [...expenses];

      switch (sortBy) {
        case "oldest":
          return sortedExpenses.sort(
            (a, b) => new Date(a.expensedate) - new Date(b.expensedate),
          );
        case "recent":
          return sortedExpenses.sort(
            (a, b) => new Date(b.expensedate) - new Date(a.expensedate),
          );
        case "highest":
          return sortedExpenses.sort(
            (a, b) => parseFloat(b.expenseamount) - parseFloat(a.expenseamount),
          );
        case "lowest":
          return sortedExpenses.sort(
            (a, b) => parseFloat(a.expenseamount) - parseFloat(b.expenseamount),
          );
        default:
          return expenses;
      }
    };

    setExpenses((exp) => sortExpenses(exp));
    setIsLoading(false);
  }, [sortBy]);

  return (
    <main className="flex min-h-screen w-full flex-col items-center gap-2">
      <Header />
      <div className="flex min-h-[calc(100vh-60px)] w-full flex-col items-center justify-evenly gap-2">
        <MenuBar
          query={query}
          setQuery={setQuery}
          sortBy={sortBy}
          setSortBy={setSortBy}
          category={category}
          setCategory={setCategory}
          timeStamp={timeStamp}
          setTimeStamp={setTimeStamp}
          lastChanged={lastChanged}
          setLastChanged={setLastChanged}
        />
        <ExpenseForm
          handleAdd={handleAdd}
          isEditing={isEditing}
          handleCancel={handleCancel}
          handleEdit={handleEdit}
          selectedExpense={selectedExpense}
        />
        <ExpenseList
          expenses={searchedExpenses}
          isLoading={isLoading}
          handleDeleteClick={handleDeleteClick}
          handleEditClick={handleEditClick}
        />
      </div>
      {dialog.isVisible && (
        <DialogBox message={dialog.message} onDialog={handleDelete} />
      )}
    </main>
  );
}

export default Expenses;
