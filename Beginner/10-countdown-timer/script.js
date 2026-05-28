/**
 * PROJECT: Countdown Timer
 * CONCEPTS: Date Objects, setInterval, DOM Content Updates, Template Literals
 */

// 1. DOM Selection
const dateInput = document.getElementById("date-input");
const startBtn = document.getElementById("start-btn");
const message = document.getElementById("message");

// Individual time unit displays
const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minsEl = document.getElementById("minutes");
const secsEl = document.getElementById("seconds");

// 2. State Management
let countdownInterval; // Why? We store this in a variable so we can clear/stop it later.

/**
 * Logic: Updates the UI with the remaining time
 * @param {number} targetTime - The timestamp we are counting down to
 */
function updateCountdown(targetTime) {
    const now = new Date().getTime(); // Gets the current time in milliseconds
    const distance = targetTime - now; // Difference between now and target

    // Logic: Stop timer if we reach zero or a past date
    if (distance < 0) {
        clearInterval(countdownInterval);
        message.classList.remove("hidden");
        resetDisplay();
        return;
    }

    // Mathematical conversions from milliseconds to units
    // 1000ms * 60s * 60m * 24h = 1 day
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Update UI with padded numbers (e.g., 09 instead of 9)
    // Why padStart? It makes the UI look consistent by always showing two digits.
    daysEl.textContent = String(days).padStart(2, "0");
    hoursEl.textContent = String(hours).padStart(2, "0");
    minsEl.textContent = String(minutes).padStart(2, "0");
    secsEl.textContent = String(seconds).padStart(2, "0");
}

/**
 * Action: Initiates the timer based on user input
 */
function startTimer() {
    const userValue = dateInput.value;

    if (!userValue) {
        alert("Please select a date and time!");
        return;
    }

    const targetDate = new Date(userValue).getTime();

    // Why clear existing intervals?
    // If a user clicks 'Set' twice, we don't want multiple timers running at once.
    clearInterval(countdownInterval);
    message.classList.add("hidden");

    // Run the function once immediately, then every 1 second (1000ms)
    updateCountdown(targetDate);
    countdownInterval = setInterval(() => updateCountdown(targetDate), 1000);
}

/**
 * Helper: Reset numbers to zero
 */
function resetDisplay() {
    daysEl.textContent = "00";
    hoursEl.textContent = "00";
    minsEl.textContent = "00";
    secsEl.textContent = "00";
}

// 3. Event Listener
startBtn.addEventListener("click", startTimer);
