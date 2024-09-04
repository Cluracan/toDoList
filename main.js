import "./style.css";
import backgroundUrl from "./blue-sky.jpg";
import { format } from "date-fns";
import { Today } from "./today";
import { TaskHolder } from "./taskHolder";
import { Task } from "./task";
const backgroundHolder = document.getElementById("background");
backgroundHolder.style.backgroundImage = `url("${backgroundUrl}")`;

const contentHolder = document.getElementById("content");

console.log(format(new Date(), "a 'in the' eeee"));

// localStorage.setItem(
//   "Lara-toDoList-tasks",
//   JSON.stringify([
//     new Task("To do Item 1", 1, format(new Date(), "yyyy-MM-dd"), "", false),
//     new Task(
//       "To do item 2",
//       2,
//       format(new Date(), "yyyy-MM-dd"),
//       "some notes",
//       false,
//       "gardening",
//       ["priority"]
//     ),
//     new Task("To do item 3", 3, format(new Date(), "yyyy-MM-dd"), false),
//   ])
// );

localStorage.setItem("Lara-toDoList-currentID", 3);

console.log(new Date().getHours());
console.log(new Date().toDateString());

const taskHolder = new TaskHolder("Lara");

const today = new Today(taskHolder);

today.initialiseContent(contentHolder);
