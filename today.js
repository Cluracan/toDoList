import { format } from "date-fns";
import { createAddTask, createDiv, createTaskList } from "./utils";

export class Today {
  constructor(taskHolder) {
    this.taskHolder = taskHolder;
    this.taskCollection = this.taskHolder.getDayTasks();
    this.timeGreeting = null;
    this.collectionTitle = "day";
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
    const dayAddTask = createAddTask(this, contentHolder);
    // const dayAddTask = createDiv("day-add-task");
    // const dayAddIcon = createDiv("day-add-icon");
    // dayAddIcon.textContent = "+";

    // dayAddIcon.addEventListener("click", (e) => {
    //   dayAddInput.focus();
    // });

    // const dayAddInput = document.createElement("textarea");
    // dayAddInput.classList = "day-add-input";
    // dayAddInput.rows = 1;
    // dayAddInput.placeholder = "Add task";

    // dayAddInput.addEventListener("keydown", (e) => {
    //   if (e.key === "Enter") {
    //     this.taskHolder.addTask(e.target.value, new Date(), null, "personal");
    //     this.updateTaskCollection();
    //     this.updateContent(contentHolder);
    //     dayAddInput.value = "";
    //   }
    // });

    // dayAddTask.appendChild(dayAddIcon);
    // dayAddTask.appendChild(dayAddInput);
    dayContent.appendChild(dayAddTask);
    contentHolder.appendChild(dayContent);
  }
}
