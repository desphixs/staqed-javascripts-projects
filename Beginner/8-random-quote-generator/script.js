/**
 * PROJECT: Random Quote Generator
 * CONCEPTS: Arrays, Objects, Math.random(), DOM Manipulation
 */

// 1. Data Store: An array of objects to hold our quotes locally
const quotes = [
    {
        text: "The only way to do great work is to love what you do.",
        author: "Steve Jobs",
    },
    {
        text: "Your time is limited, so don't waste it living someone else's life.",
        author: "Steve Jobs",
    },
    {
        text: "Innovation distinguishes between a leader and a follower.",
        author: "Steve Jobs",
    },
    {
        text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
        author: "Winston Churchill",
    },
    {
        text: "The future belongs to those who believe in the beauty of their dreams.",
        author: "Eleanor Roosevelt",
    },
    {
        text: "It does not matter how slowly you go as long as you do not stop.",
        author: "Confucius",
    },
];

// 2. DOM Selection: Grabbing the elements we need to update
const quoteText = document.getElementById("quote-text");
const quoteAuthor = document.getElementById("quote-author");
const newQuoteBtn = document.getElementById("new-quote-btn");
const tweetBtn = document.getElementById("tweet-quote-btn");
const quoteContainer = document.getElementById("quote-container");

// 3. Logic Function: Picks a random object from the array
function getRandomQuote() {
    // Math.random() gives a decimal between 0-1
    // Multiplying by quotes.length and using Math.floor() gives us a valid index
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const selectedQuote = quotes[randomIndex];

    displayQuote(selectedQuote);
}

// 4. UI Function: Updates the actual HTML content
function displayQuote(quote) {
    // Add a simple fade-out effect by reducing opacity
    quoteContainer.style.opacity = 0;

    // We use setTimeout to wait for the fade-out before changing text
    setTimeout(() => {
        quoteText.textContent = `"${quote.text}"`;
        quoteAuthor.textContent = `— ${quote.author || "Unknown"}`;

        // Update the Twitter link URL
        // encodeURIComponent ensures the quote text is safe to put in a URL
        const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(quote.text + " — " + quote.author)}`;
        tweetBtn.setAttribute("href", twitterUrl);

        // Fade the content back in
        quoteContainer.style.opacity = 1;
    }, 300);
}

// 5. Event Listeners: Triggering the logic on user interaction
newQuoteBtn.addEventListener("click", getRandomQuote);

// Initialize the app with a quote when the page loads
window.addEventListener("DOMContentLoaded", getRandomQuote);
