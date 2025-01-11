// Select elements
const totalIncomeEl = document.getElementById("total-income");
const totalExpensesEl = document.getElementById("total-expenses");
const balanceEl = document.getElementById("balance");
const transactionForm = document.getElementById("transaction-form");
const transactionList = document.getElementById("transaction-list");

// State variables
let totalIncome = 0;
let totalExpenses = 0;

// Update Summary
function updateSummary() {
    totalIncomeEl.textContent = `$${totalIncome}`;
    totalExpensesEl.textContent = `$${totalExpenses}`;
    balanceEl.textContent = `$${totalIncome + totalExpenses}`;
}

// Add Transaction
transactionForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const description = document.getElementById("description").value;
    const amount = parseFloat(document.getElementById("amount").value);
    const category = document.getElementById("category").value;
    const date = new Date().toLocaleDateString();

    // Update totals
    if (amount > 0 && category === "Income") {
        totalIncome += amount;
    } else {
        totalExpenses += amount;
    }

    // Add row to table
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${date}</td>
        <td>${description}</td>
        <td class="${amount > 0 ? 'income' : 'expense'}">$${amount}</td>
        <td>${category}</td>
        <td><button class="delete-btn">Delete</button></td>
    `;
    transactionList.appendChild(row);

    // Delete Transaction
    row.querySelector(".delete-btn").addEventListener("click", () => {
        if (amount > 0 && category === "Income") {
            totalIncome -= amount;
        } else {
            totalExpenses -= amount;
        }
        row.remove();
        updateSummary();
    });

    // Clear form and update summary
    transactionForm.reset();
    updateSummary();
});

// Initialize summary
updateSummary();
