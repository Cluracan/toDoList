import { AllTasks } from "./allTasks";
import { Today } from "./today";
import { Upcoming } from "./upcoming";

export class DisplayHandler {
  constructor(taskHolder) {
    this.taskHolder = taskHolder;
  }
  initialiseContent() {
    const contentHolder = document.getElementById("content");
    const today = new Today(this.taskHolder);
    const upcoming = new Upcoming(this.taskHolder);
    const allTasks = new AllTasks(this.taskHolder);
    upcoming.initialiseContent(contentHolder);

    //rewrite  to add button fn in nav class?
    const todayViewButton = document.getElementById("today-view");
    todayViewButton.addEventListener("click", (e) => {
      today.initialiseContent(contentHolder);
      navHighlight("today-view");
    });

    const weekViewButton = document.getElementById("week-view");
    weekViewButton.addEventListener("click", (e) => {
      upcoming.initialiseContent(contentHolder);
      navHighlight("week-view");
    });

    const allViewButton = document.getElementById("all-view");
    allViewButton.addEventListener("click", (e) => {
      allTasks.initialiseContent(contentHolder);
      navHighlight("all-view");
    });

    const navHighlight = (targetID) => {
      let elementArray = [todayViewButton, weekViewButton, allViewButton];
      //add lists and allTaskButton to this
      for (const element of elementArray) {
        if (element.id === targetID) {
          element.classList.add("nav-selected");
        } else {
          element.classList.remove("nav-selected");
        }
      }
    };
    //to here
  }
}
