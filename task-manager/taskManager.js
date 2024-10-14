const readline = require('readline'); 
const fs = require('fs');              

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let tasks = [];

function loadTasks() {
    if (fs.existsSync('tasks.json')) {
        const data = fs.readFileSync('tasks.json', 'utf8');
        tasks = JSON.parse(data);
    }
}

function saveTasks() {
    fs.writeFileSync('tasks.json', JSON.stringify(tasks, null, 2));
}

function showMenu() {
    console.log(`
==========================
   Task Manager - Menu
==========================
1. Add a new task
2. View all tasks
3. Update task description
4. Toggle task completion
5. Delete a task
6. Search tasks
7. Exit
    `);

    rl.question('Choose an option: ', handleMenuInput);
}

function handleMenuInput(option) {
    switch (option) {
        case '1':
            addTask();
            break;
        case '2':
            viewTasks();
            break;
        case '3':
            updateTask();
            break;
        case '4':
            toggleTaskCompletion();
            break;
        case '5':
            deleteTask();
            break;
        case '6':
            searchTasks();
            break;
        case '7':
            console.log('Exiting... Goodbye!');
            rl.close();
            break;
        default:
            console.log('Invalid option. Please try again.');
            showMenu();
    }
}

function addTask() {
    rl.question('Enter task description: ', (description) => {
        const task = { id: tasks.length + 1, description, completed: false };
        tasks.push(task);
        saveTasks();
        console.log('Task added successfully!');
        showMenu();
    });
}

function viewTasks() {
    console.log('\nAll Tasks:');
    tasks.forEach(task => {
        const status = task.completed ? '[Completed]' : '[Pending]';
        console.log(`${task.id}. ${task.description} ${status}`);
    });
    showMenu();
}

function updateTask() {
    rl.question('Enter task ID to update: ', (id) => {
        const task = tasks.find(t => t.id === parseInt(id));
        if (task) {
            rl.question('Enter new description: ', (newDescription) => {
                task.description = newDescription;
                saveTasks();
                console.log('Task updated successfully!');
                showMenu();
            });
        } else {
            console.log('Task not found.');
            showMenu();
        }
    });
}

function toggleTaskCompletion() {
    rl.question('Enter task ID to toggle: ', (id) => {
        const task = tasks.find(t => t.id === parseInt(id));
        if (task) {
            task.completed = !task.completed;
            saveTasks();
            console.log('Task status toggled successfully!');
        } else {
            console.log('Task not found.');
        }
        showMenu();
    });
}

function deleteTask() {
    rl.question('Enter task ID to delete: ', (id) => {
        const index = tasks.findIndex(t => t.id === parseInt(id));
        if (index !== -1) {
            tasks.splice(index, 1);
            saveTasks();
            console.log('Task deleted successfully!');
        } else {
            console.log('Task not found.');
        }
        showMenu();
    });
}

function searchTasks() {
    rl.question('Enter keyword to search: ', (keyword) => {
        const filteredTasks = tasks.filter(t => t.description.includes(keyword));
        console.log('\nSearch Results:');
        filteredTasks.forEach(task => {
            const status = task.completed ? '[Completed]' : '[Pending]';
            console.log(`${task.id}. ${task.description} ${status}`);
        });
        showMenu();
    });
}

loadTasks();  
showMenu();   
