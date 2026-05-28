/**
 * PROJECT HUB LOGIC
 * Educator Note: By structuring our data as Arrays of Objects, we separate our
 * "Content" from our "Presentation". If you want to add a project, just add
 * a new object to the array below. The UI will build itself!
 */

// A high-quality Unsplash tech placeholder to use until real screenshots are added.
const PLACEHOLDER_IMG = "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80";

// Base URL used when copying project links (adjust to your deployed site)
const SITE_BASE = "https://staqed-javascript-projects.netlify.app";

// ==========================================
// 1. DATA MODELS
// ==========================================

const beginnerProjects = [
    { title: "Color Flipper", description: "Change page colors instantly and learn DOM manipulation.", link: "./Beginner/1-color-flipper/index.html", image: "./Beginner/1-color-flipper/image.png", category: "Beginner" },
    { title: "Simple Counter", description: "Build a counter app with add, subtract, and reset controls.", link: "./Beginner/2-simple-counter/index.html", image: "./Beginner/2-simple-counter/image.png", category: "Beginner" },
    { title: "Joke Generator", description: "Generate funny quotes from an array and update the UI dynamically.", link: "./Beginner/3-joke-generator/index.html", image: "./Beginner/3-joke-generator/image.png", category: "Beginner" },
    { title: "Digital Clock", description: "Show the current time with live updates using JavaScript.", link: "./Beginner/4-digital-clock/index.html", image: "./Beginner/4-digital-clock/image.png", category: "Beginner" },
    { title: "Tip Calculator", description: "Calculate tips quickly from bill and service values.", link: "./Beginner/5-tip-calculator/index.html", image: "./Beginner/5-tip-calculator/image.png", category: "Beginner" },
    { title: "Todo List", description: "Add, complete, and delete tasks while practicing DOM updates.", link: "./Beginner/6-todo-list/index.html", image: "./Beginner/6-todo-list/image.png", category: "Beginner" },
    { title: "BMI Calculator", description: "Calculate body mass index using height and weight inputs.", link: "./Beginner/7-bmi-calculator/index.html", image: "./Beginner/7-bmi-calculator/image.png", category: "Beginner" },
    { title: "Random Quote Generator", description: "Show a new quote each click from a local quote list.", link: "./Beginner/8-random-quote-generator/index.html", image: "./Beginner/8-random-quote-generator/image.png", category: "Beginner" },
    { title: "Drum Kit", description: "Play drum sounds with keyboard keys and animate each hit.", link: "./Beginner/9-drum-kit/index.html", image: "./Beginner/9-drum-kit/image.png", category: "Beginner" },
    { title: "Countdown Timer", description: "Count down to a future date with live time updates.", link: "./Beginner/10-countdown-timer/index.html", image: "./Beginner/10-countdown-timer/image.png", category: "Beginner" },
];

const intermediateProjects = [
    { title: "Weather App", description: "Search city weather and display temperature, humidity, and conditions.", link: "./Intermediate/1-weather-app/index.html", image: "./Intermediate/1-weather-app/image.png", category: "Intermediate" },
    { title: "Recipe Search App", description: "Browse and search recipes from a shared dataset with instant filtering.", link: "./Intermediate/2-recipe-search-app/index.html", image: "./Intermediate/2-recipe-search-app/image.png", category: "Intermediate" },
    { title: "Expense Tracker", description: "Add income and expenses, then track your balance in real time.", link: "./Intermediate/3-expense-tracker/index.html", image: "./Intermediate/3-expense-tracker/image.png", category: "Intermediate" },
    { title: "Quiz App with Timer", description: "Answer timed questions and see your score when the quiz ends.", link: "./Intermediate/4-quiz-app-with-timer/index.html", image: "./Intermediate/4-quiz-app-with-timer/image.png", category: "Intermediate" },
    { title: "Password Generator", description: "Create strong passwords with custom length and character options.", link: "./Intermediate/5-password-generator/index.html", image: "./Intermediate/5-password-generator/image.png", category: "Intermediate" },
    { title: "Notes App (Markdown)", description: "Write, edit, and save notes with markdown preview support.", link: "./Intermediate/6-notes-app-markdown/index.html", image: "./Intermediate/6-notes-app-markdown/image.png", category: "Intermediate" },
    { title: "Currency Converter", description: "Convert between currencies with live exchange rate calculations.", link: "./Intermediate/7-currency-converter/index.html", image: "./Intermediate/7-currency-converter/image.png", category: "Intermediate" },
    { title: "Rock Paper Scissors", description: "Play against the computer with score tracking and round logic.", link: "./Intermediate/8-rock-paper-scissors/index.html", image: "./Intermediate/8-rock-paper-scissors/image.png", category: "Intermediate" },
    { title: "Movie Search Web App", description: "Search movies and view details in a polished, app-like UI.", link: "./Intermediate/9-movie-search-web-app/index.html", image: "./Intermediate/9-movie-search-web-app/image.png", category: "Intermediate" },
    { title: "Image Gallery Filtering", description: "Filter images by category and open each photo in a lightbox view.", link: "./Intermediate/10-image-gallery-filtering/index.html", image: "./Intermediate/10-image-gallery-filtering/image.png", category: "Intermediate" },
    { title: "Cinesync", description: "Watch or interact with movie-related content in a polished interface.", link: "./Intermediate/11-cinesync/index.html", image: "./Intermediate/11-cinesync/image.png", category: "Intermediate" },
];

// ==========================================
// 2. RENDERING LOGIC
// ==========================================

/**
 * Loops through a project array and injects HTML cards into the specified grid container.
 * Also handles the dynamic logic for the "View More" button.
 */
const renderProjects = (projectsArray, gridId, countId, buttonId) => {
    const gridContainer = document.getElementById(gridId);
    const countContainer = document.getElementById(countId);
    const viewMoreBtn = document.getElementById(buttonId);

    // 1. Dynamically update the total project count text
    countContainer.innerHTML = `<span class="flex h-2 w-2 rounded-full bg-brand"></span> ${projectsArray.length} Projects`;

    // 2. Loop through the array and construct HTML for each card
    projectsArray.forEach((project, index) => {
        // If the index is 6 or higher (meaning the 7th item and beyond), hide it initially
        const isHidden = index >= 6;
        const hiddenClass = isHidden ? "hidden hidden-card" : "";

        // Using Template Literals to build the HTML string
        const cardHTML = `
            <a href="${project.link}" class="${hiddenClass} group flex flex-col rounded-3xl bg-white border border-slate-200/80 overflow-hidden card-hover-fx">
                <div class="h-48 bg-slate-50 relative overflow-hidden">
                    <img src="${project.image}" alt="${project.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                </div>
                <div class="p-6 flex-1 flex flex-col border-t border-slate-100">
                    <div class="flex items-center justify-between mb-3">
                        <span class="text-[10px] font-bold uppercase tracking-widest text-brand bg-brand/10 px-3 py-1 rounded-full">${project.category}</span>
                        <div class="flex items-center gap-3">
                            <button class="copy-link-btn" data-link="${SITE_BASE + project.link.replace("./", "/")}" aria-label="Copy link">
                                <i data-lucide="copy" class="w-5 h-5 text-slate-400 hover:text-brand transition-colors"></i>
                            </button>
                            <i data-lucide="arrow-up-right" class="w-5 h-5 text-slate-400 group-hover:text-brand transition-colors"></i>
                        </div>
                    </div>
                    <h3 class="text-xl font-bold text-slate-900 mb-2 group-hover:text-brand transition-colors">${project.title}</h3>
                    <p class="text-slate-500 text-sm leading-relaxed">${project.description}</p>
                </div>
            </a>
        `;

        // Inject the HTML into the DOM
        gridContainer.insertAdjacentHTML("beforeend", cardHTML);
    });

    // Attach copy handlers for the buttons we just injected
    const copyButtons = gridContainer.querySelectorAll(".copy-link-btn");
    copyButtons.forEach((btn) => {
        // prevent adding duplicate listeners
        if (btn._hasCopyListener) return;
        btn._hasCopyListener = true;
        btn.addEventListener("click", (e) => {
            // Prevent the anchor's default navigation when clicking the copy button
            e.preventDefault();
            e.stopPropagation();

            const link = btn.getAttribute("data-link");
            if (!link) return;

            // Use Clipboard API to copy the full URL
            navigator.clipboard
                .writeText(link)
                .then(() => {
                    const original = btn.innerHTML;
                    btn.textContent = "Copied";
                    setTimeout(() => {
                        btn.innerHTML = original;
                    }, 1400);
                })
                .catch(() => {
                    // Fallback: select and prompt
                    window.prompt("Copy this link", link);
                });
        });
    });

    // 3. Logic for the "View More" Button
    if (projectsArray.length > 6) {
        // Show the button if there are hidden cards
        viewMoreBtn.classList.remove("hidden");
        viewMoreBtn.classList.add("flex");

        // Add the click event to reveal hidden cards
        viewMoreBtn.addEventListener("click", () => {
            const hiddenCards = gridContainer.querySelectorAll(".hidden-card");

            hiddenCards.forEach((card) => {
                // Remove the utility classes hiding the element
                card.classList.remove("hidden", "hidden-card");
            });

            // Hide the button permanently after clicking
            viewMoreBtn.classList.add("hidden");
            viewMoreBtn.classList.remove("flex");
        });
    }
};

// ==========================================
// 3. INITIALIZATION
// ==========================================

// Render Beginner Projects
renderProjects(beginnerProjects, "beginner-grid", "beginner-count", "view-more-beginner");

// Render Intermediate Projects
renderProjects(intermediateProjects, "intermediate-grid", "intermediate-count", "view-more-intermediate");

// Crucial: Because we injected new HTML strings containing Lucide icons (<i data-lucide="...">),
// we must tell Lucide to re-scan the DOM and draw the SVGs.
lucide.createIcons();
