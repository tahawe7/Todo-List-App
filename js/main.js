let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasksDiv = document.querySelector(".tasks");

// Empty Array To Store The Tasks
let arrayOfTasks = [];

// Check There Is Tasks in Local Storage
if (localStorage.getItem("tasks")) {
  arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
}
// Trigger Get Data From Local Storage Function
getDataFromLocalStorage();

// Click On Task Element

tasksDiv.addEventListener("click", (e) => {
  // Delete Button
  if (e.target.classList.contains("del")) {
    // Remove Task From Local Storage
    deleteTaskWith(e.target.parentElement.getAttribute("data-id"));
    // Remove Element From Page
    e.target.parentElement.remove();
  }

  // Task Element
  // Task Element
  if (e.target.classList.contains("task")) {
    // Toggle Completed For The Task
    toggleStatusTaskWith(e.target.getAttribute("data-id"));
    // Toggle Done Class
    e.target.classList.toggle("done");
  }
});

// Add Tasks
submit.onclick = () => {
  if (input.value !== "") {
    addTaskToArray(input.value); // Add Tasks To Array Of Tasks
    input.value = ""; // Empty Input Field
  }
};

function addTaskToArray(taskText) {
  // Task Data
  const task = {
    id: Date.now(),
    title: taskText,
    completed: false,
  };
  // Push Task To Array Of Tasks
  arrayOfTasks.push(task);

  // Add Tasks To Page
  addElementsToPageFrom(arrayOfTasks);

  // Add Tasks To LocalStorage
  addDataToLocalStorageFrom(arrayOfTasks);
}

function addElementsToPageFrom(arrayOfTasks) {
  // Clean Tasks Div
  tasksDiv.innerHTML = "";
  // Loopping On Array Of Tasks
  arrayOfTasks.forEach((task) => {
    // Check If Task Is Done
    if (task.completed) {
      div.className = "task done";
    }
    // Create Main Div
    let div = document.createElement("div");
    div.className = "task";
    div.setAttribute("data-id", task.id);
    div.append(document.createTextNode(task.title));
    div.setAttribute("style", "margin-bottom: 50px;");

    // Create Delete Span
    let span = document.createElement("span");
    span.className = "del";
    span.append(document.createTextNode("Delete"));
    // Append Botton To Main Div
    div.append(span);
    // Append Div To Tasks Container
    tasksDiv.appendChild(div);
  });
}

function addDataToLocalStorageFrom(arrayOfTasks) {
  window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}

function getDataFromLocalStorage() {
  let data = window.localStorage.getItem("tasks");
  if (data) {
    let tasks = JSON.parse(data);
    addElementsToPageFrom(tasks);
  }
}

function deleteTaskWith(taskId) {
  arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
  addDataToLocalStorageFrom(arrayOfTasks);
}

function toggleStatusTaskWith(taskId) {
  for (let i = 0; i < arrayOfTasks.length; i++) {
    if (arrayOfTasks[i].id == taskId) {
      arrayOfTasks[i].completed == false
        ? (arrayOfTasks[i].completed = true)
        : (arrayOfTasks[i].completed = false);
    }
  }
  addDataToLocalStorageFrom(arrayOfTasks);
}

// Delete All Button

let delAllBtn = document.querySelector(".delallbtn");

delAllBtn.onclick = () => {
  tasksDiv.innerHTML = "";
  window.localStorage.removeItem("tasks", JSON.stringify(arrayOfTasks));
};

