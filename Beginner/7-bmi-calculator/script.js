/**
 * BMI Calculator Logic
 * --------------------
 * The formula for BMI is: weight (kg) / [height (m)]^2
 */

// 1. Select DOM Elements
// We use 'const' because these element references will not change.
const bmiForm = document.querySelector("#bmi-form");
const heightInput = document.querySelector("#height");
const weightInput = document.querySelector("#weight");
const resultContainer = document.querySelector("#result-container");
const bmiValueDisplay = document.querySelector("#bmi-value");
const bmiStatusDisplay = document.querySelector("#bmi-status");

/**
 * Handle Form Submission
 */
bmiForm.addEventListener("submit", (event) => {
    // We use preventDefault() to stop the browser from reloading the page,
    // which is the default behavior for form submissions.
    event.preventDefault();

    // 2. Get Values and Convert
    // Values from inputs are strings by default, so we convert them to numbers.
    const heightCm = parseFloat(heightInput.value);
    const weightKg = parseFloat(weightInput.value);

    // 3. Validation Logic
    // Ensuring the user entered positive numbers before doing math.
    if (heightCm > 0 && weightKg > 0) {
        calculateBMI(heightCm, weightKg);
    } else {
        alert("Please enter valid positive numbers for height and weight.");
    }
});

/**
 * Perform Calculation and Update UI
 */
function calculateBMI(height, weight) {
    // Formula requires height in meters, so we divide cm by 100
    const heightInMeters = height / 100;

    // Math.pow(x, 2) squares the number.
    // We then use .toFixed(1) to round the result to one decimal place.
    const bmi = (weight / Math.pow(heightInMeters, 2)).toFixed(1);

    // 4. Update the Display
    bmiValueDisplay.textContent = bmi;

    // Determine the category based on standard health ranges
    let status = "";
    let colorClass = "";

    if (bmi < 18.5) {
        status = "Underweight";
        colorClass = "bg-amber-100 text-amber-700";
    } else if (bmi >= 18.5 && bmi <= 24.9) {
        status = "Normal Weight";
        colorClass = "bg-green-100 text-green-700";
    } else if (bmi >= 25 && bmi <= 29.9) {
        status = "Overweight";
        colorClass = "bg-orange-100 text-orange-700";
    } else {
        status = "Obese";
        colorClass = "bg-red-100 text-red-700";
    }

    // 5. Update UI Classes and Text
    // We clear existing color classes and apply the new one based on the result.
    bmiStatusDisplay.textContent = status;
    bmiStatusDisplay.className = `inline-block px-4 py-1 rounded-full text-sm font-bold ${colorClass}`;

    // Reveal the result container by removing the Tailwind 'hidden' class
    resultContainer.classList.remove("hidden");
}
