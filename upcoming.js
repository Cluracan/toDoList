import { createDiv, createTaskList, createAddTask } from "./utils";

import { add, format } from "date-fns";

export class Upcoming {
  constructor(taskHolder, display) {
    this.taskHolder = taskHolder;
    this.taskCollection = this.taskHolder.getWeekTasks();
    this.collectionTitle = "week";
    this.display = display;
  }

  updateTaskCollection() {
    this.taskCollection = this.taskHolder.getWeekTasks();
  }

  initialiseContent() {
    this.taskHolder.deleteCompletedItems();
    this.taskCollection = this.taskHolder.getWeekTasks();
    this.updateContent();
  }

  updateContent() {
    const contentHolder = document.getElementById("content");
    while (contentHolder.lastElementChild) {
      contentHolder.removeChild(contentHolder.lastElementChild);
    }

    const weekContent = createDiv("week-content");
    this.taskCollection.forEach((dayTasks, index) => {
      const dayTasksHolder = createDiv("week-day-content");
      const dayHeader = createDiv("week-day-header");
      const currentDayDate = add(new Date(), { days: index });
      const currentDay = format(currentDayDate, "EEEE");
      dayHeader.textContent = `${currentDay}`;
      dayTasksHolder.appendChild(dayHeader);
      dayTasksHolder.appendChild(
        createTaskList(this, dayTasks, contentHolder, index)
      );
      dayTasksHolder.appendChild(createAddTask(this, contentHolder, index));

      weekContent.appendChild(dayTasksHolder);
    });
    contentHolder.appendChild(weekContent);

    // --- NavBar (via displayHandler)---
    this.display.updateContent();
  }
}
