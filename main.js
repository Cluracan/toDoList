import "./style.css";
import backgroundUrl from "./blue-sky.jpg";
import { format } from "date-fns";
import { Today } from "./today";
import { Task } from "./task";
import { TaskHolder } from "./taskHolder";

const backgroundHolder = document.getElementById("background");
backgroundHolder.style.backgroundImage = `url("${backgroundUrl}")`;

const contentHolder = document.getElementById("content");

console.log(format(new Date(), "a 'in the' eeee"));

// localStorage.setItem(
//   "Lara-toDoList-tasks",
//   JSON.stringify([
//     new Task("To do Item 1", 1, new Date(), "", false),
//     new Task("To do item 2", 2, new Date(), "some notes", false, "gardening"),
//     new Task("To do item 3", 3, new Date(), false),
//   ])
// );

// localStorage.setItem("Lara-toDoList-currentID", 3);

console.log(new Date().getHours());
console.log(new Date().valueOf());

const taskHolder = new TaskHolder("Lara");

const today = new Today(taskHolder);

today.initialiseContent(contentHolder);
