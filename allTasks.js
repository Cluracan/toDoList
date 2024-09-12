import { createAddTask, createDiv, createTaskList } from "./utils";
import { format } from "date-fns";

export class AllTask {
  constructor(taskHolder) {
    this.taskHolder = taskHolder;
    this.taskCollection = this.taskHolder.taskList;
    this.collectionTitle = "allTask";
  }

  initialiseContent(contentHolder) {
    this.taskHolder.deleteCompletedItems();
    this.updateTaskCollection();
    this.updateContent(contentHolder);
  }

  updateTaskCollection() {
    this.taskCollection = this.taskHolder.taskList;
  }

  updateContent(contentHolder) {
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

    createTaskList(this, this.taskCollection, contentHolder);

    allTaskContent.appendChild(
      createTaskList(this, this.taskCollection, contentHolder)
    );

    //
    contentHolder.appendChild(allTaskContent);
  }
}
