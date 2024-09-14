import { AllTasks } from "./allTasks";
import { NavBar } from "./navBar";
import { ProjectView } from "./projectView";
import { Today } from "./today";
import { Upcoming } from "./upcoming";

export class DisplayHandler {
  constructor(taskHolder) {
    this.taskHolder = taskHolder;
    this.contentHolder = document.getElementById("content");
    this.today = new Today(this.taskHolder);
    this.upcoming = new Upcoming(this.taskHolder);
    this.allTasks = new AllTasks(this.taskHolder);
    this.navBar = new NavBar(this.taskHolder);
    this.projectView = new ProjectView(this.taskHolder);
  }
  initialiseContent() {
    //View Links
    const todayActions = () => {
      this.today.initialiseContent(this.contentHolder);
      this.navBar.navHighlight("today-view");
    };

    const weekActions = () => {
      this.upcoming.initialiseContent(this.contentHolder);
      this.navBar.navHighlight("week-view");
    };

    const allActions = () => {
      this.allTasks.initialiseContent(this.contentHolder);
      this.navBar.navHighlight("all-view");
    };

    this.navBar.addViewLinks(todayActions, weekActions, allActions);

    /* const projectActions = ()={
project.initialiseContent(contentHolder,projectName)
navBar.navHighlight(`project-${projectName}`)
}
*/

    //vvv this should be display.updateContent() calling (maybe) stuff in nav, then other modules can call display.updateContent()
    // navBar.updateContent();
    this.updateContent();
    this.upcoming.initialiseContent(this.contentHolder);
    //Maybe write a function to pass through display into nav to reset (or pass this and call userHandler.changeUser )
  }

  updateContent() {
    // ---Projects---
    const projectList = this.taskHolder.projectList;
    const projectInfo = [];
    projectList.forEach((projectCount, project) => {
      projectInfo.push({
        name: project,
        count: projectCount,
        action: () => {
          this.projectView.initialiseContent(project);
          this.navBar.navHighlight(`project-${project}`);
        },
      });
    });
    this.navBar.updateProjectList(projectInfo);
  }
}
