/**
 * NOTES APP LOGIC
 * Educator Note: We use `localStorage` to save data. `localStorage` only stores strings,
 * so we use JSON.stringify() to convert our array into a string when saving,
 * and JSON.parse() to convert it back into an array when loading.
 */

// ==========================================
// 1. DOM SELECTION
// ==========================================
const addNoteBtn = document.querySelector("#add-note-btn");
const notesGrid = document.querySelector("#notes-grid");

// ==========================================
// 2. HELPER FUNCTIONS
// ==========================================

/**
 * A basic Markdown parser using Regular Expressions (Regex).
 * Regex allows us to search strings for specific patterns and replace them.
 */
const parseMarkdown = (text) => {
    // Why let? We are going to continually modify this string.
    let html = text;

    // 1. Parse H1 tags: Replaces "# text" with "<h1>text</h1>"
    html = html.replace(/^# (.*$)/gim, "<h1>$1</h1>");

    // 2. Parse H2 tags: Replaces "## text" with "<h2>text</h2>"
    html = html.replace(/^## (.*$)/gim, "<h2>$1</h2>");

    // 3. Parse Bold text: Replaces "**text**" with "<strong>text</strong>"
    html = html.replace(/\*\*(.*?)\*\*/gim, "<strong>$1</strong>");

    // 4. Parse Italics text: Replaces "*text*" with "<em>text</em>"
    html = html.replace(/\*(.*?)\*/gim, "<em>$1</em>");

    // 5. Convert line breaks (Enter key) into HTML <br> tags
    html = html.replace(/\n/gim, "<br>");

    return html;
};

/**
 * Saves all current notes from the DOM into localStorage
 */
const updateLocalStorage = () => {
    // Grab every textarea currently on the page
    const textAreas = document.querySelectorAll("textarea");

    // Create an array to hold all the text values
    const notesArray = [];

    // Loop through all text areas and push their value into the array
    textAreas.forEach((textArea) => {
        notesArray.push(textArea.value);
    });

    // Save the array to local storage as a JSON string
    localStorage.setItem("notes", JSON.stringify(notesArray));
};

// ==========================================
// 3. CORE FUNCTIONALITY
// ==========================================

/**
 * Creates a single note DOM element and handles its internal logic
 * @param {string} text - The existing text to populate the note with (defaults to empty)
 */
const addNewNote = (text = "") => {
    // 1. Create the container element for the note
    const note = document.createElement("article");
    note.className = "bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-72 transition-all hover:shadow-md";

    // 2. Build the inner HTML structure
    // We use a textarea for editing, and a div for viewing the parsed markdown.
    // They are stacked on top of each other using Tailwind's 'absolute inset-0'.
    note.innerHTML = `
        <header class="bg-slate-50 border-b border-slate-100 p-3 flex justify-end gap-2">
            <button class="edit-btn text-slate-400 hover:text-blue-500 bg-white shadow-sm border border-slate-100 w-8 h-8 rounded-lg flex items-center justify-center transition-colors" title="Toggle Edit/Preview">
                <i class="fa-solid fa-eye"></i>
            </button>
            <button class="delete-btn text-slate-400 hover:text-rose-500 bg-white shadow-sm border border-slate-100 w-8 h-8 rounded-lg flex items-center justify-center transition-colors" title="Delete Note">
                <i class="fa-solid fa-trash-can"></i>
            </button>
        </header>
        
        <div class="relative flex-1 bg-white">
            <div class="main-content absolute inset-0 p-5 overflow-y-auto markdown-preview text-slate-600 ${text ? "" : "hidden"}"></div>
            
            <textarea class="absolute inset-0 w-full h-full p-5 resize-none outline-none text-slate-700 bg-transparent placeholder:text-slate-300 ${text ? "hidden" : ""}" placeholder="Type here..."></textarea>
        </div>
    `;

    // 3. Select the interactive elements inside this specific note
    const editBtn = note.querySelector(".edit-btn");
    const editIcon = editBtn.querySelector("i");
    const deleteBtn = note.querySelector(".delete-btn");
    const mainContent = note.querySelector(".main-content");
    const textArea = note.querySelector("textarea");

    // 4. Initialize the note with any existing text (from local storage)
    textArea.value = text;
    mainContent.innerHTML = parseMarkdown(text);

    // 5. Event Listeners for this specific note

    // Delete Note
    deleteBtn.addEventListener("click", () => {
        // Remove the element from the screen
        note.remove();
        // Immediately update local storage so it stays deleted on refresh
        updateLocalStorage();
    });

    // Toggle Edit / View Mode
    editBtn.addEventListener("click", () => {
        // Toggle the 'hidden' class to swap between textarea and preview div
        mainContent.classList.toggle("hidden");
        textArea.classList.toggle("hidden");

        // Swap the icon visually
        if (mainContent.classList.contains("hidden")) {
            editIcon.className = "fa-solid fa-eye";
            textArea.focus();
        } else {
            editIcon.className = "fa-solid fa-pen";
        }
    });

    // Auto-save and parse text as the user types
    textArea.addEventListener("input", (e) => {
        // Update the preview div with the newly parsed markdown
        const value = e.target.value;
        mainContent.innerHTML = parseMarkdown(value);

        // Save to local storage on every keystroke
        updateLocalStorage();
    });

    // 6. Finally, append the newly created note to the grid
    notesGrid.appendChild(note);
};

// ==========================================
// 4. INITIALIZATION
// ==========================================

// When the app starts, fetch saved notes from local storage.
// Why '|| []'? If there is no saved data (like on first visit), it defaults to an empty array.
const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];

// Loop through any saved notes and render them to the screen
if (savedNotes.length > 0) {
    savedNotes.forEach((noteText) => addNewNote(noteText));
}

// Add New Note Button Listener
addNoteBtn.addEventListener("click", () => {
    // Creates a blank note
    addNewNote();
});
