import { Task } from "./task";
import { format, differenceInCalendarDays } from "date-fns";
import { priorityColors } from "./utils";

export class TaskHolder {
  constructor(userName) {
    this.userName = userName;
    this.taskList = this.generateTaskList(userName);
    this.currentID = this.findCurrentID(userName);
    this.projectList = this.generateProjectList();
    this.priorityList = this.generatePriorityList();
  }

  generateTaskList(userName) {
    const userData =
      JSON.parse(localStorage.getItem(`${userName}-toDoList-tasks`)) || [];
    const taskList = userData.map((task) => {
      return new Task(
        task.title,
        task.id,
        task.dueDate,
        task.notes,
        task.completed,
        task.project,
        task.priority
      );
    });
    return taskList;
  }

  findCurrentID(userName) {
    const currentID =
      localStorage.getItem(`${userName}-toDoList-currentID`) || 0;
    return parseInt(currentID);
  }

  generateProjectList() {
    let projectList = new Map();
    for (let task of this.taskList) {
      if (projectList.has(task.project)) {
        projectList.set(task.project, projectList.get(task.project) + 1);
      } else {
        projectList.set(task.project, 1);
      }
    }
    return projectList;
  }

  generatePriorityList() {
    let priorityList = new Map();
    Object.keys(priorityColors).forEach((priorityName) => {
      priorityList.set(priorityName, 0);
    });
    for (let task of this.taskList) {
      priorityList.set(task.priority, priorityList.get(task.priority) + 1);
    }
    return priorityList;
  }

  deleteCompletedItems() {
    this.taskList = this.taskList.filter((task) => !task.completed);
    this.updateStorage();
  }

  addTask(title, dueDate, notes, project) {
    this.currentID++;
    const newTask = new Task(
      title,
      this.currentID,
      dueDate,
      notes,
      false,
      project
    );
    this.taskList.push(newTask);
    this.updateStorage();
    this.updateLists();
  }

  deleteTask(taskID) {
    this.taskList = this.taskList.filter((task) => task.id != taskID);
    this.updateStorage();
    this.updateLists();
  }

  editTask(taskID, updatedTask) {
    const selectedTask = this.taskList.find((task) => task.id === taskID);
    for (const key of Object.keys(updatedTask)) {
      selectedTask[key] = updatedTask[key];
    }
    this.updateStorage();
    this.updateLists();
  }

  updateStorage() {
    localStorage.setItem(
      `${this.userName}-toDoList-tasks`,
      JSON.stringify(this.taskList)
    );
    localStorage.setItem(`${this.userName}-toDoList-currentID`, this.currentID);
  }

  updateLists() {
    this.projectList = this.generateProjectList();
    this.priorityList = this.generatePriorityList();
  }

  getDayTasks() {
    return this.taskList.filter(
      (task) =>
        task.dueDate && task.dueDate === format(new Date(), "yyyy-MM-dd")
    );
  }

  getWeekTasks() {
    let weekTasks = Array.from({ length: 7 }, (v) => []);

    this.taskList.forEach((task) => {
      if (task.dueDate) {
        let taskDistance = differenceInCalendarDays(task.dueDate, new Date());
        if (taskDistance < 0) {
          taskDistance = 0;
        }
        if (taskDistance < 7) {
          weekTasks[taskDistance].push(task);
        }
      }
    });
    return weekTasks;
  }

  getProjectTasks(projectName) {
    return this.taskList.filter((task) => task.project === projectName);
  }
}
/*
Also need to store: 
current highest unique reference number (for creating new tasks (unique identifier)) as well as tasks in array
current menu selection (today/upcoming/all/project(name)/edit task from given menu(?!))

*/
