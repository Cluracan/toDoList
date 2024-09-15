import { createAddTask, createDiv, createTaskList } from "./utils";

export class ProjectView {
  taskCollection;
  projectName;
  constructor(taskHolder, display) {
    this.taskHolder = taskHolder;
    this.collectionTitle = "projects";
    this.display = display;
  }

  updateTaskCollection() {
    this.taskCollection = this.taskHolder.getProjectTasks(this.projectName);
  }

  initialiseContent(projectName) {
    this.taskHolder.deleteCompletedItems();
    this.projectName = projectName;
    this.taskCollection = this.taskHolder.getProjectTasks(projectName);
    this.updateContent(projectName);
  }

  updateContent() {
    const contentHolder = document.getElementById("content");
    while (contentHolder.lastElementChild) {
      contentHolder.removeChild(contentHolder.lastElementChild);
    }
    const projectContent = createDiv("projects-content");

    // ---header---
    const projectHeader = document.createElement("h1");
    projectHeader.classList = "projects-header";
    projectHeader.textContent = `Project: ${this.projectName
      .charAt(0)
      .toUpperCase()}${this.projectName.slice(1)}`;
    projectContent.appendChild(projectHeader);

    // ---main---
    const taskListElements = createTaskList(
      this,
      this.taskCollection,
      contentHolder
    );
    projectContent.appendChild(taskListElements);

    // ---footer(addTask)---
    const addTaskElement = createAddTask(
      this,
      contentHolder,
      0,
      this.projectName
    );
    projectContent.appendChild(addTaskElement);
    contentHolder.appendChild(projectContent);

    // --- NavBar (via displayHandler)---
    this.display.updateContent();
  }
}
