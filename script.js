document.addEventListener('DOMContentLoaded', () => {
    const input = document.querySelector('#task-input');
    const add = document.querySelector('#new-task-form');
    const taskList = document.querySelector('.task-list');
    const error = document.querySelector('.error');

    loadTasksFromLocalStorage();

    add.addEventListener('submit', (event) => {
        event.preventDefault();


        const taskName = input.value.trim();

        if (taskName === '') {
            error.style.display = 'block';
            return;
        }

        error.style.display = 'none';

        addTask(taskName);
        input.value = '';
    });

    function addTask(taskName) {
        const taskContent = document.createElement('div');
        taskContent.classList.add('task');
        taskContent.innerHTML = `
                    <input type="text" class="taskName" value="${taskName}" readonly>
                </div>
                <div class="activities">
                    <button class="editBtn">Edit</button>
                    <button class="deleteBtn">Delete</button>
                    </div>`;
        taskList.appendChild(taskContent);
        
        saveTasksToLocalStorage();

        const deleteBtn = taskContent.querySelector('.deleteBtn');
        deleteBtn.addEventListener('click', () => {
            taskContent.remove();
            saveTasksToLocalStorage();
        });


        const editBtn = taskContent.querySelector('.editBtn');
        const taskInput = taskContent.querySelector('.taskName');

        editBtn.addEventListener('click', () => {
            if (taskInput.hasAttribute('readonly')) {
                taskInput.removeAttribute('readonly');
                editBtn.innerText = 'Save';
            } else {
                taskInput.setAttribute('readonly', true);
                editBtn.innerText = 'Edit';

                saveTasksToLocalStorage();
            }
        });
    }
    function saveTasksToLocalStorage() {
        const tasks = [];
        document.querySelectorAll('.taskName').forEach(task => {
            tasks.push(task.value);
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasksFromLocalStorage() {
        const tasks = JSON.parse(localStorage.getItem('tasks'));
        if (tasks) {
            tasks.forEach(taskName => {
                addTask(taskName);
            });
        }
    }
    });