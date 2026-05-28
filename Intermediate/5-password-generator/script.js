/**
 * PASSWORD GENERATOR LOGIC
 * Educator Note: This app reads the "State" of the form elements (checkboxes and slider)
 * to build a pool of valid characters, then randomly selects from that pool.
 */

// ==========================================
// 1. DATA (Character Sets)
// ==========================================
// We define our character pools as simple strings.
const CHAR_SETS = {
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    numbers: "0123456789",
    symbols: "!@#$%^&*()_+~`|}{[]:;?><,./-=",
};

// ==========================================
// 2. DOM SELECTION
// ==========================================
// Outputs
const passwordResult = document.querySelector("#password-result");
const lengthDisplay = document.querySelector("#length-display");
const copyIcon = document.querySelector("#copy-icon");

// Inputs
const lengthSlider = document.querySelector("#length-slider");
const uppercaseCb = document.querySelector("#uppercase-cb");
const lowercaseCb = document.querySelector("#lowercase-cb");
const numbersCb = document.querySelector("#numbers-cb");
const symbolsCb = document.querySelector("#symbols-cb");

// Buttons
const generateBtn = document.querySelector("#generate-btn");
const copyBtn = document.querySelector("#copy-btn");

// ==========================================
// 3. CORE FUNCTIONS
// ==========================================

/**
 * Updates the numerical display next to the slider
 */
const updateSliderDisplay = () => {
    // Read the current value of the slider and update the text
    lengthDisplay.textContent = lengthSlider.value;
};

/**
 * Core logic to generate the password
 */
const generatePassword = () => {
    // 1. Determine the desired length from the slider
    const length = +lengthSlider.value; // The '+' converts the string value to a number

    // 2. Build the pool of available characters based on checked boxes
    let charPool = "";

    if (uppercaseCb.checked) charPool += CHAR_SETS.uppercase;
    if (lowercaseCb.checked) charPool += CHAR_SETS.lowercase;
    if (numbersCb.checked) charPool += CHAR_SETS.numbers;
    if (symbolsCb.checked) charPool += CHAR_SETS.symbols;

    // 3. Handle Edge Case: User unchecked all boxes
    if (charPool === "") {
        passwordResult.value = "";
        // Optional: Alert the user or provide fallback logic
        alert("Please select at least one character type.");
        return;
    }

    // 4. Generate the password by picking random characters from our pool
    let finalPassword = "";

    // Why a for-loop? We know exactly how many times we need to loop (the length variable).
    for (let i = 0; i < length; i++) {
        // Math.random() generates a decimal between 0 and 1.
        // We multiply it by the length of our pool and round down using Math.floor() to get a valid index.
        const randomIndex = Math.floor(Math.random() * charPool.length);
        finalPassword += charPool[randomIndex];
    }

    // 5. Display the final password in the input field
    passwordResult.value = finalPassword;

    // Reset copy icon if it was previously clicked
    resetCopyIcon();
};

/**
 * Copies the generated password to the user's system clipboard
 */
const copyToClipboard = async () => {
    const password = passwordResult.value;

    // Don't do anything if there is no password to copy
    if (!password) return;

    try {
        // Why navigator.clipboard? This is the modern, secure Web API for copying text.
        // We use async/await because writing to the clipboard can take a split second,
        // and we want to wait for it to finish before showing the success checkmark.
        await navigator.clipboard.writeText(password);

        // Visual feedback: change the icon from a 'copy' icon to a 'check' icon
        copyIcon.className = "fa-solid fa-check text-emerald-500";

        // Change it back to normal after 2 seconds
        setTimeout(resetCopyIcon, 2000);
    } catch (error) {
        console.error("Failed to copy password: ", error);
        alert("Failed to copy to clipboard.");
    }
};

/**
 * Helper to reset the copy icon back to default
 */
const resetCopyIcon = () => {
    copyIcon.className = "fa-regular fa-copy text-xl";
};

// ==========================================
// 4. EVENT LISTENERS
// ==========================================

// Listen for the slider being dragged
lengthSlider.addEventListener("input", updateSliderDisplay);

// Listen for button clicks
generateBtn.addEventListener("click", generatePassword);
copyBtn.addEventListener("click", copyToClipboard);

// ==========================================
// 5. INITIALIZATION
// ==========================================
// Generate a password right when the page loads so it's not empty
generatePassword();
