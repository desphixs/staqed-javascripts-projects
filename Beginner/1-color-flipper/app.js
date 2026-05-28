// ==========================================
// THE MAGIC COLOR FLIPPER - JAVASCRIPT
// ==========================================

// STEP 1: Create a list of colors we want to use.
// In JavaScript, a list is called an "Array". We put our colors inside square brackets [ ].
const colors = ["#ef4444", "#3b82f6", "#10b981", "#f59e0b", "#8b5cf6", "#ec4899", "#14b8a6"];

// STEP 2: Find the button on our web page.
// We use 'document.getElementById' to search our HTML for the ID we gave our button ('color-btn').
// We save that button into a variable named 'button' so we can use it later.
const button = document.getElementById("color-btn");

// STEP 3: Find the background (the body) of our web page.
// Just like the button, we grab the HTML body using its ID ('page-body').
const body = document.getElementById("page-body");

// STEP 4: Make the button "listen" for a click.
// 'addEventListener' waits for a specific action. Here, it waits for a "click".
// When the click happens, it runs the instructions inside the function.
button.addEventListener("click", function () {
    // a. Pick a random number based on how many colors are in our list.
    // Math.random() picks a random decimal, and Math.floor() rounds it down to a whole number.
    const randomColorIndex = Math.floor(Math.random() * colors.length);

    // b. Select the random color from our list using the random number we just generated.
    const chosenColor = colors[randomColorIndex];

    // c. Change the actual background color of the web page!
    // We are reaching into the body's CSS styles and changing the 'backgroundColor' property.
    body.style.backgroundColor = chosenColor;
});
