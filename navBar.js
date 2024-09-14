import { createDiv } from "./utils";

export class NavBar {
  constructor(taskHolder) {
    this.taskHolder = taskHolder;
    this.todayViewButton = document.getElementById("today-view");
    this.weekViewButton = document.getElementById("week-view");
    this.allViewButton = document.getElementById("all-view");
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

  navHighlight = (targetID) => {
    let elementArray = [
      this.todayViewButton,
      this.weekViewButton,
      this.allViewButton,
    ];
    //add lists and allTaskButton to this
    for (const element of elementArray) {
      if (element.id === targetID) {
        element.classList.add("nav-selected");
      } else {
        element.classList.remove("nav-selected");
      }
    }
  };
}
