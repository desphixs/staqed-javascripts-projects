// ==========================================
// REAL-TIME DIGITAL CLOCK - JAVASCRIPT
// ==========================================

// --- LEARNING: SELECTING ELEMENTS ---
// Grab the screen area where we want to show the time
const clockDisplay = document.getElementById("clock-display");

// --- LEARNING: FUNCTIONS ---
// A function is a block of code we can run over and over again.
// We are packaging all our "time-getting" code inside this 'updateClock' function.
function updateClock() {
    // a. The Date Object: Ask the computer for the exact date and time right NOW.
    const now = new Date();

    // b. Extract just the hours, minutes, and seconds from the 'now' object.
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

    // c. The "Single Digit Problem"
    // Computers will show "9:5:2" instead of "09:05:02". We need to fix that!
    // '.toString()' turns the number into text.
    // '.padStart(2, "0")' says: "Make sure this is 2 characters long. If it's not, put a '0' in front of it."
    hours = hours.toString().padStart(2, "0");
    minutes = minutes.toString().padStart(2, "0");
    seconds = seconds.toString().padStart(2, "0");

    // d. Glue the hours, minutes, and seconds together with colons (:) in between.
    const currentTime = hours + ":" + minutes + ":" + seconds;

    // e. Update the HTML to show our formatted time!
    clockDisplay.innerText = currentTime;
}

// --- LEARNING: TIMING FUNCTIONS ---

// 1. We run the function once immediately, so the time shows up the second the page loads.
updateClock();

// 2. setInterval acts like a repeating timer!
// We tell it to run our 'updateClock' function every 1000 milliseconds (which is exactly 1 second).
// This is what makes the clock actually "tick" on the screen.
setInterval(updateClock, 1000);
