/**
 * RECIPE SEARCH APP LOGIC
 * Using predefined recipes array instead of external API
 * Features: Display all recipes by default, search to filter recipes
 */

// ==========================================
// 1. PREDEFINED RECIPES ARRAY
// ==========================================
// This array contains all the recipe data we'll work with
// Each recipe object has properties like label, image, calories, etc.
const allRecipes = [
    {
        // Unique identifier for the recipe
        id: 1,
        // Name of the recipe that will be displayed to users
        label: "Spaghetti Carbonara",
        // Category type for display
        dishType: "Pasta",
        // URL to the recipe image
        image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=500&auto=format&fit=crop",
        // Estimated calories per serving
        calories: 650,
        // Array of main ingredients in this recipe
        ingredients: ["spaghetti", "eggs", "bacon", "cheese"],
        // Link to full recipe details (you could add this later)
        url: "#",
    },
    {
        id: 2,
        label: "Chicken Stir-Fry",
        dishType: "Asian",
        image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=500&auto=format&fit=crop",
        calories: 520,
        ingredients: ["chicken", "broccoli", "soy sauce", "garlic", "ginger"],
        url: "#",
    },
    {
        id: 3,
        label: "Vegetable Curry",
        dishType: "Vegan",
        image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=500&auto=format&fit=crop",
        calories: 380,
        ingredients: ["vegetables", "coconut milk", "curry paste", "rice"],
        url: "#",
    },
    {
        id: 4,
        label: "Grilled Salmon",
        dishType: "Fish",
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&h=400&fit=crop",
        calories: 580,
        ingredients: ["salmon", "lemon", "herbs", "olive oil"],
        url: "#",
    },
    {
        id: 5,
        label: "Greek Salad",
        dishType: "Salad",
        image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=500&h=400&fit=crop",
        calories: 280,
        ingredients: ["tomatoes", "cucumber", "feta", "olives", "olive oil"],
        url: "#",
    },
    {
        id: 6,
        label: "Beef Tacos",
        dishType: "Mexican",
        image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=500&h=400&fit=crop",
        calories: 450,
        ingredients: ["beef", "tortillas", "lettuce", "cheese", "salsa"],
        url: "#",
    },
    {
        id: 7,
        label: "Margherita Pizza",
        dishType: "Italian",
        image: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=500&h=400&fit=crop",
        calories: 620,
        ingredients: ["dough", "tomato sauce", "mozzarella", "basil"],
        url: "#",
    },
    {
        id: 8,
        label: "Tom Yum Soup",
        dishType: "Asian",
        image: "https://images.unsplash.com/photo-1628430043175-0e8820df47c3?w=500&auto=format&fit=crop",
        calories: 220,
        ingredients: ["shrimp", "lemongrass", "chili", "coconut milk"],
        url: "#",
    },
    {
        id: 9,
        label: "Quinoa Buddha Bowl",
        dishType: "Vegan",
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&h=400&fit=crop",
        calories: 420,
        ingredients: ["quinoa", "vegetables", "chickpeas", "tahini"],
        url: "#",
    },
    {
        id: 10,
        label: "Chocolate Cake",
        dishType: "Dessert",
        image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&h=400&fit=crop",
        calories: 520,
        ingredients: ["chocolate", "flour", "eggs", "butter", "sugar"],
        url: "#",
    },
    {
        id: 11,
        label: "Pad Thai",
        dishType: "Asian",
        image: "https://images.unsplash.com/photo-1655091273851-7bdc2e578a88?w=500&auto=format&fit=crop",
        calories: 480,
        ingredients: ["rice noodles", "shrimp", "peanuts", "egg", "lime"],
        url: "#",
    },
    {
        id: 12,
        label: "Risotto Mushroom",
        dishType: "Italian",
        image: "https://plus.unsplash.com/premium_photo-1694850980439-61487c39be4f?w=500&auto=format&fit=crop",
        calories: 380,
        ingredients: ["arborio rice", "mushrooms", "white wine", "parmesan"],
        url: "#",
    },
];

// ==========================================
// 2. DOM SELECTION
// ==========================================
// We select HTML elements using querySelector and store them in variables
// These variables help us interact with the page without repeatedly writing the selector
const searchForm = document.querySelector("#search-form");
// Input field where the user types their search query
const searchInput = document.querySelector("#search-input");
// Container where recipe cards will be displayed
const recipeGrid = document.querySelector("#recipe-grid");
// Loading spinner that appears while fetching data (not used here but kept for structure)
const loadingSpinner = document.querySelector("#loading-spinner");
// Container for showing messages to the user (like "no results found")
const messageContainer = document.querySelector("#message-container");
// The actual text inside the message container
const messageText = document.querySelector("#message-text");

// ==========================================
// 3. STATE MANAGEMENT & UI HELPER FUNCTIONS
// ==========================================
// These functions control what the user sees on the page

/**
 * Function to hide the loading spinner
 * We don't use this much with predefined recipes, but keep it for consistency
 */
const hideLoading = () => {
    // Add the 'hidden' class to hide the spinner
    loadingSpinner.classList.add("hidden");
    // Remove the 'flex' class so it doesn't take up space
    loadingSpinner.classList.remove("flex");
};

/**
 * Function to display a message to the user
 * Used when there are no search results
 * @param {string} message - The message text to display
 */
const showMessage = (message) => {
    // Clear the recipe grid so it's empty
    recipeGrid.innerHTML = "";
    // Set the message text content
    messageText.textContent = message;
    // Remove the 'hidden' class to show the message
    messageContainer.classList.remove("hidden");
};

/**
 * Function to hide the message container
 * Called before displaying recipe cards
 */
const hideMessage = () => {
    // Add the 'hidden' class to hide the message
    messageContainer.classList.add("hidden");
};

// ==========================================
// 4. SEARCH & FILTER LOGIC
// ==========================================

/**
 * Function to filter recipes based on user search input
 * Searches through recipe names and ingredients
 * @param {string} query - The search term from the user
 * @returns {Array} - Array of recipes that match the search query
 */
const filterRecipes = (query) => {
    // Convert the query to lowercase for case-insensitive searching
    const searchTerm = query.toLowerCase();

    // Use the filter() method to return only recipes that match the search
    // The filter() method checks each recipe with the condition inside
    return allRecipes.filter((recipe) => {
        // Convert recipe label to lowercase and check if it includes the search term
        const labelMatch = recipe.label.toLowerCase().includes(searchTerm);

        // Convert the dishType to lowercase and check if it includes the search term
        const dishTypeMatch = recipe.dishType.toLowerCase().includes(searchTerm);

        // Convert all ingredients to lowercase and check if any ingredient includes the search term
        const ingredientMatch = recipe.ingredients.some((ingredient) => ingredient.toLowerCase().includes(searchTerm));

        // Return true if ANY of these conditions match (labelMatch OR dishTypeMatch OR ingredientMatch)
        // This means if a recipe matches any of these conditions, it will be included in the filtered array
        return labelMatch || dishTypeMatch || ingredientMatch;
    });
};

// ==========================================
// 5. RENDERING LOGIC
// ==========================================

/**
 * Function to create and display recipe cards in the grid
 * Loops through an array of recipes and creates HTML cards for each one
 * @param {Array} recipesToRender - The array of recipe objects to display
 */
const renderRecipes = (recipesToRender) => {
    // Clear the grid before adding new cards to avoid duplicates
    recipeGrid.innerHTML = "";

    // Check if the array is empty (no recipes found)
    if (recipesToRender.length === 0) {
        // Show a "no results" message to the user
        showMessage("No recipes found. Try a different search!");
        // Exit the function early - we don't need to render any cards
        return;
    }

    // If there are recipes, hide the message (if it was showing)
    hideMessage();

    // Loop through each recipe in the array
    recipesToRender.forEach((recipe) => {
        // Create a new <section> element for each recipe card
        const card = document.createElement("section");
        // Add Tailwind CSS classes for styling
        // These classes create: white background, rounded corners, shadow, border, padding, and hover effects
        card.className = "bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden card-transition hover:shadow-md hover:-translate-y-1 flex flex-col";

        // Set the inner HTML of the card using a template literal
        // Template literals (backticks `) let us write multi-line HTML with embedded variables
        card.innerHTML = `
            <!-- Recipe image -->
            <img 
                src="${recipe.image}" 
                alt="Image of ${recipe.label}" 
                class="w-full h-48 object-cover"
                loading="lazy"
            >
            <!-- Recipe details section -->
            <div class="p-6 flex flex-col flex-grow">
                <!-- Header section with category and title -->
                <header class="mb-4 flex-grow">
                    <!-- Dish type/category label in small uppercase text -->
                    <p class="text-xs text-orange-500 font-semibold uppercase tracking-wider mb-1">${recipe.dishType}</p>
                    <!-- Recipe name/title -->
                    <h2 class="text-xl font-semibold text-slate-800 line-clamp-2">${recipe.label}</h2>
                </header>
                
                <!-- Footer section with calories and view recipe link -->
                <footer class="mt-auto border-t border-slate-100 pt-4 flex items-center justify-between">
                    <!-- Calorie information with a flame icon -->
                    <span class="text-sm text-slate-500">
                        <i class="fa-solid fa-fire text-slate-400 mr-1"></i> 
                        ${Math.round(recipe.calories)} kcal
                    </span>
                    <!-- Link to view the full recipe (opens in a new tab) -->
                    <a 
                        href="${recipe.url}" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        class="text-orange-500 text-sm font-medium hover:text-orange-600 flex items-center gap-1"
                    >
                        View Recipe <i class="fa-solid fa-arrow-up-right-from-square text-xs"></i>
                    </a>
                </footer>
            </div>
        `;

        // Add the newly created card to the recipe grid in the HTML
        recipeGrid.appendChild(card);
    });
};

// ==========================================
// 6. INITIALIZATION - DISPLAY ALL RECIPES ON PAGE LOAD
// ==========================================

/**
 * Function to initialize the app when the page loads
 * Displays all recipes by default
 */
const initializeApp = () => {
    // Render all recipes from the allRecipes array
    renderRecipes(allRecipes);
};

// Call the initialization function as soon as the page loads
// This makes sure users see all recipes when they first visit the app
window.addEventListener("DOMContentLoaded", initializeApp);

// ==========================================
// 7. EVENT LISTENERS
// ==========================================

// Listen for the form submission (when user clicks the Search button or presses Enter)
searchForm.addEventListener("submit", (event) => {
    // preventDefault() stops the default form behavior of refreshing the entire page
    // Without this, the page would reload and our JavaScript would be reset
    event.preventDefault();

    // Get the text the user typed in the search input
    const query = searchInput.value.trim();

    // Check if the query is not empty
    if (query !== "") {
        // Call the filterRecipes function to get matching recipes
        const filteredRecipes = filterRecipes(query);
        // Render the filtered recipes
        renderRecipes(filteredRecipes);
    } else {
        // If the query is empty, show all recipes again
        renderRecipes(allRecipes);
    }

    // Optional: Clear the search input field after searching
    // This provides better UX so users know the search was processed
    // Uncomment the line below if you want this behavior
    // searchInput.value = '';
});

// Optional: Add event listener for real-time search (searches as user types)
// This provides a better UX similar to modern search boxes
searchInput.addEventListener("input", (event) => {
    // Get the current value in the search input
    const query = event.target.value.trim();

    // If the query is not empty, filter and render the recipes
    if (query !== "") {
        // Call filterRecipes to get matching recipes
        const filteredRecipes = filterRecipes(query);
        // Render the filtered results
        renderRecipes(filteredRecipes);
    } else {
        // If query becomes empty, show all recipes again
        renderRecipes(allRecipes);
    }
});
