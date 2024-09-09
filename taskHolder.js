import { Task } from "./task";
import { format, differenceInCalendarDays } from "date-fns";

export class TaskHolder {
  constructor(userName) {
    this.userName = userName;
    this.taskList = this.generateTaskList(userName);
    this.currentID = this.findCurrentID(userName);
    this.projectList = this.generateProjectList();
    this.tagList = this.generateTagList();
    console.log(this.taskList);
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

  generateTagList() {
    let tagList = new Set();
    for (let task of this.taskList) {
      for (let tag of task.tags) {
        tagList.add(tag);
      }
    }
    return tagList;
  }

  deleteCompletedItems() {
    this.taskList = this.taskList.filter((task) => !task.completed);
    this.updateStorage();
  }

  addTask(title, dueDate, notes, project) {
    console.log(`adding ${title}, now`);
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
    console.log(this.taskList);
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
        task.dueDate && task.dueDate === format(new Date(), "yyyy-MM-dd")
    );
  }

  getWeekTasks() {
    let weekTasks = Array.from({ length: 7 }, (v) => []);
    console.log(weekTasks);
    this.taskList.forEach((task) => {
      if (task.dueDate) {
        let taskDistance = differenceInCalendarDays(task.dueDate, new Date());
        if (taskDistance < 0) {
          taskDistance = 0;
        }
        console.log(
          task.dueDate,
          new Date(),
          differenceInCalendarDays(task.dueDate, new Date())
        );
        if (taskDistance < 7) {
          console.log(taskDistance);
          weekTasks[taskDistance].push(task);
        }
      }
    });
    console.log(weekTasks);
    return weekTasks;
  }
}
/*
Also need to store: 
current highest unique reference number (for creating new tasks (unique identifier)) as well as tasks in array
current menu selection (today/upcoming/all/project(name)/edit task from given menu(?!))

*/
