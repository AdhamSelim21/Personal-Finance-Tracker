const transactionForm = document.getElementById("transactionForm");
const incomeTransaction = document.getElementById("type-income");
const expenseTransaction = document.getElementById("type-expense");
const amountTransaction = document.getElementById("amount");
const categoryTransaction = document.getElementById("category");
const dateTransaction = document.getElementById("date");
const noteTransaction = document.getElementById("note");

const categories = ["Rent", "Food", "Utilities"];
function populateCategory() {
  categoryTransaction.innerHTML = "";
  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categoryTransaction.appendChild(option);
  });
}
populateCategory();

dateTransaction.valueAsDate = new Date();

let state = JSON.parse(localStorage.getItem("transactions")) || [];

function setTransactions(transactions) {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}
setTransactions(state);

transactionForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const formData = {
    type: incomeTransaction.checked ? "income" : "expense",
    amount: parseFloat(amountTransaction.value),
    category: categoryTransaction.value,
    date: new Date(dateTransaction.value),
    note: noteTransaction.value,
  };
  state.push(formData);
  setTransactions(state);
  transactionForm.reset();
  dateTransaction.valueAsDate = new Date(); 
});
