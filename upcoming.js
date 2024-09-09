import {
  createDiv,
  createEditDialog,
  createTaskList,
  createAddTask,
} from "./utils";

export class Upcoming {
  constructor(taskHolder) {
    this.taskHolder = taskHolder;
    this.taskCollection = this.taskHolder.getWeekTasks();
    this.collectionTitle = "week";
  }

  updateTaskCollection() {
    this.taskCollection = this.taskHolder.getWeekTasks();
  }

  initialiseContent(contentHolder) {
    this.taskHolder.deleteCompletedItems();
    this.taskCollection = this.taskHolder.getWeekTasks();
    this.updateContent(contentHolder);
  }

  updateContent(contentHolder) {
    while (contentHolder.lastElementChild) {
      contentHolder.removeChild(contentHolder.lastElementChild);
    }
    console.log("updating");
    console.log(this.taskCollection);
    console.log(contentHolder);
    const weekContent = createDiv("week-content");
    this.taskCollection.forEach((dayTasks, index) => {
      const dayTasksHolder = createDiv("week-day-content");
      dayTasksHolder.appendChild(
        createTaskList(this, dayTasks, contentHolder, index)
      );
      dayTasksHolder.appendChild(createAddTask(this, contentHolder, index));
      weekContent.appendChild(dayTasksHolder);
    });
    contentHolder.appendChild(weekContent);
    console.log("ADDED CONTENT");
  }
}
