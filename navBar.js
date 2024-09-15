import { createDiv, createNewProjectDialog, priorityColors } from "./utils";

export class NavBar {
  constructor(taskHolder, display) {
    this.taskHolder = taskHolder;
    this.todayViewButton = document.getElementById("today-view");
    this.weekViewButton = document.getElementById("week-view");
    this.allViewButton = document.getElementById("all-view");
    this.display = display;
  }

  updateMainCounts() {
    const todayCounter = document.getElementById("today-counter");
    const weekCounter = document.getElementById("week-counter");
    const allCounter = document.getElementById("all-counter");
    todayCounter.textContent = this.taskHolder.getDayTasks().length;
    weekCounter.textContent = this.taskHolder
      .getWeekTasks()
      .reduce((taskCount, day) => {
        return taskCount + day.length;
      }, 0);
    allCounter.textContent = this.taskHolder.taskList.length;
  }

  updateProjectList(projects) {
    const projectHolder = document.getElementById("project-holder");
    projectHolder.innerHTML = "";
    for (const project of projects) {
      const projectDiv = createDiv("nav-item", `project-${project.name}`);
      const nameSpan = document.createElement("span");
      nameSpan.textContent = `${project.name}`;
      projectDiv.appendChild(nameSpan);
      projectDiv.addEventListener("click", (e) => project.action());
      const projectCounter = document.createElement("span");
      projectCounter.classList.add("counter");
      projectCounter.textContent = `${project.count}`;
      projectDiv.appendChild(projectCounter);
      projectHolder.appendChild(projectDiv);
    }
  }

  updatePriorityList(priorities) {
    const priorityHolder = document.getElementById("priority-holder");
    priorityHolder.innerHTML = "";
    for (const priority of priorities) {
      const priorityDiv = createDiv("nav-item", `priority-${priority.name}`);
      const priorityCounter = document.createElement("span");
      priorityCounter.classList.add("nav-priority-counter");
      priorityCounter.textContent = `${priority.count}`;
      priorityCounter.style.backgroundColor = priorityColors[priority.name];
      priorityDiv.appendChild(priorityCounter);
      priorityDiv.addEventListener("click", (e) => priority.action());
      priorityHolder.appendChild(priorityDiv);
    }
  }

  addViewLinks(todayActions, weekActions, allActions) {
    const todayViewButton = document.getElementById("today-view");
    todayViewButton.addEventListener("click", (e) => {
      todayActions();
    });
    const weekViewButton = document.getElementById("week-view");
    weekViewButton.addEventListener("click", (e) => weekActions());
    const allViewButton = document.getElementById("all-view");
    allViewButton.addEventListener("click", (e) => allActions());
  }

  addNewProjectLink() {
    const newProjectButton = document.getElementById("new-project");
    newProjectButton.addEventListener("click", (e) => {
      const newProjectDialog = createNewProjectDialog(this);
      const dialogHolder = document.getElementById("dialog-holder");
      dialogHolder.appendChild(newProjectDialog);
      newProjectDialog.showModal();
    });
  }

  navHighlight = (targetID) => {
    let elementArray = [
      this.todayViewButton,
      this.weekViewButton,
      this.allViewButton,
    ];

    for (const projectName of this.taskHolder.projectList.keys()) {
      const projectDiv = document.getElementById(`project-${projectName}`);
      elementArray.push(projectDiv);
    }

    for (const element of elementArray) {
      if (element.id === targetID) {
        element.classList.add("nav-selected");
      } else {
        element.classList.remove("nav-selected");
      }
    }
  };
}
