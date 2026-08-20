let businessName = "";
let income = 0;
let expense = 0;
let transactions = [];

function loginBusiness() {
    const nameInput = document.getElementById("business-name");
    businessName = nameInput.value.trim();

    if (businessName === "") {
        alert("Please enter your business name.");
        return;
    }

    document.getElementById("dashboard-business-name").textContent =
        "Welcome To: " + businessName;

    document.getElementById("bookkeeping-business-name").textContent =
        businessName + " - Bookkeeping";

    showDashboard();
}

function showDashboard() {
    document.getElementById("user-page").style.display = "none";
    document.getElementById("dashboard-page").style.display = "block";
    document.getElementById("bookkeeping-page").style.display = "none";

    updateDashboard();
}

function showBookkeeping() {
    document.getElementById("user-page").style.display = "none";
    document.getElementById("dashboard-page").style.display = "none";
    document.getElementById("bookkeeping-page").style.display = "block";
}

function showUserPage() {
    document.getElementById("user-page").style.display = "block";
    document.getElementById("dashboard-page").style.display = "none";
    document.getElementById("bookkeeping-page").style.display = "none";
}

document.addEventListener("DOMContentLoaded", function() {

    const transactionForm = document.getElementById("transaction-form");

    if (transactionForm) {
        transactionForm.addEventListener("submit", function(event) {

            event.preventDefault();

            const type = document.getElementById("transaction-type").value;
            const amount = parseFloat(
                document.getElementById("amount").value
            );

            if (isNaN(amount) || amount <= 0) {
                alert("Please enter a valid amount.");
                return;
            }

            if (type === "income") {
                income += amount;
                transactions.push(
                    "Income: R" + amount.toFixed(2)
                );
            } else {
                expense += amount;
                transactions.push(
                    "Expense: R" + amount.toFixed(2)
                );
            }

            document.getElementById("amount").value = "";

            updateTransactions();
            updateDashboard();
        });
    }
});

function updateDashboard() {
    const profit = income - expense;

    document.getElementById("total-income").textContent =
        "R" + income.toFixed(2);

    document.getElementById("total-expenses").textContent =
        "R" + expense.toFixed(2);

    document.getElementById("net-profit").textContent =
        "R" + profit.toFixed(2);
}

function updateTransactions() {
    const transactionList =
        document.getElementById("transaction-list");

    transactionList.innerHTML = "";

    if (transactions.length === 0) {
        transactionList.innerHTML =
            "<p>No transactions recorded yet.</p>";
        return;
    }

    transactions.forEach(function(transaction) {

        const paragraph = document.createElement("p");

        paragraph.textContent = transaction;

        transactionList.appendChild(paragraph);
    });
}