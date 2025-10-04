// Wait for the DOM to fully load before executing any JavaScript
document.addEventListener('DOMContentLoaded', () => {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from Local Storage when the page loads
    loadTasks();

    /**
     * Adds a task to the DOM and optionally to Local Storage
     * @param {string} taskText - The text of the task to add
     * @param {boolean} save - Whether to save the task to Local Storage (default: true)
     */
    function addTask(taskText = null, save = true) {
        // If taskText is not provided (e.g., from input), get it from the input field
        if (!taskText) {
            taskText = taskInput.value.trim();
        }

        // If task is empty, prompt the user
        if (taskText === '') {
            alert('Please enter a task.');
            return;
        }

        // Create a new <li> element for the task
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create a "Remove" button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.className = 'remove-btn';

        // When "Remove" is clicked, remove the task from DOM and Local Storage
        removeBtn.onclick = () => {
            taskList.removeChild(li);
            removeTaskFromStorage(taskText);
        };

        // Append the remove button to the task item
        li.appendChild(removeBtn);

        // Add the task item to the task list
        taskList.appendChild(li);

        // Clear the input field
        taskInput.value = '';

        // Save the task to Local Storage if required
        if (save) {
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            storedTasks.push(taskText);
            localStorage.setItem('tasks', JSON.stringify(storedTasks));
        }
    }

    /**
     * Removes a task from Local Storage
     * @param {string} taskText - The text of the task to remove
     */
    function removeTaskFromStorage(taskText) {
        let storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks = storedTasks.filter(task => task !== taskText);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }

    /**
     * Loads tasks from Local Storage and displays them in the task list
     */
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => {
            addTask(taskText, false); // false = do not save again to avoid duplication
        });
    }

    // Event listener for the "Add Task" button
    addButton.addEventListener('click', () => {
        addTask();
    });

    // Event listener for pressing "Enter" in the input field
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});
