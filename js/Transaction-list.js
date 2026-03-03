
const listTransaction = document.getElementById("listTransaction");


let state = JSON.parse(localStorage.getItem("transactions")) || [];

function setTransactions(transactions) {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}
setTransactions(state);




function TransactionList() {
  listTransaction.innerHTML = "";

  if (state.length === 0) {
    listTransaction.innerHTML =
      "<li class='text-center text-muted '>No transactions yet.</li>";
    return;
  }

  state.forEach((transaction) => {
    let list = document.createElement("li");
    list.className = "transaction-item row align-items-center m-0";

    let span = document.createElement("span");
    span.textContent = transaction.category + " ";
    span.className = "col-md-6 col-8 d-flex align-items-center p-0 fw-bold ";

    let dateSpan = document.createElement("span");
    dateSpan.className = "col-4 text-end ";
    const displayDate = new Date(transaction.date);
    dateSpan.textContent = isNaN(displayDate)
      ? "No Date"
      : displayDate.toLocaleDateString();

    let amountSpan = document.createElement("span");
    amountSpan.className = "col-2 text-end";
    amountSpan.textContent = ` $${transaction.amount.toFixed(2)} `;
    amountSpan.style.color = transaction.type === "income" ? "green" : "red";

    let deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = '<image src="images/delete-button.png" alt="Delete" >';
    deleteBtn.className = "btn btn-link text-secondary p-0 border-0 ";
    deleteBtn.onclick = function () {
      state = state.filter((item) => item.id !== transaction.id);
      setTransactions(state);
      TransactionList();
    };

    list.append(span, dateSpan, amountSpan, deleteBtn);
    listTransaction.appendChild(list);
  });
}

TransactionList();
