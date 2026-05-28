// ==========================================
// SIMPLE TIP CALCULATOR - JAVASCRIPT
// ==========================================

// --- LEARNING: SELECTING ELEMENTS ---
// 1. Grab the input box where the user types the bill
const billInput = document.getElementById("bill-input");

// 2. Grab the button that triggers the math
const calculateBtn = document.getElementById("calculate-btn");

// 3. Grab the span where we will display the final tip number
const tipAmountDisplay = document.getElementById("tip-amount");

// --- LEARNING: INPUTS AND MATH ---
// Wait for the user to click the calculate button
calculateBtn.addEventListener("click", function () {
    // a. Get what the user typed into the box.
    // We use '.value' instead of '.innerText' because it is an input field!
    const rawInput = billInput.value;

    // b. Convert the text into a real Number.
    // HTML inputs often treat what you type as text (like a word), even if it's a number.
    // Number() magically transforms the text "45" into the math number 45.
    const billNumber = Number(rawInput);

    // c. Calculate the 20% tip.
    // In math, 20% is written as the decimal 0.20.
    const tipMath = billNumber * 0.2;

    // d. Format the money to look nice!
    // '.toFixed(2)' forces the computer to always show exactly 2 decimal places.
    // So 9 becomes 9.00, and 9.1 becomes 9.10!
    const finalTip = tipMath.toFixed(2);

    // e. Show the final tip on the screen
    tipAmountDisplay.innerText = finalTip;
});
