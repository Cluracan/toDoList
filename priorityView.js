import { createDiv, createTaskList, priorityColors } from "./utils";

export class PriorityView {
  taskCollection;
  priorityName;
  constructor(taskHolder, display) {
    this.taskHolder = taskHolder;
    this.collectionTitle = "priority";
    this.display = display;
  }

  updateTaskCollection() {
    this.taskCollection = this.taskHolder.getPriorityTasks(this.priorityName);
  }

  initialiseContent(priorityName) {
    this.taskHolder.deleteCompletedItems();
    this.priorityName = priorityName;
    this.taskCollection = this.taskHolder.getPriorityTasks(priorityName);
    this.updateContent(priorityName);
  }

  updateContent() {
    const contentHolder = document.getElementById("content");
    while (contentHolder.lastElementChild) {
      contentHolder.removeChild(contentHolder.lastElementChild);
    }
    const priorityContent = createDiv("priority-content");

    // ---header---
    const priorityHeader = document.createElement("h1");
    priorityHeader.classList = "priority-header";
    priorityHeader.textContent = `Priority: ${this.priorityName
      .charAt(0)
      .toUpperCase()}${this.priorityName.slice(1)}`;
    priorityContent.appendChild(priorityHeader);

    // ---main---
    const taskListElements = createTaskList(
      this,
      this.taskCollection,
      contentHolder
    );
    priorityContent.appendChild(taskListElements);
    contentHolder.appendChild(priorityContent);

    const priorityElements = Array.from(
      document.getElementsByClassName("priority-toDo")
    );
    priorityElements.forEach((element) => {
      element.style.backgroundColor = priorityColors[this.priorityName];
    });

    // --- NavBar (via displayHandler)---
    this.display.updateContent();
  }
}
