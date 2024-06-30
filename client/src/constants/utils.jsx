export function formatDate(date) {
  date = new Date(date);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function aggregateExpenses(expenses) {
  const expenseMap = {};

  expenses.forEach((expense) => {
    const { expensecategory, expenseamount } = expense;
    const amount = parseFloat(expenseamount);

    if (expenseMap[expensecategory]) {
      expenseMap[expensecategory] += amount;
    } else {
      expenseMap[expensecategory] = amount;
    }
  });

  return Object.keys(expenseMap).map((category) => ({
    name: category,
    value: expenseMap[category],
  }));
}
