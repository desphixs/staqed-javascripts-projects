/**
 * QUIZ APP LOGIC
 * Educator Note: We use an Array of Objects to act as our JSON database.
 * This keeps our data strictly separated from our HTML layout.
 */

// ==========================================
// 1. DATA (The Quiz Questions)
// ==========================================
const quizData = [
    {
        question: "What does HTML stand for?",
        options: ["Hyper Text Preprocessor", "Hyper Text Markup Language", "Hyper Text Multiple Language", "Hyper Tool Multi Language"],
        correctAnswer: 1, // Index of the correct option (Arrays are 0-indexed!)
    },
    {
        question: "Which of the following is used to style web pages?",
        options: ["HTML", "JavaScript", "CSS", "Python"],
        correctAnswer: 2,
    },
    {
        question: "What does JavaScript primarily add to a website?",
        options: ["Structure", "Styling", "Interactivity", "Database storage"],
        correctAnswer: 2,
    },
    {
        question: "In Tailwind CSS, which class gives an element rounded corners?",
        options: ["border-radius", "rounded", "corner-round", "circle"],
        correctAnswer: 1,
    },
    {
        question: "Which keyword is used to declare a variable that cannot be reassigned in ES6?",
        options: ["var", "let", "const", "static"],
        correctAnswer: 2,
    },
];

// ==========================================
// 2. DOM SELECTION
// ==========================================
// Screens
const startScreen = document.querySelector("#start-screen");
const quizScreen = document.querySelector("#quiz-screen");
const resultScreen = document.querySelector("#result-screen");

// Buttons
const startBtn = document.querySelector("#start-btn");
const nextBtn = document.querySelector("#next-btn");
const restartBtn = document.querySelector("#restart-btn");

// Quiz Elements
const questionText = document.querySelector("#question-text");
const optionsContainer = document.querySelector("#options-container");
const currentQNumDisplay = document.querySelector("#current-q-num");
const totalQNumDisplay = document.querySelector("#total-q-num");
const progressBar = document.querySelector("#progress-bar");
const timerDisplay = document.querySelector("#timer-display");
const finalScoreDisplay = document.querySelector("#final-score");

// ==========================================
// 3. STATE VARIABLES
// ==========================================
// These variables track the current status of the app.
let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 60; // 60 seconds for the whole quiz
let timerInterval;

// ==========================================
// 4. CORE FUNCTIONS
// ==========================================

/**
 * Initializes the quiz
 */
const startQuiz = () => {
    // Reset state variables just in case it's a restart
    currentQuestionIndex = 0;
    score = 0;
    timeLeft = 60;

    // Set total questions text
    totalQNumDisplay.textContent = quizData.length;

    // Hide Start Screen, Show Quiz Screen
    startScreen.classList.add("hidden");
    resultScreen.classList.add("hidden");
    quizScreen.classList.remove("hidden");
    // We use display: flex on the quiz screen via tailwind classes
    quizScreen.classList.add("flex");

    loadQuestion();
    startTimer();
};

/**
 * Handles the ticking clock
 */
const startTimer = () => {
    timerDisplay.textContent = `${timeLeft}s`;

    // Why setInterval? It runs a block of code repeatedly every X milliseconds.
    // 1000ms = 1 second.
    timerInterval = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = `${timeLeft}s`;

        if (timeLeft <= 0) {
            // Stop the timer
            clearInterval(timerInterval);
            endQuiz();
        }
    }, 1000);
};

/**
 * Loads the current question and generates option buttons
 */
const loadQuestion = () => {
    // 1. Get the current question object from our array
    const currentQuestion = quizData[currentQuestionIndex];

    // 2. Update UI text
    currentQNumDisplay.textContent = currentQuestionIndex + 1;
    questionText.textContent = currentQuestion.question;

    // 3. Update Progress Bar width
    // Formula: (Current Question Number / Total Questions) * 100
    const progressPercentage = (currentQuestionIndex / quizData.length) * 100;
    progressBar.style.width = `${progressPercentage}%`;

    // 4. Clear old options from the screen and hide next button
    optionsContainer.innerHTML = "";
    nextBtn.classList.add("hidden");

    // 5. Generate new option buttons dynamically
    // Why forEach? It allows us to loop through the options array cleanly.
    currentQuestion.options.forEach((optionText, index) => {
        const button = document.createElement("button");
        // Base styling for the buttons using Tailwind Soft UI
        button.className = "w-full text-left bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-medium py-4 px-6 rounded-xl transition-colors";
        button.textContent = optionText;

        // Add click listener to each button
        button.addEventListener("click", () => selectOption(index, button));

        optionsContainer.appendChild(button);
    });
};

/**
 * Handles logic when a user clicks an option
 */
const selectOption = (selectedIndex, selectedElement) => {
    const currentQuestion = quizData[currentQuestionIndex];
    const isCorrect = selectedIndex === currentQuestion.correctAnswer;

    // Grab all dynamically created buttons
    const allButtons = optionsContainer.querySelectorAll("button");

    // Disable all buttons so user can't click twice
    allButtons.forEach((btn, index) => {
        btn.disabled = true;
        btn.classList.remove("hover:bg-slate-100", "cursor-pointer");

        // Visually reveal the correct answer, no matter what they clicked
        if (index === currentQuestion.correctAnswer) {
            btn.classList.remove("bg-slate-50", "text-slate-700", "border-slate-200");
            btn.classList.add("bg-emerald-500", "text-white", "border-emerald-600");
        }
    });

    if (isCorrect) {
        score++;
    } else {
        // If wrong, highlight the selected button red
        selectedElement.classList.remove("bg-slate-50", "text-slate-700", "border-slate-200");
        selectedElement.classList.add("bg-rose-500", "text-white", "border-rose-600");
    }

    // Reveal the "Next Question" button
    nextBtn.classList.remove("hidden");
};

/**
 * Moves to next question or ends quiz
 */
const handleNext = () => {
    currentQuestionIndex++;

    if (currentQuestionIndex < quizData.length) {
        loadQuestion();
    } else {
        endQuiz();
    }
};

/**
 * Handles the end of the quiz
 */
const endQuiz = () => {
    // Stop the timer from running in the background
    clearInterval(timerInterval);

    // Hide quiz screen, show results
    quizScreen.classList.add("hidden");
    quizScreen.classList.remove("flex");

    resultScreen.classList.remove("hidden");
    resultScreen.classList.add("flex");

    // Display final score
    finalScoreDisplay.textContent = score;
};

// ==========================================
// 5. EVENT LISTENERS
// ==========================================
startBtn.addEventListener("click", startQuiz);
nextBtn.addEventListener("click", handleNext);
restartBtn.addEventListener("click", startQuiz);
