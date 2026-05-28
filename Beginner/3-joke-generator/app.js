// ==========================================
// RANDOM JOKE GENERATOR - JAVASCRIPT
// ==========================================

// --- LEARNING: ARRAYS ---
// An array is just a list of items. We use square brackets [ ] to make an array.
// Here, we have a list of text strings (jokes), separated by commas.
const jokes = ["Why do programmers prefer dark mode? Because light attracts bugs.", "I told my computer I needed a break, and now it won't stop sending me Kit-Kats.", "Why did the web developer walk out of the restaurant? The table layout was terrible.", "What do you call a computer that sings? A Dell.", "Why was the JavaScript developer sad? Because they didn't Node how to Express their feelings.", "How many programmers does it take to change a light bulb? None, that's a hardware problem."];

// --- LEARNING: SELECTING ELEMENTS ---
// Grab the text paragraph where the joke will appear
const jokeDisplay = document.getElementById("joke-display");

// Grab the button the user will click
const generateBtn = document.getElementById("generate-btn");

// --- LEARNING: EVENT LISTENERS & RANDOMIZATION ---
// Wait for the user to click the button
generateBtn.addEventListener("click", function () {
    // a. Get the total number of jokes in our list.
    // 'jokes.length' asks the computer: "How many items are in the jokes array?"
    const totalJokes = jokes.length;

    // b. Generate a random decimal number between 0 and 0.999...
    const randomDecimal = Math.random();

    // c. Multiply that decimal by the total number of jokes.
    // This gives us a number between 0 and 5.999...
    const randomNumber = randomDecimal * totalJokes;

    // d. Chop off the decimal to make it a clean whole number (0, 1, 2, 3, 4, or 5).
    // Math.floor() always rounds DOWN to the nearest whole number.
    // We now have a random "Index" (a position in our list)!
    const randomIndex = Math.floor(randomNumber);

    // e. Use our random index to grab a specific joke from our array.
    // If randomIndex is 0, it grabs the first joke. If it's 1, it grabs the second, etc.
    const chosenJoke = jokes[randomIndex];

    // f. Update the HTML text to show the joke we just picked!
    jokeDisplay.innerText = chosenJoke;
});
