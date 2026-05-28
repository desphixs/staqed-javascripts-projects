/**
 * MOVIE SEARCH APP LOGIC
 * Educator Note: This app handles complex UI states (Search vs Watchlist).
 * We keep our data synchronized using the `watchlist` array and `localStorage`.
 */

// ==========================================
// 1. CONFIGURATION & STATE
// ==========================================
const API_KEY = "39988678"; // Get yours at omdbapi.com
const BASE_URL = "https://www.omdbapi.com/";

// State Variables
let searchTimeoutToken = 0; // Used for Debouncing
let currentDisplayedMovies = []; // Stores the current search results
let currentActiveMovie = null; // Stores the movie currently viewed in the modal

// Load watchlist from localStorage immediately.
// Why || []? If localStorage is empty, default to an empty array so our app doesn't crash.
let watchlist = JSON.parse(localStorage.getItem("movieWatchlist")) || [];

// ==========================================
// 2. DOM SELECTION
// ==========================================
const searchInput = document.querySelector("#search-input");
const moviesGrid = document.querySelector("#movies-grid");
const statusMessage = document.querySelector("#status-message");

// Tabs
const tabSearch = document.querySelector("#tab-search");
const tabWatchlist = document.querySelector("#tab-watchlist");

// Modal Elements
const modal = document.querySelector("#movie-modal");
const closeModalBtn = document.querySelector("#close-modal-btn");
const modalPoster = document.querySelector("#modal-poster");
const modalTitle = document.querySelector("#modal-title");
const modalYear = document.querySelector("#modal-year");
const modalRating = document.querySelector("#modal-rating");
const modalRuntime = document.querySelector("#modal-runtime");
const modalPlot = document.querySelector("#modal-plot");
const watchlistBtn = document.querySelector("#watchlist-btn");

// ==========================================
// 3. CORE LOGIC (FETCHING & DEBOUNCING)
// ==========================================

/**
 * Handles user typing with Debouncing.
 * Why Debounce? If the user types "Batman" quickly (6 letters), we don't want to make 6 API calls.
 * We clear the timer on every keystroke, and only run the API call if they stop typing for 500ms.
 */
searchInput.addEventListener("input", (event) => {
    const searchTerm = event.target.value.trim();

    // Clear the previous timer
    clearTimeout(searchTimeoutToken);

    // If input is empty, clear the grid and show default message
    if (searchTerm === "") {
        moviesGrid.innerHTML = "";
        renderStatus("Start typing to discover movies...");
        return;
    }

    // Set a new timer for 500 milliseconds
    searchTimeoutToken = setTimeout(() => {
        fetchMovies(searchTerm);
    }, 500);
});

/**
 * Fetches search results from OMDb API
 */
const fetchMovies = async (query) => {
    try {
        renderStatus("Searching...");

        // s= query searches by title.
        const response = await fetch(`${BASE_URL}?s=${query}&apikey=${API_KEY}`);
        const data = await response.json();

        // OMDb returns Response: "False" if nothing is found
        if (data.Response === "False") {
            renderStatus(`No results found for "${query}".`);
            moviesGrid.innerHTML = "";
            return;
        }

        // Save data to state and render
        currentDisplayedMovies = data.Search;
        renderMovieCards(currentDisplayedMovies);
    } catch (error) {
        renderStatus("Something went wrong. Please check your connection.");
    }
};

/**
 * Fetches full details for a single movie using its ID
 */
const fetchMovieDetails = async (imdbID) => {
    try {
        // i= query fetches exact details for a specific ID.
        const response = await fetch(`${BASE_URL}?i=${imdbID}&apikey=${API_KEY}`);
        const movieDetails = await response.json();

        openModal(movieDetails);
    } catch (error) {
        alert("Failed to load movie details.");
    }
};

// ==========================================
// 4. RENDERING LOGIC
// ==========================================

/**
 * Renders an array of movies to the grid
 */
const renderMovieCards = (moviesArray) => {
    // Clear the grid and hide status message
    moviesGrid.innerHTML = "";

    if (moviesArray.length === 0) {
        renderStatus("Your watchlist is empty. Go find some movies!");
        return;
    }

    // Hide status if there are movies
    const statusEl = document.querySelector("#status-message");
    if (statusEl) statusEl.remove();

    moviesArray.forEach((movie) => {
        const card = document.createElement("article");

        // Soft UI Card Styling
        card.className = "bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden cursor-pointer transition-all hover:shadow-md hover:-translate-y-1 fade-in flex flex-col h-full";

        // Handle missing posters gracefully
        const posterSrc = movie.Poster !== "N/A" ? movie.Poster : "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=600";

        card.innerHTML = `
            <figure class="w-full h-72 bg-slate-100 shrink-0">
                <img src="${posterSrc}" alt="${movie.Title}" class="w-full h-full object-cover" loading="lazy">
            </figure>
            <div class="p-4 flex flex-col flex-1 justify-between">
                <h3 class="font-semibold text-slate-800 line-clamp-2 leading-tight">${movie.Title}</h3>
                <span class="text-xs text-slate-500 mt-2 bg-slate-100 px-2 py-1 rounded-md self-start">${movie.Year}</span>
            </div>
        `;

        // Attach click listener directly to the dynamically created card
        card.addEventListener("click", () => fetchMovieDetails(movie.imdbID));

        moviesGrid.appendChild(card);
    });
};

/**
 * Helper to show text messages in the grid area
 */
const renderStatus = (message) => {
    moviesGrid.innerHTML = `<p id="status-message" class="col-span-full text-center text-slate-500 py-12">${message}</p>`;
};

// ==========================================
// 5. MODAL & WATCHLIST LOGIC
// ==========================================

const openModal = (movie) => {
    // Save to active state so the Watchlist button knows which movie it's dealing with
    currentActiveMovie = movie;

    // Populate modal UI
    modalTitle.textContent = movie.Title;
    modalYear.textContent = movie.Year;
    modalRating.innerHTML = `<i class="fa-solid fa-star text-yellow-400"></i> ${movie.imdbRating}`;
    modalRuntime.textContent = movie.Runtime;
    modalPlot.textContent = movie.Plot;

    modalPoster.src = movie.Poster !== "N/A" ? movie.Poster : "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=600";

    // Update Watchlist button UI based on whether it's already saved
    updateWatchlistButtonUI();

    // Show modal
    modal.classList.remove("hidden");
};

const closeModal = () => {
    modal.classList.add("hidden");
    currentActiveMovie = null;
};

const toggleWatchlist = () => {
    if (!currentActiveMovie) return;

    // Why .some()? It checks if at least one item in the array matches our condition.
    // We check if the movie ID is already in our saved array.
    const isSaved = watchlist.some((item) => item.imdbID === currentActiveMovie.imdbID);

    if (isSaved) {
        // Remove it using .filter() to create a new array without that ID
        watchlist = watchlist.filter((item) => item.imdbID !== currentActiveMovie.imdbID);
    } else {
        // Add it to the array
        watchlist.push(currentActiveMovie);
    }

    // Save the new array to local storage
    localStorage.setItem("movieWatchlist", JSON.stringify(watchlist));

    // Update the button visually
    updateWatchlistButtonUI();

    // If the user is currently looking at the watchlist tab, re-render it to show the removal immediately
    if (tabWatchlist.classList.contains("active-tab")) {
        renderMovieCards(watchlist);
    }
};

const updateWatchlistButtonUI = () => {
    const isSaved = watchlist.some((item) => item.imdbID === currentActiveMovie.imdbID);

    if (isSaved) {
        watchlistBtn.innerHTML = `<i class="fa-solid fa-check"></i> Saved to Watchlist`;
        watchlistBtn.className = "w-full bg-indigo-600 text-white font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2";
    } else {
        watchlistBtn.innerHTML = `<i class="fa-solid fa-bookmark"></i> Add to Watchlist`;
        watchlistBtn.className = "w-full bg-indigo-50 border-2 border-indigo-100 hover:border-indigo-500 text-indigo-700 font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2";
    }
};

// ==========================================
// 6. EVENT LISTENERS & TAB MANAGEMENT
// ==========================================

closeModalBtn.addEventListener("click", closeModal);
watchlistBtn.addEventListener("click", toggleWatchlist);

// Close modal if user clicks on the dark background overlay outside the card
modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
});

// Tab Logic
tabSearch.addEventListener("click", () => {
    // Style active state
    tabSearch.className = "active-tab bg-indigo-600 text-white px-6 py-2 rounded-xl font-medium shadow-sm transition-colors";
    tabWatchlist.className = "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200 px-6 py-2 rounded-xl font-medium transition-colors";

    // Render search results
    if (currentDisplayedMovies.length > 0) {
        renderMovieCards(currentDisplayedMovies);
    } else {
        renderStatus("Start typing to discover movies...");
    }
});

tabWatchlist.addEventListener("click", () => {
    // Style active state
    tabWatchlist.className = "active-tab bg-indigo-600 text-white px-6 py-2 rounded-xl font-medium shadow-sm transition-colors";
    tabSearch.className = "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200 px-6 py-2 rounded-xl font-medium transition-colors";

    // Render Watchlist from state
    renderMovieCards(watchlist);
});
