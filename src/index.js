/////////////////// NECESARY ELEMENTS ///////////////
const tasks = [];
const completedTasks = [];
const formAddTasks = document.getElementById("add-tasks");
const tasksContainer = document.getElementById("tasks-container");

///////////////////// EVENTS ////////////////////////
formAddTasks.addEventListener("submit", (e) => {
  e.preventDefault();

  const taskInput = document.getElementById("add-task-input");
  const taskInputText = taskInput.value;

  addNewTask(taskInputText);
});

/////////////////// FUNCTION ////////////////////////

function addNewTask(text) {
  const newTask = new Task(text);
  tasks.push(newTask);

  loadTasks();
}

function loadTasks() {
  tasksContainer.innerHTML = "";

  for (let i = 0; i < tasks.length; i++) {
    const element = tasks[i];

    const uniqueTaskContainer = document.createElement("div");
    tasksContainer.appendChild(uniqueTaskContainer);
    uniqueTaskContainer.className = "flex gap-4";

    const taskCheckbox = document.createElement("span");
    uniqueTaskContainer.appendChild(taskCheckbox);
    taskCheckbox.className =
      "appearance-none w-7 h-7 bg-[#F9F9F9] border-2 border-[#4C53EF] cursor-pointer";

    const taskText = document.createElement("p");
    uniqueTaskContainer.appendChild(taskText);
    taskText.innerText = element.text;
  }
}

/////////////////// NECESARY CLASSES ////////////////

class Task {
  constructor(text) {
    this.text = text;
    this.isCompleted = false;
  }
}
