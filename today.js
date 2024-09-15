import { format } from "date-fns";
import { createAddTask, createDiv, createTaskList } from "./utils";

export class Today {
  constructor(taskHolder, display) {
    this.taskHolder = taskHolder;
    this.taskCollection = this.taskHolder.getDayTasks();
    this.timeGreeting = null;
    this.collectionTitle = "day";
    this.display = display;
  }

  updateTaskCollection() {
    this.taskCollection = this.taskHolder.getDayTasks();
  }

  initialiseContent() {
    this.taskHolder.deleteCompletedItems();
    this.taskCollection = this.taskHolder.getDayTasks();
    this.updateContent();
  }

  updateContent() {
    const contentHolder = document.getElementById("content");
    contentHolder.innerHTML = "";
    let currentHour = new Date().getHours();
    if (currentHour < 12) {
      this.timeGreeting = "morning";
    } else if (currentHour < 18) {
      this.timeGreeting = "afternoon";
    } else {
      this.timeGreeting = "evening";
    }
    const dayContent = createDiv("day-content");
    // --- Greeting ---
    const greeting = document.createElement("h1");
    greeting.textContent = `Good ${this.timeGreeting}, ${this.taskHolder.userName}`;
    dayContent.appendChild(greeting);

    // --- Header (date) ---
    const dayHeader = createDiv("day-header");
    const dayTitle = createDiv("day-title");
    dayTitle.textContent = `${format(new Date(), "EEEE")}`;
    const dayDate = createDiv("day-date");
    dayDate.textContent = format(new Date(), "do LLLL yyyy");
    dayHeader.appendChild(dayTitle);
    dayHeader.appendChild(dayDate);
    dayContent.appendChild(dayHeader);

    // --- Main (tasks) ---
    const taskListElements = createTaskList(
      this,
      this.taskCollection,
      contentHolder
    );
    dayContent.appendChild(taskListElements);

    // --- Footer (add task) ---
    const addTaskElement = createAddTask(this, contentHolder, 0);
    dayContent.appendChild(addTaskElement);
    contentHolder.appendChild(dayContent);

    // --- NavBar (via displayHandler)---
    this.display.updateContent();
  }
}
