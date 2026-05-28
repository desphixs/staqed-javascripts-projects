/**
 * CURRENCY CONVERTER LOGIC
 * Educator Note: We are using the ExchangeRate-API open endpoint.
 * It bases all conversions off a single "base" currency, returning an object
 * filled with current exchange rates for dozens of global currencies.
 */

// ==========================================
// 1. DOM SELECTION
// ==========================================
const amountInput = document.querySelector("#amount");
const currencyFrom = document.querySelector("#currency-from");
const currencyTo = document.querySelector("#currency-to");
const swapBtn = document.querySelector("#swap-btn");
const exchangeRateText = document.querySelector("#exchange-rate-text");
const resultDisplay = document.querySelector("#result-display");
const statusMsg = document.querySelector("#status-msg");

// ==========================================
// 2. STATE MANAGEMENT
// ==========================================
// We store the rates here so we don't have to fetch from the API every single time
// the user types a new number in the amount input.
let currentRates = {};

// ==========================================
// 3. CORE FUNCTIONS
// ==========================================

/**
 * Initializes the app by fetching the global currency list
 * and populating our dropdown menus.
 */
const initApp = async () => {
    try {
        // Fetch base rates for USD to get the master list of all currencies
        const response = await fetch("https://api.exchangerate-api.com/v4/latest/USD");
        const data = await response.json();

        // Extract just the currency codes (e.g., ['USD', 'AED', 'AFN', 'ALL'...])
        // Why Object.keys()? The API returns rates as an object { USD: 1, EUR: 0.93 }.
        // This method grabs just the keys (the currency names) and turns them into an array.
        const currencies = Object.keys(data.rates);

        // Clear the hardcoded HTML loading options
        currencyFrom.innerHTML = "";
        currencyTo.innerHTML = "";

        // Populate the dropdowns
        currencies.forEach((currency) => {
            // Create a new <option> element for the "From" dropdown
            const optionFrom = document.createElement("option");
            optionFrom.value = currency;
            optionFrom.textContent = currency;
            currencyFrom.appendChild(optionFrom);

            // Create a new <option> element for the "To" dropdown
            const optionTo = document.createElement("option");
            optionTo.value = currency;
            optionTo.textContent = currency;
            currencyTo.appendChild(optionTo);
        });

        // Set sensible defaults
        currencyFrom.value = "USD";
        currencyTo.value = "EUR";

        // Trigger the initial calculation
        await fetchRatesAndCalculate();
    } catch (error) {
        statusMsg.textContent = "Error loading currencies. Check your connection.";
        statusMsg.classList.replace("text-slate-400", "text-rose-500");
    }
};

/**
 * Fetches the latest exchange rates for the currently selected "From" currency
 */
const fetchRatesAndCalculate = async () => {
    const from = currencyFrom.value;

    // Show loading state
    statusMsg.textContent = "Updating rates...";

    try {
        // Fetch rates specifically based on the currency the user wants to convert FROM
        const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${from}`);
        const data = await response.json();

        // Update our local state with the fresh data
        currentRates = data.rates;

        // Hide loading state
        statusMsg.textContent = "";

        // Perform the math
        calculate();
    } catch (error) {
        statusMsg.textContent = "Error updating rates.";
    }
};

/**
 * Calculates the final converted amount and updates the UI
 */
const calculate = () => {
    const from = currencyFrom.value;
    const to = currencyTo.value;

    // Get the amount the user typed in. If they cleared the box, default to 0.
    const amount = Number(amountInput.value) || 0;

    // Grab the specific rate we need from our state object
    const rate = currentRates[to];

    // Calculate the final value
    const convertedAmount = (amount * rate).toFixed(2);

    // Update the UI
    // Example: "1 USD = 0.93 EUR"
    exchangeRateText.textContent = `1 ${from} = ${rate.toFixed(4)} ${to}`;

    // Example: "93.00 EUR"
    resultDisplay.textContent = `${convertedAmount} ${to}`;
};

/**
 * Swaps the "From" and "To" currencies
 */
const handleSwap = () => {
    // We need a temporary variable so we don't lose the "From" value when we overwrite it
    const temp = currencyFrom.value;

    currencyFrom.value = currencyTo.value;
    currencyTo.value = temp;

    // Because the "From" currency changed, we must fetch new base rates from the API
    fetchRatesAndCalculate();
};

// ==========================================
// 4. EVENT LISTENERS
// ==========================================

// When the user types a new number, we don't need to fetch from the API again.
// We just run the math using the rates we already saved in `currentRates`.
amountInput.addEventListener("input", calculate);

// When the user changes the "To" currency, we also don't need a new API call.
// The base rates haven't changed, we just need to look at a different key in our state.
currencyTo.addEventListener("change", calculate);

// When the user changes the "From" currency, the baseline changes!
// We MUST fetch fresh data from the API before calculating.
currencyFrom.addEventListener("change", fetchRatesAndCalculate);

// Swap button click
swapBtn.addEventListener("click", handleSwap);

// ==========================================
// 5. BOOTSTRAP THE APP
// ==========================================
initApp();
