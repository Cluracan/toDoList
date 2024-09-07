import "./style.css";
import morningBackgroundUrl from "./blue-morning.jpg";
import afternoonBackgroundUrl from "./blue-afternoon.jpg";
import eveningBackgroundUrl from "./blue-night.jpeg/";
import { format } from "date-fns";
import { Today } from "./today";
import { TaskHolder } from "./taskHolder";
import { Task } from "./task";
const backgroundHolder = document.getElementById("background");

let currentHour = new Date().getHours();
if (currentHour < 12) {
  backgroundHolder.style.backgroundImage = `url("${morningBackgroundUrl}")`;
} else if (currentHour < 18) {
  backgroundHolder.style.backgroundImage = `url("${afternoonBackgroundUrl}")`;
} else {
  backgroundHolder.style.backgroundImage = `url("${eveningBackgroundUrl}")`;
}

const contentHolder = document.getElementById("content");

console.log(format(new Date(), "a 'in the' eeee"));

localStorage.setItem(
  "Lara-toDoList-tasks",
  JSON.stringify([
    new Task(
      "To do Item 1",
      1,
      format(new Date(), "yyyy-MM-dd"),
      "",
      false,
      "fishing",
      ["priority"]
    ),
    new Task(
      "To do item 2",
      2,
      format(new Date(), "yyyy-MM-dd"),
      "some notes",
      false,
      "gardening",
      ["priority", "family"]
    ),
    new Task("To do item 3", 3, format(new Date(), "yyyy-MM-dd"), false),
  ])
);

localStorage.setItem("Lara-toDoList-currentID", 3);

console.log(new Date().getHours());
console.log(new Date().toDateString());

const taskHolder = new TaskHolder("Lara");

const today = new Today(taskHolder);

today.initialiseContent(contentHolder);
