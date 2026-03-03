const transactionForm = document.getElementById("transactionForm");
const incomeTransaction = document.getElementById("type-income");
const expenseTransaction = document.getElementById("type-expense");
const amountTransaction = document.getElementById("amount");
const categoryTransaction = document.getElementById("category");
const dateTransaction = document.getElementById("date");
const noteTransaction = document.getElementById("note");
const listTransaction = document.getElementById("listTransaction");


let state = JSON.parse(localStorage.getItem("transactions")) || [];

function setTransactions(transactions) {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}
setTransactions(state);

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



transactionForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const formData = {
    type: incomeTransaction.checked ? "income" : "expense",
    amount: parseFloat(amountTransaction.value),
    category: categoryTransaction.value,
    date: new Date(dateTransaction.value),
    note: noteTransaction.value,
    id: Date.now(),
  };
  state.push(formData);
  setTransactions(state);
  transactionForm.reset();
  dateTransaction.valueAsDate = new Date(); 
  TransactionList();
});


function TransactionList() {
  listTransaction.innerHTML = "";

  if (state.length === 0) {
    listTransaction.innerHTML =
      "<li class='text-center text-muted'>No transactions yet.</li>";
    return;
  }

  state.forEach((transaction) => {
    // Renamed from 'transactions' for clarity
    let list = document.createElement("li");
    list.className = "transaction-item row align-items-center m-0";

    // Create Category Span
    let span = document.createElement("span");
    span.textContent = transaction.category + " ";
    span.className = "col-md-6 col-8 d-flex align-items-center p-0";

    // Create Date Span (Handling the string-to-date conversion)
    let dateSpan = document.createElement("span");
    dateSpan.className = "col-4 text-end";
    const displayDate = new Date(transaction.date);
    dateSpan.textContent = isNaN(displayDate)
      ? "No Date"
      : displayDate.toLocaleDateString();

    // Create Amount Span
    let amountSpan = document.createElement("span");
    amountSpan.className = "col-2 text-end";
    amountSpan.textContent = ` $${transaction.amount.toFixed(2)} `;
    amountSpan.style.color = transaction.type === "income" ? "green" : "red";

    // Delete button
    let deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = " \u00D7";
    deleteBtn.className = "btn btn-link text-secondary p-0 border-0";
    deleteBtn.onclick = function () {
      state = state.filter((item) => item.id !== transaction.id);
      setTransactions(state);
      TransactionList();
    };

    list.append(span, dateSpan, amountSpan, deleteBtn);
    listTransaction.appendChild(list);
  });
}

// CRITICAL: Call this so it shows data on page load
TransactionList();
