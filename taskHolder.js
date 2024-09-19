import { Task } from "./task";
import { format, differenceInCalendarDays } from "date-fns";
import { priorityColors } from "./utils";

export class TaskHolder {
  constructor(userName) {
    this.userName = userName;
    const userData = this.getUserData(userName);
    this.currentID = userData.currentID;
    this.taskList = userData.taskList;
    this.userList = TaskHolder.getUserList();
    this.projectList = this.generateProjectList();
    this.priorityList = this.generatePriorityList();
  }

  getUserData(userName) {
    let userData = JSON.parse(localStorage.getItem(`${userName}-toDoList`));
    if (userData) {
      return {
        taskList: userData.taskList,
        currentID: userData.currentID,
      };
    } else {
      return {
        taskList: [],
        currentID: 0,
      };
    }
  }

  static getUserList() {
    if (localStorage.getItem("toDoList-userList")) {
      return JSON.parse(localStorage.getItem("toDoList-userList"));
    } else {
      return [];
    }
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
    this.updateLists();
    this.updateStorage();
  }

  deleteTask(taskID) {
    this.taskList = this.taskList.filter((task) => task.id != taskID);
    this.updateLists();
    this.updateStorage();
  }

  editTask(taskID, updatedTask) {
    console.log(taskID);
    console.log(updatedTask);
    const selectedTask = this.taskList.find((task) => task.id === taskID);
    for (const key of Object.keys(updatedTask)) {
      selectedTask[key] = updatedTask[key];
    }
    this.updateLists();
    this.updateStorage();
  }

  updateStorage() {
    localStorage.setItem(
      `${this.userName}-toDoList`,
      JSON.stringify({ taskList: this.taskList, currentID: this.currentID })
    );
    localStorage.setItem("toDoList-userList", JSON.stringify(this.userList));
    localStorage.setItem("toDoList-lastUser", this.userName);
  }

  updateLists() {
    this.projectList = this.generateProjectList();
    this.priorityList = this.generatePriorityList();
    console.log("chcking user");
    if (!this.userList.includes(this.userName)) {
      this.userList.push(this.userName);
    }
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

  getPriorityTasks(priortyName) {
    return this.taskList.filter((task) => task.priority === priortyName);
  }
}
