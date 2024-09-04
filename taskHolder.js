import { Task } from "./task";
import { format } from "date-fns";

export class TaskHolder {
  constructor(userName) {
    this.userName = userName;
    this.taskList = this.generateTaskList(userName);
    this.currentID = this.findCurrentID(userName);
    this.projectList = this.generateProjectList();
    console.log(this.projectList);
  }

  generateTaskList(userName) {
    const userData =
      JSON.parse(localStorage.getItem(`${userName}-toDoList-tasks`)) || [];
    const taskList = userData.map((task) => {
      if (!task.title || !task.id) {
        console.error(`Error reading save data at ${task}`);
      }
      return new Task(
        task.title,
        task.id,
        task.date,
        task.notes,
        task.completed,
        task.project,
        task.tags
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
    let projectList = new Set();
    for (let task of this.taskList) {
      projectList.add(task.project);
    }
    return projectList;
  }

  deleteCompletedItems() {
    this.taskList = this.taskList.filter((task) => !task.completed);
    this.updateStorage();
  }

  addTask(title, date, notes, project) {
    this.currentID++;
    const newTask = new Task(
      title,
      this.currentID,
      date,
      notes,
      false,
      project
    );
    this.taskList.push(newTask);
    this.updateStorage();
  }

  deleteTask(taskID) {
    this.taskList = this.taskList.filter((task) => task.id != taskID);
    this.updateStorage();
  }

  editTask(taskID, updatedTask) {
    const selectedTask = this.taskList.find((task) => task.id === taskID);
    for (const key of Object.keys(updatedTask)) {
      console.log(`setting ${key} to ${updatedTask[key]}`);
      selectedTask[key] = updatedTask[key];
    }
    console.log(selectedTask);
    this.updateStorage();
  }

  updateStorage() {
    localStorage.setItem(
      `${this.userName}-toDoList-tasks`,
      JSON.stringify(this.taskList)
    );
    localStorage.setItem(`${this.userName}-toDoList-currentID`, this.currentID);
  }

  getDayTasks() {
    return this.taskList.filter(
      (task) =>
        task.date &&
        format(task.date, "ddMMyyyy") === format(new Date(), "ddMMyyyy")
    );
  }
}
/*
Also need to store: 
current highest unique reference number (for creating new tasks (unique identifier)) as well as tasks in array
current menu selection (today/upcoming/all/project(name)/edit task from given menu(?!))

*/
