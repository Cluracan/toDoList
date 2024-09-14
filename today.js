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

  initialiseContent(contentHolder) {
    this.taskHolder.deleteCompletedItems();
    this.taskCollection = this.taskHolder.getDayTasks();
    this.updateContent(contentHolder);
  }

  updateTaskCollection() {
    this.taskCollection = this.taskHolder.getDayTasks();
  }

  updateContent(contentHolder) {
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
    const taskListHolder = createTaskList(
      this,
      this.taskCollection,
      contentHolder
    );
    dayContent.appendChild(taskListHolder);

    // --- Footer (add task) ---
    const dayAddTask = createAddTask(
      this,
      contentHolder,
      0,
      this.updateContent
    );
    dayContent.appendChild(dayAddTask);
    contentHolder.appendChild(dayContent);

    // --- NavBar (via displayHandler)---
    this.display.updateContent();
  }
}
