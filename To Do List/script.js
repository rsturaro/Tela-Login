const inputElement = document.querySelector(".new-task-input");
const addTaskButton = document.querySelector(".new-task-button");
const tasksContainer = document.querySelector(".tasks-container");

const validateInput = () => inputElement.value.trim().length > 0;

const handleAddTask = () => {
  const inputIsValid = validateInput();

  if (!inputIsValid) {
    inputElement.classList.add("error");
    return;
  }

  const taskItemContainer = document.createElement("div");
  taskItemContainer.classList.add("task-item");

  const taskContent = document.createElement("p");
  taskContent.innerText = inputElement.value;
  taskContent.addEventListener("click", () => handleClick(taskContent));

  const deleteItem = document.createElement("i");
  deleteItem.classList.add("far", "fa-trash-alt");
  deleteItem.addEventListener("click", () => handleDeleteClick(taskItemContainer, taskContent));

  taskItemContainer.appendChild(taskContent);
  taskItemContainer.appendChild(deleteItem);
  tasksContainer.appendChild(taskItemContainer);

  inputElement.value = "";
  updateLocalStorage();
};

const handleClick = (taskContent) => {
  const currentTask = taskContent.parentNode;
  currentTask.firstChild.classList.toggle("completed");
  updateLocalStorage();
};

const handleDeleteClick = (taskItemContainer, taskContent) => {
  taskItemContainer.remove();
  updateLocalStorage();
};

const handleInputChange = () => {
  inputElement.classList.remove("error");
};

const updateLocalStorage = () => {
  const tasks = Array.from(tasksContainer.children).map((task) => {
    const content = task.firstChild;
    return { description: content.innerText, isCompleted: content.classList.contains("completed") };
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
};

const refreshTasksUsingLocalStorage = () => {
  const tasksFromLocalStorage = JSON.parse(localStorage.getItem("tasks")) || [];

  tasksFromLocalStorage.forEach((task) => {
    const taskItemContainer = document.createElement("div");
    taskItemContainer.classList.add("task-item");

    const taskContent = document.createElement("p");
    taskContent.innerText = task.description;

    if (task.isCompleted) {
      taskContent.classList.add("completed");
    }

    taskContent.addEventListener("click", () => handleClick(taskContent));

    const deleteItem = document.createElement("i");
    deleteItem.classList.add("far", "fa-trash-alt");
    deleteItem.addEventListener("click", () => handleDeleteClick(taskItemContainer, taskContent));

    taskItemContainer.appendChild(taskContent);
    taskItemContainer.appendChild(deleteItem);
    tasksContainer.appendChild(taskItemContainer);
  });
};

refreshTasksUsingLocalStorage();

addTaskButton.addEventListener("click", handleAddTask);

inputElement.addEventListener("change", handleInputChange);

inputElement.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    handleAddTask();
  }
});
