/**
 * EXPENSE TRACKER LOGIC
 * Educator Note: This app relies heavily on a "State Array" (`transactions`).
 * Every time the user interacts with the app, we update the array,
 * and then redraw the UI to match the new array. This is the core concept behind React and other modern frameworks!
 */

// ==========================================
// 1. DOM SELECTION
// ==========================================
const balance = document.querySelector("#balance");
const moneyPlus = document.querySelector("#money-plus");
const moneyMinus = document.querySelector("#money-minus");
const list = document.querySelector("#list");
const form = document.querySelector("#form");
const textInput = document.querySelector("#text");
const amountInput = document.querySelector("#amount");

// ==========================================
// 2. STATE MANAGEMENT
// ==========================================
// We will store all transactions in this array.
// Each transaction will be an object: { id: 1, text: 'Salary', amount: 500 }
let transactions = [];

// ==========================================
// 3. CORE FUNCTIONS
// ==========================================

/**
 * Adds a new transaction to the DOM list
 */
const addTransactionDOM = (transaction) => {
    // Determine if the amount is an income (+) or expense (-)
    // Why use a ternary operator (condition ? true : false)? It keeps code clean and readable.
    const sign = transaction.amount < 0 ? "-" : "+";

    // Create the list item element
    const item = document.createElement("li");

    // Add specific CSS classes based on whether it's income or expense
    const colorClass = transaction.amount < 0 ? "border-rose-500 text-rose-600" : "border-emerald-500 text-emerald-600";
    const bgColor = transaction.amount < 0 ? "bg-rose-50" : "bg-emerald-50";

    // Style the list item. We use Tailwind classes to create a clean card.
    // Notice the relative and group classes: these help us show the delete button on hover.
    item.className = `transaction-item relative flex justify-between items-center p-3 rounded-xl border-l-4 shadow-sm transition-all ${colorClass} ${bgColor}`;

    // Why Math.abs? It removes the negative sign so we can format the string ourselves as -$20 instead of --20
    item.innerHTML = `
        <span class="font-medium text-slate-700">${transaction.text}</span>
        <span class="font-semibold">${sign}$${Math.abs(transaction.amount).toFixed(2)}</span>
        <button 
            onclick="removeTransaction(${transaction.id})" 
            class="delete-btn opacity-0 pointer-events-none absolute -left-3 -top-3 bg-rose-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs shadow-md transition-opacity"
            aria-label="Delete transaction"
        >
            <i class="fa-solid fa-xmark"></i>
        </button>
    `;

    // Append the newly created item to our UL element
    list.appendChild(item);
};

/**
 * Calculates and updates the Total, Income, and Expense displays
 */
const updateValues = () => {
    // 1. Create a new array containing ONLY the amounts using .map()
    const amounts = transactions.map((transaction) => transaction.amount);

    // 2. Calculate Total Balance
    // Why .reduce()? It takes an array of numbers and "reduces" it down to a single total sum.
    const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

    // 3. Calculate Total Income
    // We filter for positive numbers, then sum them up.
    const income = amounts
        .filter((item) => item > 0)
        .reduce((acc, item) => (acc += item), 0)
        .toFixed(2);

    // 4. Calculate Total Expense
    // We filter for negative numbers, sum them up, and multiply by -1 to display a positive string.
    const expense = (amounts.filter((item) => item < 0).reduce((acc, item) => (acc += item), 0) * -1).toFixed(2);

    // 5. Update the DOM elements
    balance.innerText = `$${total}`;
    moneyPlus.innerText = `+$${income}`;
    moneyMinus.innerText = `-$${expense}`;
};

/**
 * Deletes a transaction by ID
 */
const removeTransaction = (id) => {
    // Why .filter()? It creates a brand new array, keeping only items that DO NOT match the ID we clicked.
    transactions = transactions.filter((transaction) => transaction.id !== id);

    // After changing our state (the array), we must redraw the UI
    init();
};

/**
 * Generates a random ID for new transactions
 */
const generateID = () => {
    return Math.floor(Math.random() * 100000000);
};

/**
 * Re-renders the entire application based on the current state
 */
const init = () => {
    // Clear the list first so we don't duplicate items
    list.innerHTML = "";

    // Loop through the state array and add each item to the DOM
    transactions.forEach(addTransactionDOM);

    // Recalculate all numbers
    updateValues();
};

// ==========================================
// 4. EVENT LISTENERS
// ==========================================

form.addEventListener("submit", (e) => {
    // Why preventDefault? To stop the browser from refreshing the page when we hit the submit button.
    e.preventDefault();

    // Check if inputs are empty
    if (textInput.value.trim() === "" || amountInput.value.trim() === "") {
        alert("Please add a text and amount");
    } else {
        // Create a new transaction object
        const transaction = {
            id: generateID(),
            text: textInput.value,
            // Why +amountInput.value? The '+' sign converts the string input into a Number data type.
            amount: +amountInput.value,
        };

        // Add to our state array
        transactions.push(transaction);

        // Update the UI
        addTransactionDOM(transaction);
        updateValues();

        // Clear the input fields for the next entry
        textInput.value = "";
        amountInput.value = "";
    }
});

// Start the application
init();
