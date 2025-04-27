const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const filter = document.getElementById('filter');
const sortBtn = document.getElementById('sort');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let sortNewest = false;

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = '';

  let filteredTasks = [...tasks];

  if (filter.value === 'completed') {
    filteredTasks = filteredTasks.filter(task => task.completed);
  } else if (filter.value === 'pending') {
    filteredTasks = filteredTasks.filter(task => !task.completed);
  }

  if (sortNewest) {
    filteredTasks.sort((a, b) => b.createdAt - a.createdAt);
  }

  filteredTasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.className = 'task';
    if (task.completed) li.classList.add('completed');

    li.innerHTML = `
      ${task.text}
      <div>
        <button onclick="toggleComplete(${index})">✔️</button>
        <button onclick="deleteTask(${index})">🗑️</button>
      </div>
    `;

    taskList.appendChild(li);
  });
}

function addTask(e) {
  e.preventDefault();
  const text = taskInput.value.trim();
  if (!text) return;

  const newTask = {
    text,
    completed: false,
    createdAt: Date.now()
  };

  tasks.push(newTask);
  saveTasks();
  renderTasks();
  taskInput.value = '';
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

taskForm.addEventListener('submit', addTask);
filter.addEventListener('change', renderTasks);
sortBtn.addEventListener('click', () => {
  sortNewest = !sortNewest;
  renderTasks();
});

renderTasks();
