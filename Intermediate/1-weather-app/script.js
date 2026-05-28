/**
 * WEATHER APP LOGIC
 * Educator Note: We use an API to fetch data. This process is "Asynchronous,"
 * meaning the code sends a request and waits for a response without stopping
 * the rest of the website from working.
 */

const API_KEY = "838f95b722a19d1bbf45c312d6d087fa"; // Get yours at openweathermap.org
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

// DOM Elements
const searchBtn = document.querySelector("#search-btn");
const cityInput = document.querySelector("#city-input");
const weatherCard = document.querySelector("#weather-card");
const statusMessage = document.querySelector("#status-message");
const bodyBg = document.querySelector("#body-bg");

// UI Elements to update
const cityName = document.querySelector("#city-name");
const tempDisplay = document.querySelector("#temp-display");
const weatherDesc = document.querySelector("#weather-desc");
const humidityDisplay = document.querySelector("#humidity-display");
const windDisplay = document.querySelector("#wind-display");
const weatherIcon = document.querySelector("#weather-icon");

/**
 * Main Function to fetch weather
 * @param {string} city
 */
const fetchWeather = async (city) => {
    try {
        // 1. Show a loading state (Optional but good UX)
        statusMessage.textContent = "Searching for the clouds...";

        // 2. The Fetch Request
        // units=metric gives us Celsius. q=city is the query.
        const response = await fetch(`${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`);

        // 3. Check if the response is okay (e.g., city found)
        if (!response.ok) throw new Error("City not found");

        const data = await response.json();

        // 4. Update the UI with data
        updateUI(data);
    } catch (error) {
        // 5. Handle errors gracefully
        statusMessage.textContent = "Oops! We couldn't find that city. Try again.";
        weatherCard.classList.add("hidden");
    }
};

/**
 * Updates the DOM with the fetched data
 */
const updateUI = (data) => {
    // Destructuring data for cleaner code
    const { name, main, weather, wind } = data;

    cityName.textContent = name;
    tempDisplay.textContent = Math.round(main.temp);
    weatherDesc.textContent = weather[0].description;
    humidityDisplay.textContent = `${main.humidity}%`;
    windDisplay.textContent = `${Math.round(wind.speed * 3.6)} km/h`; // Convert m/s to km/h

    // Update Icon and Background based on weather condition
    updateVisuals(weather[0].main);

    // Reveal the card
    weatherCard.classList.remove("hidden");
    statusMessage.classList.add("hidden");
};

/**
 * Changes Background and Icons dynamically
 */
const updateVisuals = (condition) => {
    const images = {
        Clear: "https://images.unsplash.com/photo-1502481851512-e9e2529bbbf9?q=80&w=2000",
        Clouds: "https://images.unsplash.com/photo-1534088568595-a066f410bcda?q=80&w=2000",
        Rain: "https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?q=80&w=2000",
        Snow: "https://images.unsplash.com/photo-1477601263568-180e2c6d046e?q=80&w=2000",
        Thunderstorm: "https://images.unsplash.com/photo-1605727282302-24c74420ed4c?q=80&w=2000",
    };

    const icons = {
        Clear: "fa-sun",
        Clouds: "fa-cloud",
        Rain: "fa-cloud-showers-heavy",
        Snow: "fa-snowflake",
        Thunderstorm: "fa-bolt",
    };

    // Apply the image to the body background
    bodyBg.style.backgroundImage = `url('${images[condition] || images.Clear}')`;

    // Update the Font Awesome icon class
    weatherIcon.className = `fa-solid ${icons[condition] || "fa-cloud"} text-7xl text-blue-400 mb-4`;
};

// Event Listeners
searchBtn.addEventListener("click", () => {
    if (cityInput.value.trim() !== "") {
        fetchWeather(cityInput.value);
    }
});

// Allow user to press "Enter" key instead of clicking button
cityInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter" && cityInput.value.trim() !== "") {
        fetchWeather(cityInput.value);
    }
});
