document.addEventListener('DOMContentLoaded', () => {
    const input = document.querySelector('#task-input');
    const add = document.querySelector('#new-task-form');
    const taskList = document.querySelector('.task-list');
    const error = document.querySelector('.error');


    add.addEventListener('submit', (event)=> {
        event.preventDefault();


        const taskName = input.value.trim();

        if (taskName === '') {
            error.style.display = 'block';
            return;
        }

        error.style.display = 'none';


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
        input.value = '';
    });

});