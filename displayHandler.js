import { AllTasks } from "./allTasks";
import { NavBar } from "./navBar";
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
    const navBar = new NavBar(this.taskHolder);

    const todayActions = () => {
      console.log("click");
      today.initialiseContent(contentHolder);
      navBar.navHighlight("today-view");
    };

    const weekActions = () => {
      upcoming.initialiseContent(contentHolder);
      navBar.navHighlight("week-view");
    };

    const allActions = () => {
      allTasks.initialiseContent(contentHolder);
      navBar.navHighlight("all-view");
    };

    /* const projectActions = ()={
project.initialiseContent(contentHolder,projectName)
navBar.navHighlight(`project-${projectName}`)
}
*/
    navBar.addViewLinks(todayActions, weekActions, allActions);

    navBar.updateContent();
    upcoming.initialiseContent(contentHolder);
    //Maybe write a function to pass through display into nav to reset (or pass this and call userHandler.changeUser )
  }
}
