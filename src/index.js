/////////////////// NECESARY ELEMENTS ///////////////
const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
const completedTasks = [];
const formAddTasks = document.getElementById("add-tasks");
const tasksContainer = document.getElementById("tasks-container");
const completedTasksContainer = document.getElementById(
  "completedTasks-container"
);
const completedTasksSVG = `  
<svg
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
  </svg>
  `;

const trashSVG = `<svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M3 3L21 21M18 6L17.6 12M17.2498 17.2527L17.1991 18.0129C17.129 19.065 17.0939 19.5911 16.8667 19.99C16.6666 20.3412 16.3648 20.6235 16.0011 20.7998C15.588 21 15.0607 21 14.0062 21H9.99377C8.93927 21 8.41202 21 7.99889 20.7998C7.63517 20.6235 7.33339 20.3412 7.13332 19.99C6.90607 19.5911 6.871 19.065 6.80086 18.0129L6 6H4M16 6L15.4559 4.36754C15.1837 3.55086 14.4194 3 13.5585 3H10.4416C9.94243 3 9.47576 3.18519 9.11865 3.5M11.6133 6H20M14 14V17M10 10V17" stroke="#646464" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>`;

/////////// FIRST DOM LOAD | CALL FUNCTIONS ////////////

loadTasks();

///////////////////// EVENTS ////////////////////////

formAddTasks.addEventListener("submit", (e) => {
  e.preventDefault();

  const taskInput = document.getElementById("add-task-input");
  const taskInputText = taskInput.value;

  addNewTask(taskInputText);
  taskInput.value = "";
});

/////////////////// FUNCTION ////////////////////////

function updateLocalStorageTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addNewTask(text) {
  const newTask = new Task(text);
  tasks.push(newTask);
  updateLocalStorageTasks();

  loadTasks();
}

function toggleCompletedTasks(element) {
  element.isCompleted = !element.isCompleted;
  updateLocalStorageTasks();
  loadTasks();
}

function loadTasks() {
  tasksContainer.innerHTML = "";
  completedTasksContainer.innerHTML = "";

  for (let i = 0; i < tasks.length; i++) {
    const element = tasks[i];

    if (!element.isCompleted) {
      const uniqueTaskContainer = document.createElement("div");
      tasksContainer.appendChild(uniqueTaskContainer);
      uniqueTaskContainer.className = "flex gap-4";

      const taskCheckbox = document.createElement("span");
      uniqueTaskContainer.appendChild(taskCheckbox);
      taskCheckbox.className =
        "appearance-none w-7 h-7 bg-[#F9F9F9] border-2 border-[#4C53EF] cursor-pointer";
      taskCheckbox.addEventListener("click", () => {
        toggleCompletedTasks(element);
      });

      const taskText = document.createElement("p");
      uniqueTaskContainer.appendChild(taskText);
      taskText.innerText = element.text;
    } else {
      const uniqueTaskContainerCompleted = document.createElement("div");
      completedTasksContainer.appendChild(uniqueTaskContainerCompleted);
      uniqueTaskContainerCompleted.className =
        "flex w-full gap-4 justify-between px-2";

      const spanAndTextContainer = document.createElement("div");
      uniqueTaskContainerCompleted.appendChild(spanAndTextContainer);
      spanAndTextContainer.className = "flex gap-4";

      const taskCompletedCheckbox = document.createElement("span");
      spanAndTextContainer.appendChild(taskCompletedCheckbox);
      taskCompletedCheckbox.className =
        "w-7 h-7 bg-[#9e9e9e] border-2 border-[#646464] cursor-pointer";
      taskCompletedCheckbox.innerHTML = completedTasksSVG;

      const completedTaskText = document.createElement("p");
      spanAndTextContainer.appendChild(completedTaskText);
      completedTaskText.innerText = element.text;
      completedTaskText.className = "line-through";

      const deleteBtn = document.createElement("button");
      uniqueTaskContainerCompleted.appendChild(deleteBtn);
      deleteBtn.innerHTML = trashSVG;
      deleteBtn.addEventListener("click", () => {
        tasks.splice(i, 1);
        updateLocalStorageTasks();
        loadTasks();
      });
    }
  }
}

/////////////////// NECESARY CLASSES ////////////////

class Task {
  constructor(text) {
    this.text = text;
    this.isCompleted = false;
  }
}
