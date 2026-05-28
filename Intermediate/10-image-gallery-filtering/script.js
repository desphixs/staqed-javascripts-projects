/**
 * IMAGE GALLERY LOGIC
 * Educator Note: We store our data in an Array of Objects.
 * This makes filtering, searching, and rendering incredibly clean and efficient.
 */

// ==========================================
// 1. DATA ARRAY (Our "Database")
// ==========================================
const galleryData = [
    { id: 1, title: "Misty Pine Forest", category: "Nature", src: "https://plus.unsplash.com/premium_photo-1669613233557-1676c121fe73?w=500&auto=format&fit=crop", alt: "Fog covering a dense pine forest" },
    { id: 2, title: "Modern Setup", category: "Tech", src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800", alt: "Laptop on a clean desk writing code" },
    { id: 3, title: "Golden Retriever", category: "Animals", src: "https://images.unsplash.com/photo-1552053831-71594a27632d?q=80&w=800", alt: "Happy dog running in a field" },
    { id: 4, title: "Circuit Board", category: "Tech", src: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800", alt: "Macro shot of a green computer motherboard" },
    { id: 5, title: "Mountain Peak", category: "Nature", src: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=800", alt: "Woman sitting on a cliff looking at mountains" },
    { id: 6, title: "Red Fox", category: "Animals", src: "https://images.unsplash.com/photo-1474511320723-9a56873867b5?w=500&auto=format&fit=crop", alt: "Close up of a red fox in the snow" },
    { id: 7, title: "Neon Keyboard", category: "Tech", src: "https://images.unsplash.com/photo-1595225476474-87563907a212?q=80&w=800", alt: "Glowing mechanical keyboard" },
    { id: 8, title: "Autumn Waterfall", category: "Nature", src: "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?q=80&w=800", alt: "Waterfall flowing through orange autumn leaves" },
];

// ==========================================
// 2. DOM SELECTION
// ==========================================
const galleryGrid = document.querySelector("#gallery-grid");
const filterButtons = document.querySelectorAll(".filter-btn");
const searchInput = document.querySelector("#search-input");
const emptyState = document.querySelector("#empty-state");

// Lightbox Elements
const lightbox = document.querySelector("#lightbox");
const lightboxImg = document.querySelector("#lightbox-img");
const lightboxTitle = document.querySelector("#lightbox-title");
const lightboxCategory = document.querySelector("#lightbox-category");
const closeLightboxBtn = document.querySelector("#close-lightbox");
const lightboxContent = document.querySelector("#lightbox-content");

// ==========================================
// 3. STATE MANAGEMENT
// ==========================================
// We keep track of what the user is currently looking for
let currentCategory = "All";
let searchTerm = "";

// ==========================================
// 4. CORE FUNCTIONS
// ==========================================

/**
 * Filters the data array based on state, then renders it.
 */
const updateGallery = () => {
    // 1. Filter the array
    const filteredImages = galleryData.filter((item) => {
        // Why === 'All'? If 'All' is selected, every category matches.
        const matchesCategory = currentCategory === "All" || item.category === currentCategory;

        // Why .toLowerCase()? It makes the search case-insensitive.
        const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());

        // Only return true if the item passes BOTH the category and search checks
        return matchesCategory && matchesSearch;
    });

    // 2. Render the results
    renderGallery(filteredImages);
};

/**
 * Takes an array of image objects and builds the HTML cards
 */
const renderGallery = (imagesToRender) => {
    // Clear out the old images before drawing the new ones
    galleryGrid.innerHTML = "";

    // Handle the empty state (if search returns 0 results)
    if (imagesToRender.length === 0) {
        emptyState.classList.remove("hidden");
    } else {
        emptyState.classList.add("hidden");
    }

    // Loop through the filtered array and create HTML for each item
    imagesToRender.forEach((item, index) => {
        const card = document.createElement("article");

        // Add styling and our custom animation class 'pop-in'
        card.className = "group bg-white p-2 rounded-2xl shadow-sm border border-slate-100 cursor-pointer pop-in hover:shadow-md transition-shadow";

        // Why animation-delay? Staggering the delay creates a beautiful cascading entrance effect.
        card.style.animationDelay = `${index * 0.05}s`;

        card.innerHTML = `
            <figure class="rounded-xl overflow-hidden relative aspect-square">
                <img src="${item.src}" alt="${item.alt}" class="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110" loading="lazy">
                
                <div class="absolute inset-0 bg-gradient-to-t from-slate-900/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                    <h3 class="text-white font-medium">${item.title}</h3>
                    <span class="text-indigo-300 text-xs uppercase tracking-wider">${item.category}</span>
                </div>
            </figure>
        `;

        // Add a click listener to the newly created card to open the Lightbox
        card.addEventListener("click", () => openLightbox(item));

        galleryGrid.appendChild(card);
    });
};

/**
 * Handles the visual styling of the filter buttons
 */
const setActiveButton = (clickedButton) => {
    filterButtons.forEach((btn) => {
        // Reset all buttons to the inactive style
        btn.className = "filter-btn bg-white text-slate-600 hover:bg-slate-100 border border-slate-200 px-6 py-2 rounded-xl font-medium transition-colors";
    });

    // Apply active styles to the one that was clicked
    clickedButton.className = "filter-btn active-filter bg-indigo-600 text-white px-6 py-2 rounded-xl font-medium shadow-sm transition-colors";
};

// ==========================================
// 5. LIGHTBOX LOGIC
// ==========================================

const openLightbox = (item) => {
    // Populate the lightbox data
    lightboxImg.src = item.src;
    lightboxImg.alt = item.alt;
    lightboxTitle.textContent = item.title;
    lightboxCategory.textContent = item.category;

    // Show the lightbox
    lightbox.classList.remove("hidden");

    // Slight delay to allow CSS opacity transition to trigger after removing 'hidden'
    setTimeout(() => {
        lightbox.classList.remove("opacity-0");
        lightboxContent.classList.remove("scale-95");
        lightboxContent.classList.add("scale-100");
    }, 10);
};

const closeLightbox = () => {
    // Reverse the animation classes
    lightbox.classList.add("opacity-0");
    lightboxContent.classList.remove("scale-100");
    lightboxContent.classList.add("scale-95");

    // Wait for the CSS transition to finish before hiding the element completely
    setTimeout(() => {
        lightbox.classList.add("hidden");
        // Clear src so the previous image doesn't ghost while the next one loads
        lightboxImg.src = "";
    }, 300);
};

// ==========================================
// 6. EVENT LISTENERS
// ==========================================

// Search Input Listener
searchInput.addEventListener("input", (e) => {
    // Update the state variable and redraw the gallery
    searchTerm = e.target.value;
    updateGallery();
});

// Filter Buttons Listener
filterButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
        // Update the visual button
        setActiveButton(e.target);

        // Update the state variable from the custom HTML data attribute
        currentCategory = e.target.getAttribute("data-category");

        // Redraw the gallery
        updateGallery();
    });
});

// Lightbox Close Listeners
closeLightboxBtn.addEventListener("click", closeLightbox);

// Close Lightbox if clicking outside the image
lightbox.addEventListener("click", (e) => {
    // Why e.target === lightbox? We only close if the user clicked the dark overlay itself,
    // not if they clicked the image or the text inside it.
    if (e.target === lightbox) {
        closeLightbox();
    }
});

// Close Lightbox with Escape key
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !lightbox.classList.contains("hidden")) {
        closeLightbox();
    }
});

// ==========================================
// 7. INITIALIZATION
// ==========================================
// When the page first loads, draw the initial full gallery
updateGallery();
