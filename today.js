import { format } from "date-fns";
import { createDiv, createEditDialog } from "./utils";

export class Today {
  constructor(taskHolder) {
    this.taskHolder = taskHolder;
    this.dayTasks = this.taskHolder.getDayTasks();
    this.timeGreeting = null;
    console.log(this.taskHolder.taskList);
    console.log(this.dayTasks);
  }

  initialiseContent(contentHolder) {
    this.taskHolder.deleteCompletedItems();
    this.dayTasks = this.taskHolder.getDayTasks();
    this.updateContent(contentHolder);
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
    const dayContentFadeIn = createDiv("fade-in");
    this.dayTasks.sort((task) => (task.completed ? 1 : -1));
    this.dayTasks.forEach((task) => {
      const taskDiv = createDiv("day-toDo");
      const completedButton = createDiv("completed-button");

      completedButton.addEventListener("click", (e) => {
        if (!task.completed) {
          completedButton.textContent = `\u2713`;
          task.completed = true;
          taskDiv.classList.add("completed");
        } else {
          taskDiv.classList.remove("completed");
          completedButton.textContent = "";
          task.completed = false;
        }
        this.updateContent(contentHolder);
      });

      if (task.completed) {
        taskDiv.classList.add("completed");
        completedButton.textContent = "\u2713";
      }
      taskDiv.appendChild(completedButton);

      const toDoItem = createDiv("day-toDo-item");
      const toDoItemList = createDiv("day-item-list");
      toDoItemList.textContent = task.project;
      const toDoItemName = createDiv("toDo-item-name");
      toDoItemName.textContent = task.title;
      toDoItem.appendChild(toDoItemList);
      toDoItem.append(toDoItemName);

      // --- Edit task (dialog) ---
      const editDialog = createEditDialog(task, this.taskHolder);
      toDoItem.appendChild(editDialog);
      toDoItem.addEventListener("click", (e) => {
        editDialog.showModal();
      });

      taskDiv.appendChild(toDoItem);

      const deleteButton = createDiv("delete-button");
      deleteButton.textContent = "\u2716";

      deleteButton.addEventListener("click", (e) => {
        this.taskHolder.deleteTask(task.id);
        this.dayTasks = this.taskHolder.getDayTasks();
        this.updateContent(contentHolder);
      });

      taskDiv.appendChild(deleteButton);
      dayContentFadeIn.appendChild(taskDiv);
    });
    dayContent.appendChild(dayContentFadeIn);

    // --- Footer (add task) ---
    const dayAddTask = createDiv("day-add-task");
    const dayAddIcon = createDiv("day-add-icon");
    dayAddIcon.textContent = "+";

    dayAddIcon.addEventListener("click", (e) => {
      dayAddInput.focus();
    });

    const dayAddInput = document.createElement("textarea");
    dayAddInput.classList = "day-add-input";
    dayAddInput.rows = 1;
    dayAddInput.placeholder = "Add task";

    dayAddInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        console.log(`create a to do titled ${e.target.value}`);
        this.taskHolder.addTask(e.target.value, new Date(), null, "personal");
        this.dayTasks = this.taskHolder.getDayTasks();
        this.updateContent(contentHolder);
        dayAddInput.value = "";
      }
    });

    dayAddTask.appendChild(dayAddIcon);
    dayAddTask.appendChild(dayAddInput);
    dayContent.appendChild(dayAddTask);
    contentHolder.appendChild(dayContent);
  }
}
