import { createAddTask, createDiv, createTaskList } from "./utils";
import { format } from "date-fns";

export class ProjectView {
  taskCollection;
  projectName;
  constructor(taskHolder, display) {
    this.taskHolder = taskHolder;
    this.collectionTitle = "projects";
    this.display = display;
  }
  initialiseContent(contentHolder, projectName) {
    this.taskHolder.deleteCompletedItems();
    this.projectName = projectName;
    this.taskCollection = this.taskHolder.getProjectTasks(projectName);
    this.updateContent(contentHolder, projectName);
  }

  updateTaskCollection() {
    this.taskCollection = this.taskHolder.getProjectTasks(this.projectName);
  }

  updateContent(contentHolder) {
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
    projectContent.appendChild(
      createTaskList(this, this.taskCollection, contentHolder)
    );
    // ---footer(addTask)---
    const projectAddTask = createAddTask(
      this,
      contentHolder,
      0,
      this.projectName
    );
    projectContent.appendChild(projectAddTask);
    //
    contentHolder.appendChild(projectContent);

    // --- NavBar (via displayHandler)---
    this.display.updateContent();
  }
}
