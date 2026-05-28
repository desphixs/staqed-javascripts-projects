/**
 * FocusFlow: Core Logic
 * ---------------------
 * We follow a "State-First" approach. We update our data (the array)
 * first, then re-render the UI to match that data.
 */

// 1. DOM Element Selection
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const taskList = document.querySelector("#task-list");
const emptyState = document.querySelector("#empty-state");

// 2. State Initialization
// We try to get tasks from localStorage; if none exist, we start with an empty array.
// JSON.parse converts the "string" stored in local storage back into a JS Array.
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

/**
 * Renders the task list to the DOM.
 * We clear the list and rebuild it based on the 'tasks' array.
 */
function renderTasks() {
    // Save the current state to localStorage every time we render
    // localStorage only stores strings, so we use JSON.stringify
    localStorage.setItem("tasks", JSON.stringify(tasks));

    // Clear existing list to prevent duplicates
    taskList.innerHTML = "";

    // Handle Empty State visibility
    if (tasks.length === 0) {
        emptyState.classList.remove("hidden");
    } else {
        emptyState.classList.add("hidden");
    }

    // Loop through tasks and create HTML elements
    tasks.forEach((task, index) => {
        const li = document.createElement("li");

        // Tailwind classes for the list item
        li.className = "group flex items-center justify-between p-4 bg-white border border-gray-100 rounded-xl hover:border-indigo-100 hover:shadow-sm transition-all animate-in fade-in slide-in-from-bottom-2 duration-300";

        li.innerHTML = `
            <div class="flex items-center gap-3">
                <input 
                    type="checkbox" 
                    ${task.completed ? "checked" : ""} 
                    class="task-checkbox w-5 h-5 rounded-full border-gray-300 text-indigo-600 focus:ring-indigo-500 transition-all cursor-pointer"
                    onchange="toggleTask(${index})"
                >
                <span class="text-sm ${task.completed ? "text-gray-400 line-through" : "text-gray-700"} font-medium transition-all">
                    ${task.text}
                </span>
            </div>
            <button 
                onclick="deleteTask(${index})"
                class="text-gray-300 hover:text-red-500 p-2 transition-colors duration-200"
                aria-label="Delete Task"
            >
                <i class="fas fa-trash-alt text-xs"></i>
            </button>
        `;
        taskList.appendChild(li);
    });
}

/**
 * Adds a new task to the array.
 */
todoForm.addEventListener("submit", (e) => {
    // We prevent the default form submission (page refresh)
    e.preventDefault();

    const taskText = todoInput.value.trim();

    if (taskText !== "") {
        const newTask = {
            text: taskText,
            completed: false,
        };

        tasks.push(newTask);
        todoInput.value = ""; // Clear input field
        renderTasks(); // Refresh the UI
    }
});

/**
 * Toggles the 'completed' status of a task.
 * @param {number} index - The position of the task in the array.
 */
function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
}

/**
 * Removes a task from the array.
 * @param {number} index - The position of the task in the array.
 */
function deleteTask(index) {
    // filter() or splice() can be used; splice is more direct for specific indices
    tasks.splice(index, 1);
    renderTasks();
}

// Initial render to show tasks stored in localStorage on page load
renderTasks();
