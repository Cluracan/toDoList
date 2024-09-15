import { createAddTask, createDiv, createTaskList } from "./utils";
import { format } from "date-fns";

export class AllTasks {
  constructor(taskHolder, display) {
    this.taskHolder = taskHolder;
    this.taskCollection = this.taskHolder.taskList;
    this.collectionTitle = "allTask";
    this.display = display;
  }

  initialiseContent() {
    this.taskHolder.deleteCompletedItems();
    this.updateTaskCollection();
    this.updateContent();
    console.log(this.taskCollection);
  }

  updateTaskCollection() {
    this.taskCollection = this.taskHolder.taskList;
  }

  updateContent() {
    const contentHolder = document.getElementById("content");
    while (contentHolder.lastElementChild) {
      contentHolder.removeChild(contentHolder.lastElementChild);
    }
    const allTaskContent = createDiv("allTask-content");
    const allTaskHeader = createDiv("allTask-header");
    const allTaskDate = createDiv("allTask-date");
    for (const dateBlock of [
      format(new Date(), "dd"),
      format(new Date(), "MMM"),
      format(new Date(), "yy"),
    ]) {
      const dateSpan = createDiv("allTask-date-block");

      dateSpan.textContent = dateBlock;
      allTaskDate.appendChild(dateSpan);
    }
    allTaskHeader.appendChild(allTaskDate);
    // const allTaskHeaderText = createDiv("allTask-header-text");
    // allTaskHeaderText.textContent = "All my tasks";
    // allTaskHeader.appendChild(allTaskHeaderText);
    allTaskContent.appendChild(allTaskHeader);

    allTaskContent.appendChild(
      createTaskList(this, this.taskCollection, contentHolder)
    );

    //
    contentHolder.appendChild(allTaskContent);

    // --- NavBar (via displayHandler)---
    this.display.updateContent();
  }
}
