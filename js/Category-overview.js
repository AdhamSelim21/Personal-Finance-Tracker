const TotalExpenses = document.getElementById("TotalExpenses");
const ExpensesList = document.getElementById("ExpensesList");
const HighestExpense = document.getElementById("HighestExpense");
const Average = document.getElementById("Average");

let state = JSON.parse(localStorage.getItem("transactions")) || [];

const CalcToltalExpenses = () => {

    const expenseValue = state.filter(t => t.type === "expense").reduce ((sum,t) => sum + Number(t.amount),0);

    if (TotalExpenses) {
        TotalExpenses.innerHTML = `
        <span class="stat-label fw-bold">Total Expenses</span>
        <p class="h3 fw-bold mb-0 text-dark">$${expenseValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
        `;
    }
    return expenseValue;
}
CalcToltalExpenses();

const categoryExpenses = () => {

    const Rent = state
      .filter((t) => t.category === "Rent" && t.type === "expense")
      .reduce((sum, t) => sum + Number(t.amount), 0);

      const Food = state
        .filter((t) => t.category === "Food" && t.type === "expense")
        .reduce((sum, t) => sum + Number(t.amount), 0);

        const Utilities = state
          .filter((t) => t.category === "Utilities" && t.type === "expense")
          .reduce((sum, t) => sum + Number(t.amount), 0);

          return{ Rent , Food , Utilities}


}

const RenderExpenses = () => {
  const expenses = categoryExpenses(); 

  if (!ExpensesList) return;

  ExpensesList.innerHTML = "";

  const categories = [
    { key: "Rent", label: "Rent", color: "bg-primary" },
    { key: "Food", label: "Food", color: "bg-success" },
    { key: "Utilities", label: "Utilities", color: "bg-warning" },
  ];

  categories.forEach((cat) => {
    const amount = expenses[cat.key];
    if (amount > 0) {
      const list = document.createElement("li");
      list.className = "list-unstyled"; 

      list.innerHTML = `
                <div class="list-group-item p-4 border-0 border-bottom">
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="d-flex align-items-center">
                            <span class="category-dot ${cat.color}"></span>
                            <span class="fw-medium text-dark">${cat.label}</span>
                        </div>
                        <span class="fw-bold text-dark">
                            $${amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                        </span>
                    </div>
                </div>`;

      ExpensesList.appendChild(list);
    }
  });
};

const cardUpdates = () => {
  const { Rent, Food, Utilities } = categoryExpenses();

  if (HighestExpense) {
    let highestValue = 0;
    let highestName = "";

    
    if (Rent >= Food && Rent >= Utilities) {
      highestValue = Rent;
      highestName = "Rent";
    } else if (Food >= Rent && Food >= Utilities) {
      highestValue = Food;
      highestName = "Food";
    } else {
      highestValue = Utilities;
      highestName = "Utilities";
    }

    HighestExpense.innerHTML = `
            <p class="stat-label mb-1">Highest: ${highestName}</p>
            <p class="h4 fw-bold mb-0 text-dark">
                $${highestValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </p>`;
  }
};

const RenderAverageExpense = () => {
  const expenses = categoryExpenses(); 

  // 1. Get an array of just the numbers
  const values = Object.values(expenses);

  const total = values.reduce((sum, current) => sum + current, 0);

  const average = values.length > 0 ? total / values.length : 0;

  if (Average) {
    Average.innerHTML = `
            <p class="stat-label mb-1">Average per Category</p>
            <p class="h4 fw-bold mb-0 text-dark">
                $${average.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </p>`;
  }
};


RenderExpenses();
categoryExpenses();
cardUpdates();
RenderAverageExpense();


