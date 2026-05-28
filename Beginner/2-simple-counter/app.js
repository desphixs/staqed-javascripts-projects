// ==========================================
// THE SIMPLE COUNTER - JAVASCRIPT
// ==========================================

// --- LEARNING: VARIABLES ---
// We need a way for our computer to remember the current number.
// We use 'let' because our count number WILL change.
// We initialize (start) the number at 0.
let countValue = 0;

// --- LEARNING: SELECTING ELEMENTS ---
// Before we can change anything, we must find the objects on our HTML page.
// We use document.getElementById("...") to grab the distinct elements.

// 1. Find the number display
const display = document.getElementById("count");

// 2. Find the "Decrease" button
const decreaseBtn = document.getElementById("decrease-btn");

// 3. Find the "Reset" button
const resetBtn = document.getElementById("reset-btn");

// 4. Find the "Increase" button
const increaseBtn = document.getElementById("increase-btn");

// --- LEARNING: EVENT LISTENERS ---
// Now we tell JavaScript to wait for a specific action (a "click").
// When a click happens on a button, it runs the instructions inside the function.

// --- 1. SETTING UP THE 'INCREASE' BUTTON ---
// Listen for a 'click' on the green 'increaseBtn'
increaseBtn.addEventListener("click", function () {
    // a. Increase the value of our 'countValue' variable by 1.
    // 'countValue++' is short for saying 'countValue = countValue + 1'
    countValue++;

    // b. Update the HTML display to show the *new* value of our variable.
    // We are reaching into the display element and changing its inner text.
    display.innerText = countValue;
});

// --- 2. SETTING UP THE 'DECREASE' BUTTON ---
// Listen for a 'click' on the red 'decreaseBtn'
decreaseBtn.addEventListener("click", function () {
    // a. Decrease the value of our 'countValue' variable by 1.
    // 'countValue--' is short for saying 'countValue = countValue - 1'
    countValue--;

    // b. Update the HTML display with the new number.
    display.innerText = countValue;
});

// --- 3. SETTING UP THE 'RESET' BUTTON ---
// Listen for a 'click' on the neutral 'resetBtn'
resetBtn.addEventListener("click", function () {
    // a. Reset the 'countValue' variable back to exactly 0.
    countValue = 0;

    // b. Update the HTML display one last time to show 0.
    display.innerText = countValue;
});
