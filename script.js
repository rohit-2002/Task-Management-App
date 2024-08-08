// script.js
document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskList = document.getElementById('task-list');
    let tasks = [];
    let editIndex = null;

    // Load tasks from localStorage if available
    if (localStorage.getItem('tasks')) {
        tasks = JSON.parse(localStorage.getItem('tasks'));
        displayTasks();
    }

    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const title = document.getElementById('task-title').value;
        const description = document.getElementById('task-desc').value;
        const dueDate = document.getElementById('task-date').value;

        const task = { title, description, dueDate };

        if (editIndex !== null) {
            tasks[editIndex] = task;
            editIndex = null;
        } else {
            tasks.push(task);
        }

        saveTasks();
        displayTasks();
        taskForm.reset();
    });

    taskList.addEventListener('click', (e) => {
        if (e.target.classList.contains('edit-btn')) {
            const index = e.target.dataset.index;
            editIndex = index;
            const task = tasks[index];

            document.getElementById('task-title').value = task.title;
            document.getElementById('task-desc').value = task.description;
            document.getElementById('task-date').value = task.dueDate;
        } else if (e.target.classList.contains('delete-btn')) {
            const index = e.target.dataset.index;
            tasks.splice(index, 1);
            saveTasks();
            displayTasks();
        }
    });

    function displayTasks() {
        taskList.innerHTML = '';

        tasks.forEach((task, index) => {
            const taskItem = document.createElement('div');
            taskItem.classList.add('task-item');

            taskItem.innerHTML = `
                <div>
                    <h3>${task.title}</h3>
                    <p>${task.description}</p>
                    <small>Due: ${task.dueDate}</small>
                </div>
                <div>
                    <button class="edit-btn" data-index="${index}">Edit</button>
                    <button class="delete-btn" data-index="${index}">Delete</button>
                </div>
            `;

            taskList.appendChild(taskItem);
        });
    }

    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
});
