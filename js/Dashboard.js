const container = document.getElementById("transactionsContainer");
const incomeCard = document.getElementById("incomeCard");
const expenseCard = document.getElementById("expenseCard");
const balanceCard = document.getElementById("balanceCard");
const listTransaction = document.getElementById("listTransaction");
const periodSelect = document.getElementById("periodSelect");

let state = JSON.parse(localStorage.getItem("transactions")) || [];

const getUniquePeriods = () => {
  const periods = state.map((t) => {
    const d = new Date(t.date);
    return d.toLocaleString("en-US", { month: "long", year: "numeric" });
  });
  // Use Set to remove duplicates
  return [...new Set(periods)];
};

const populatePeriodSelect = () => {
  const select = document.getElementById("periodSelect");
  if (!select) return;
  select.innerHTML = '<option value="all">All Transactions</option>';
  const uniquePeriods = getUniquePeriods();
  uniquePeriods.forEach((period) => {
    const option = document.createElement("option");
    option.value = period;
    option.textContent = period;
    select.appendChild(option);
  });
};


 const TransactionCards = () => { 

  const incomeValue = state.filter(t => t.type === "income").reduce ((sum,t) => sum + Number(t.amount),0);

  const expenseValue = state.filter(t => t.type === "expense").reduce ((sum,t) => sum + Number(t.amount),0);

  const balanceValue = incomeValue - expenseValue;
  
  return { incomeValue, expenseValue, balanceValue };
}


const UpdateCards = () => {
  const { incomeValue, expenseValue, balanceValue } = TransactionCards();
  if (incomeCard) {
    incomeCard.innerHTML = `
      <div class="text-start">
        <p class="text-muted mb-1 fw-bold">Total Income</p>
        <h2 class="card-income mb-0">$${incomeValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}</h2>
      </div>`;
  }
  if (expenseCard) {
    expenseCard.innerHTML = `
      <div class="text-start">
        <p class="text-muted mb-1 fw-bold">Total Expenses</p>
        <h2 class="card-expense mb-0">$${expenseValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}</h2>
      </div>`;
  }
  if (balanceCard) {
    balanceCard.innerHTML = `
      <div class="text-start">
        <p class="text-muted mb-1 fw-bold">Current Balance</p>
        <h2 class="balance">$${balanceValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}</h2>
      </div>`;
  }
}

function TransactionList() {
  listTransaction.innerHTML = "";

  if (state.length === 0) {
    listTransaction.innerHTML =
      "<li class='text-center text-muted '>No transactions yet.</li>";
    return;
  }

  state.forEach((transaction) => {
    let list = document.createElement("li");
    list.className = "transaction-item";

    let span = document.createElement("span");
    span.textContent = transaction.category + " ";
    span.className = "transaction-category";

    let dateSpan = document.createElement("span");
    dateSpan.className = "transaction-date";
    const displayDate = new Date(transaction.date);
    dateSpan.textContent = isNaN(displayDate)
      ? "No Date"
      : displayDate.toLocaleDateString();

    let amountSpan = document.createElement("span");
    amountSpan.className = "transaction-amount";
    amountSpan.textContent = ` $${transaction.amount.toFixed(2)} `;
    amountSpan.style.color = transaction.type === "income" ? "green" : "red";

    list.append(span, dateSpan, amountSpan);
    listTransaction.appendChild(list);
  });
}

function setTransactions(transactions) {
  localStorage.setItem("transactions", JSON.stringify(transactions));
  UpdateCards();
  populatePeriodSelect();
}

setTransactions(state);
UpdateCards();
populatePeriodSelect();
TransactionList();

