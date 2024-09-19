import { AllTasks } from "./allTasks";
import { NavBar } from "./navBar";
import { PriorityView } from "./priorityView";
import { ProjectView } from "./projectView";
import { Today } from "./today";
import { Upcoming } from "./upcoming";

export class DisplayHandler {
  constructor(taskHolder, userHandler) {
    this.taskHolder = taskHolder;
    this.userHandler = userHandler;
    this.today = new Today(this.taskHolder, this);
    this.upcoming = new Upcoming(this.taskHolder, this);
    this.allTasks = new AllTasks(this.taskHolder, this);
    this.navBar = new NavBar(this.taskHolder, this);
    this.projectView = new ProjectView(this.taskHolder, this);
    this.priorityView = new PriorityView(this.taskHolder, this);
    this.updateContent;
  }
  initialiseContent() {
    //changeUser Icon
    const menuAction = () => {
      this.userHandler.clearLastUser();
      this.userHandler.initialise();
    };
    this.navBar.addMenuLink(menuAction);

    //View Links (permanent)
    const todayActions = () => {
      this.today.initialiseContent();
      this.navBar.navHighlight("today-view");
    };
    const weekActions = () => {
      this.upcoming.initialiseContent();
      this.navBar.navHighlight("week-view");
    };
    const allActions = () => {
      this.allTasks.initialiseContent();
      this.navBar.navHighlight("all-view");
    };
    this.navBar.addViewLinks(todayActions, weekActions, allActions);
    this.navBar.addNewProjectLink();

    this.updateContent();
    this.navBar.navHighlight("today-view");
    this.today.initialiseContent();
  }

  updateContent() {
    // --Today/Upcoming/All counts--- //
    this.navBar.updateMainCounts();

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

    // ---Priorities---
    this.taskHolder.updateLists();
    const priorityList = this.taskHolder.priorityList;
    const priorityInfo = [];
    priorityList.forEach((priorityCount, priority) => {
      priorityInfo.push({
        name: priority,
        count: priorityCount,
        action: () => {
          this.priorityView.initialiseContent(priority);
          this.navBar.navHighlight(`priority-${priority}`);
        },
      });
    });
    this.navBar.updatePriorityList(priorityInfo);
  }
}
