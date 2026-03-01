const container = document.getElementById("transactionsContainer");
const incomeCard = document.getElementById("incomeCard");
const expenseCard = document.getElementById("expenseCard");
const balanceCard = document.getElementById("balanceCard");

render();





function totalIncome() {
  let total = 0;
  state.transactions.forEach((transaction) => {
    if (transaction.type === "income") {
      total += transaction.amount;
    }
  });
  return total;
}

function totalExpense() {
  let total = 0;
  state.transactions.forEach((transaction) => {
    if (transaction.type === "expense") {
      total += transaction.amount;
    }
  });
  return total;
}

function currentBalance() {
  return totalIncome() - totalExpense();
}

// local storage

let state = JSON.parse(localStorage.getItem("savedData")) || {
  transactions: [],
};

function render() {
  localStorage.setItem("savedData", JSON.stringify(state));
  // Update card values
  if (incomeCard) {
    const incomeValue = incomeCard.querySelector(".card-income");
    if (incomeValue) {
      incomeValue.textContent = `$${totalIncome().toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
  }
  if (expenseCard) {
    const expenseValue = expenseCard.querySelector(".card-expense");
    if (expenseValue) {
      expenseValue.textContent = `$${totalExpense().toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
  }
  if (balanceCard) {
    const balanceValue = balanceCard.querySelector(".text-dark");
    if (balanceValue) {
      balanceValue.textContent = `$${currentBalance().toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
  }
  if (state.transactions.length === 0) {
    container.innerHTML = "<p>No transactions found.</p>";
  }
}
