/////////////////// NECESARY ELEMENTS ///////////////
const tasks = [];
const completedTasks = [];
const formAddTasks = document.getElementById("add-tasks");
const tasksContainer = document.getElementById("tasks-container");
const completedTasksContainer = document.getElementById(
  "completedTasks-container"
);
const completedTasksSpan = document.createElement("span");
completedTasksSpan.innerHTML = `  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    stroke="#646464"
  >
    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
    <g
      id="SVGRepo_tracerCarrier"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke="#CCCCCC"
      stroke-width="0.288"
    ></g>
    <g id="SVGRepo_iconCarrier">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M17.0303 8.78039L8.99993 16.8107L5.4696 13.2804L6.53026 12.2197L8.99993 14.6894L15.9696 7.71973L17.0303 8.78039Z"
        fill="#646464"
      ></path>
    </g>
  </svg>`;

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

function toggleCompletedTasks(index) {
  tasks[index].isCompleted = !tasks[index].isCompleted;
  loadTasks;
}

function loadTasks() {
  tasksContainer.innerHTML = "";
  completedTasksContainer.innerHTML = "";

  tasks.forEach((element, index) => {
    // for (let i = 0; i < tasks.length; i++) {
    //   const element = tasks[i];

    if (!element.isCompleted) {
      const uniqueTaskContainer = document.createElement("div");
      tasksContainer.appendChild(uniqueTaskContainer);
      uniqueTaskContainer.className = "flex gap-4";

      const taskCheckbox = document.createElement("span");
      uniqueTaskContainer.appendChild(taskCheckbox);
      taskCheckbox.className =
        "appearance-none w-7 h-7 bg-[#F9F9F9] border-2 border-[#4C53EF] cursor-pointer";
      taskCheckbox.addEventListener("click", toggleCompletedTasks(index));

      const taskText = document.createElement("p");
      uniqueTaskContainer.appendChild(taskText);
      taskText.innerText = element.text;
    } else {
      const uniqueTaskContainerCompleted = document.createElement("div");
      completedTasksContainer.appendChild(uniqueTaskContainerCompleted);
      uniqueTaskContainerCompleted.className = "flex gap-4";

      const taskCompletedCheckbox = document.createElement("span");
      uniqueTaskContainerCompleted.appendChild(taskCompletedCheckbox);
      taskCompletedCheckbox.className =
        "appearance-none w-7 h-7 bg-[#9e9e9e] border-2 border-[#646464] cursor-pointer";
      taskCompletedCheckbox.appendChild(completedTasksSpan);

      const completedTaskText = document.createElement("p");
      uniqueTaskContainerCompleted.appendChild(completedTaskText);
      completedTaskText.innerText = element.text;
    }
  });
}

/////////////////// NECESARY CLASSES ////////////////

class Task {
  constructor(text) {
    this.text = text;
    this.isCompleted = false;
  }
}
