//required to import modules from other files
//with helping functions and initial data of task objects with properities
import {
  getTasks,
  createNewTask,
  saveTasks,
  putTask,
  deleteTask,
} from "./utils/taskFunctions.js";
import { initialData, elements } from "./initialData.js";

//i created the elements object that grabs the html elements and  exported it from initialData module
//imported the element with 10 elements

// Function checks if local storage already has data, if not it loads initialData to localStorage
const initializeData = () => {
  if (!localStorage.getItem("tasks")) {
    localStorage.setItem("tasks", JSON.stringify(initialData));
    localStorage.setItem("showSideBar", "true");
  } else {
    console.log("Data already exists in localStorage");
  }
};

//calling initializingData  function to run immediately the global window object loads...//to store data into LocalStorage
window.onload = initializeData();

let activeBoard = ""; //varible to keep track of active boards when task is edited or added

const fetchAndDisplayBoardsAndTasks = () => {
  // Extracts unique board names from tasks
  const tasks = getTasks();
  const boards = [...new Set(tasks.map((task) => task.board).filter(Boolean))]; //using Set to avoid duplications of the boards in the boards array
  displayBoards(boards); //alos map the tasks to return unique elements of the tasks array from Set
  if (boards.length > 0) {
    //check if board exits then get the board from local storage
    const localStorageBoard = JSON.parse(localStorage.getItem("activeBoard"));
    activeBoard = localStorageBoard ? localStorageBoard : boards[0]; // assigning the active board to the  board got from localstorage
    elements.headerBoardName.textContent = activeBoard; // change text content of headerBoraName to the cative board
    styleActiveBoard(activeBoard);
    refreshTasksUI(); //refreshing the State of the User interface after updates
  }
};

// Creates different boards in the DOM

const displayBoards = (boards) => {
  const boardsLink = document.getElementById("boards-nav-links-div");
  boardsLink.innerHTML = ""; // Clears the container
  boards.forEach((board) => {
    const boardElement = document.createElement("button");
    boardElement.textContent = board;
    boardElement.classList.add("board-btn");
    boardElement.addEventListener("click", () => {
      // when a user clicks on each board the boardname header changes to the active clicked board
      elements.headerBoardName.textContent = board;
      filterAndDisplayTasksByBoard(board);
      activeBoard = board;
      localStorage.setItem("activeBoard", JSON.stringify(activeBoard));
      styleActiveBoard(activeBoard);
    });
    boardsLink.appendChild(boardElement);
  });
};

// Filters tasks corresponding to the board name and displays them on the DOM.
// TASK: Fix Bugs
const filterAndDisplayTasksByBoard = (boardName) => {
  const tasks = getTasks(); // Fetch tasks from a simulated local storage function
  const filteredTasks = tasks.filter((task) => task.board === boardName); //

  // Ensure the column titles are set outside of this function or correctly initialized before this function runs

  elements.columnDivs.forEach((column) => {
    const status = column.getAttribute("data-status");
    // Reset column content while preserving the column title
    column.innerHTML = `<div class="column-head-div">
                          <span class="dot" id="${status}-dot"></span>
                          <h4 class="columnHeader">${status.toUpperCase()}</h4>
                        </div>`;

    const tasksContainer = document.createElement("div");
    column.appendChild(tasksContainer);

    filteredTasks
      .filter((task) => task.status === status) //filtering task based on the status
      .forEach((task) => {
        const taskElement = document.createElement("div");
        taskElement.classList.add("task-div");
        taskElement.textContent = task.title;
        taskElement.setAttribute("data-task-id", task.id);

        // Listen for a click event on each task and open a modal

        taskElement.onclick = () => {
          openEditTaskModal(task);
        };

        tasksContainer.appendChild(taskElement);
      });
  });
};

const refreshTasksUI = () => {
  filterAndDisplayTasksByBoard(activeBoard);
};

// Styles the active board by adding an active class

const styleActiveBoard = (boardName) => {
  document.querySelectorAll(".board-btn").forEach((btn) => {
    if (btn.textContent === boardName) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });
};

const addTaskToUI = (task) => {
  const column = document.querySelector(
    '.column-div[data-status="${task.status}"]'
  );
  if (!column) {
    console.error(`Column not found for status: ${task.status}`);
    return;
  }

  let tasksContainer = column.querySelector(".tasks-container");
  if (!tasksContainer) {
    console.warn(
      `Tasks container not found for status: ${task.status}, creating one.`
    );
    tasksContainer = document.createElement("div");
    tasksContainer.className = "tasks-container";
    column.appendChild(tasksContainer);
  }

  const taskElement = document.createElement("div");
  taskElement.className = "task-div";
  taskElement.textContent = task.title; // Modify as needed
  taskElement.setAttribute("data-task-id", task.id);

  tasksContainer.appendChild(taskElement);
};

const setupEventListeners = () => {
  // Cancel editing task event listener
  const cancelEditBtn = document.querySelector("#cancel-edit-btn");
  cancelEditBtn.addEventListener("click", () =>
    toggleModal(false, elements.editTaskModal)
  );

  // Cancel adding new task event listener
  const cancelAddTaskBtn = document.querySelector("#cancel-add-task-btn");
  cancelAddTaskBtn.addEventListener("click", () => {
    toggleModal(false);
    elements.filterDiv.style.display = "none"; // Also hide the filter overlay
  });

  // Clicking outside the modal to close it
  elements.filterDiv.addEventListener("click", () => {
    toggleModal(false);
    elements.filterDiv.style.display = "none"; // hide the overlay when modal is closed
  });

  //show and hide side bar with  togglingSidebar function
  elements.hideSideBarBtn.onclick = () => toggleSidebar(false);
  elements.showSideBarBtn.onclick = () => toggleSidebar(true);

  //toggling the theme to light and dark
  elements.themeChanger.onchange = () => toggleTheme();
  // Show Add New Task Modal event listener
  elements.createNewTaskBtn.onclick = () => {
    toggleModal(true);
    elements.filterDiv.style.display = "block"; // Also show the filter overlay to dsiplay the modal
  };
  elements.modalWindow.onsubmit = (event) => {
    addTask(event);
  };
};

const toggleModal = (show, modal = elements.modalWindow) => {
  modal.style.display = show ? "block" : "none"; // if modal is displayed true , return block else display none if show is not
};

const addTask = (event) => {
  event.preventDefault();

  // Assign user input to the task object
  const task = {
    title: document.getElementById("title-input").value,
    description: document.getElementById("desc-input").value,
    status: document.getElementById("select-status").value,
  };

  const newTask = createNewTask(task);
  if (newTask) {
    addTaskToUI(newTask);
    toggleModal(false);
    newTask.board = activeBoard;
    initialData.push(newTask);
    elements.filterDiv.style.display = "none"; // Also hide the filter overlay
    localStorage.setItem("tasks", JSON.stringify(initialData));
    refreshTasksUI();
  }
};

const toggleSidebar = (show) => {
  if (show) {
    // console.log("show sidebar button clicked");
    elements.sideModal.style.display = "block";
    elements.showSideBarBtn.style.display = "none";
  } else {
    elements.sideModal.style.display = "none";
    elements.showSideBarBtn.style.display = "block";
  }
};
toggleSidebar(true);

const toggleTheme = () => {
  // Toggle the 'light-theme' class on the body element
  document.body.classList.toggle("light-theme");

  // Save the theme preference to localStorage
  localStorage.setItem(
    "light-theme",
    document.body.classList.contains("light-theme") ? "enabled" : "disabled"
  );

  // Get the image element for the logo
  const logo = document.getElementById("logo");

  // Check if the body has the 'light-theme' class
  const isLightTheme = document.body.classList.contains("light-theme");

  // Update the src attribute of the logo based on the theme
  if (isLightTheme) {
    logo.src = "./assets/logo-light.svg"; // iif theme is light then the logo must be black
  } else {
    logo.src = "./assets/logo-dark.svg"; //
  }
};

const openEditTaskModal = (task) => {
  // Set task details in modal inputs
  const titleInput = document.getElementById("edit-task-title-input");
  const descInput = document.getElementById("edit-task-desc-input");
  const statusSelect = document.getElementById("edit-select-status");

  // Get button elements from the task modal
  titleInput.value = task.title;
  descInput.value = task.description;
  statusSelect.value = task.status;

  // Call saveTaskChanges upon click of Save Changes button
  const saveTaskChangesBtn = document.getElementById("save-task-changes-btn");
  const deleteTaskBtn = document.getElementById("delete-task-btn");

  saveTaskChangesBtn.addEventListener("click", () => {
    saveTaskChanges(task.id);

    refreshTasksUI();
    toggleModal(false, elements.editTaskModal);
  });

  //calling the delete function to delete the task
  deleteTaskBtn.addEventListener("click", () => {
    deleteTask(task.id);

    refreshTasksUI();
    toggleModal(false, elements.editTaskModal);
  });

  toggleModal(true, elements.editTaskModal); // Show the edit task modal
};

const saveTaskChanges = (taskId) => {
  // Get new user inputs
  const updatedTitle = document.querySelector("#edit-task-title-input").value;
  const updatedDescription = document.querySelector(
    "#edit-task-desc-input"
  ).value;
  const updatedStatus = document.querySelector("#edit-select-status").value;

  // Get the tasks from local storage
  let tasks = getTasks();

  // Check if a task with the same ID already exists
  const duplicatedTask = tasks.findIndex((task) => task.id === taskId);

  if (duplicatedTask !== -1) {
    // If the task already exists, update its properties
    tasks[duplicatedTask].title = updatedTitle;
    tasks[duplicatedTask].description = updatedDescription;
    tasks[duplicatedTask].status = updatedStatus;
  } else {
    // If the task doesn't exist, create a new task object
    const newTask = {
      id: taskId,
      title: updatedTitle,
      description: updatedDescription,
      status: updatedStatus,
    };

    // Add the new task to the tasks array
    tasks.push(newTask);
  }

  // Save the updated tasks array back to local storage
  saveTasks(tasks);
  // invoke putTask to update the Database
  putTask(taskId, tasks[duplicatedTask]);
  refreshTasksUI(); // Refresh the UI to reflect the changes
  toggleModal(false, elements.editTaskModal); // Close the modal
};

const init = () => {
  setupEventListeners();
  const showSidebar = localStorage.getItem("showSideBar") === "true";
  toggleSidebar(showSidebar);
  const LightTheme = localStorage.getItem("light-theme") === "enabled";
  document.body.classList.toggle("light-theme", LightTheme);
  fetchAndDisplayBoardsAndTasks(); // Initial display of boards and tasks
};

document.addEventListener("DOMContentLoaded", function () {
  init(); // init is called after the DOM is fully loaded
});
