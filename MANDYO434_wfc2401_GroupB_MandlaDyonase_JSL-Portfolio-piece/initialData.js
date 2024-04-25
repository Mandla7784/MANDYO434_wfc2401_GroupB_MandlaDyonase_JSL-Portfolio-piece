export const initialData = [
  {
    id: 1,
    title: "Launch Epic Career 🚀",
    description: "Create a killer Resume",
    status: "todo",
    board: "Launch Career",
  },
  {
    id: 2,
    title: "Master JavaScript 💛",
    description: "Get comfortable with the fundamentals",
    status: "doing",
    board: "Launch Career",
  },
  {
    id: 3,
    title: "Keep on Going 🏆",
    description: "You're almost there",
    status: "doing",
    board: "Launch Career",
  },
  {
    id: 4,
    title: "Conquer React ⚛️",
    description: "Get up and running with a popular library.",
    status: "todo",
    board: "Roadmap",
  },
  {
    id: 5,
    title: "Understand Databases 📅",
    description: "Begin your backend journey",
    status: "todo",
    board: "Roadmap",
  },
  {
    id: 6,
    title: "Crush Frameworks 🔨",
    description: "Create a plan to study hard",
    status: "todo",
    board: "Roadmap",
  },
  {
    id: 7,
    title: "Explore ES6 Features 🚀",
    description: "Learn modern JavaScript syntax and features",
    status: "doing",
    board: "Roadmap",
  },
  {
    id: 8,
    title: "Build a React Component 🧱",
    description: "Start with a simple component and gradually add complexity",
    status: "done",
    board: "Roadmap",
  },
  {
    id: 9,
    title: "Redux State Management 🔄",
    description:
      "Understand and implement Redux for state management in React apps",
    status: "doing",
    board: "Roadmap",
  },
  {
    id: 10,
    title: "Deploy React App 🚀",
    description:
      "Learn to deploy React applications using platforms like Netlify or Vercel",
    status: "done",
    board: "Roadmap",
  },
  {
    id: 11,
    title: "Learn Data Structures and Algorithms 📚",
    description:
      "Study fundamental data structures and algorithms to solve coding problems efficiently",
    status: "todo",
    board: "Launch Career",
  },
  {
    id: 12,
    title: "Contribute to Open Source Projects 🌐",
    description:
      "Gain practical experience and collaborate with others in the software development community",
    status: "doing",
    board: "Launch Career",
  },
  {
    id: 13,
    title: "Build Portfolio Projects 🛠️",
    description:
      "Create a portfolio showcasing your skills and projects to potential employers",
    status: "doing",
    board: "Launch Career",
  },
];

// TASK: Get elements from the DOM
export const elements = {
  // Navigation Sidebar elements
  sideModal: document.querySelector(".side-bar"),
  boardsLinks: document.getElementById("boards-nav-links-div"),
  themeChanger: document.getElementById("switch"),
  hideSideBarBtn: document.getElementById("hide-side-bar-btn"),
  showSideBarBtn: document.getElementById("show-side-bar-btn"),
  headerBoardName: document.getElementById("header-board-name"),
  columnDivs: document.querySelectorAll(".column-div"),
  filterDiv: document.getElementById("filterDiv"),
  createNewTaskBtn: document.getElementById("add-new-task-btn"),
  modalWindow: document.getElementById("new-task-modal-window"),
  editTaskModal: document.querySelector(".edit-task-modal-window"),
  cancelEditBtn: document.getElementById("cancel-edit-btn"),
  deleteTaskBtn: document.getElementById("delete-task-btn"),
};
