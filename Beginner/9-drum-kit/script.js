/**
 * PROJECT: Virtual Drum Kit
 * CONCEPTS: Keyboard Events, HTML5 Audio, Data Attributes, CSS Transitions
 */

// 1. Data Store: Mapping keys to high-quality audio URLs
const audioMap = {
    KeyA: "audio/clap.wav",
    KeyS: "audio/hihat.wav",
    KeyD: "audio/kick.wav",
    KeyF: "audio/snare.wav",
};

// 2. Logic Function: Handle the sound and visual feedback
function playSound(keyCode) {
    // Check if the pressed key is in our map
    const audioUrl = audioMap[keyCode];
    if (!audioUrl) return; // Exit if a non-mapped key is pressed

    // Select the visual pad based on the data-key attribute
    const pad = document.querySelector(`article[data-key="${keyCode}"]`);

    // Create a new Audio object and play it
    const audio = new Audio(audioUrl);

    /** * Why currentTime = 0?
     * If you hit the key rapidly, we want the sound to restart instantly
     * rather than waiting for the first clip to finish playing.
     */
    audio.currentTime = 0;
    audio.play();

    // Add visual "playing" class for feedback
    if (pad) {
        pad.classList.add("playing");
    }
}

// 3. Cleanup Function: Remove the visual effect
function removeTransition(event) {
    /**
     * Why check for 'transform'?
     * Transitions trigger multiple property changes. We only want to
     * remove the class once the main animation (transform) is done.
     */
    if (event.propertyName !== "transform") return;
    event.target.classList.remove("playing");
}

// 4. Event Listeners

// Listen for physical keyboard presses
window.addEventListener("keydown", (event) => {
    // We use event.code (e.g., "KeyA") as it's more reliable than event.key
    playSound(event.code);
});

// Listen for clicks on the pads (for mobile users)
const allPads = document.querySelectorAll(".drum-pad");
allPads.forEach((pad) => {
    // Trigger sound on click
    pad.addEventListener("click", () => {
        const keyCode = pad.getAttribute("data-key");
        playSound(keyCode);
    });

    // Listen for the end of the CSS transition to clean up the UI
    pad.addEventListener("transitionend", removeTransition);
});
