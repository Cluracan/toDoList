import "./style.css";
import morningBackgroundUrl from "./blue-morning.jpg";
import afternoonBackgroundUrl from "./blue-afternoon.jpg";
import eveningBackgroundUrl from "./blue-night.jpeg/";
import { format } from "date-fns";
import { Today } from "./today";
import { TaskHolder } from "./taskHolder";
import { Task } from "./task";
import { Upcoming } from "./upcoming";
const backgroundHolder = document.getElementById("background");

let currentHour = new Date().getHours();
if (currentHour < 12) {
  backgroundHolder.style.backgroundImage = `url("${morningBackgroundUrl}")`;
} else if (currentHour < 18) {
  backgroundHolder.style.backgroundImage = `url("${afternoonBackgroundUrl}")`;
} else {
  backgroundHolder.style.backgroundImage = `url("${eveningBackgroundUrl}")`;
}

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
    new Task(
      "To do item 3",
      3,
      format(new Date("September 12, 2024"), "yyyy-MM-dd"),
      false
    ),
    new Task(
      "To do Item 4",
      4,
      format(new Date("September 15, 2024"), "yyyy-MM-dd"),
      "",
      false,
      "personal",
      ["priority"]
    ),
  ])
);

localStorage.setItem("Lara-toDoList-currentID", 4);

const contentHolder = document.getElementById("content");
const taskHolder = new TaskHolder("Lara");

const today = new Today(taskHolder);
const upcoming = new Upcoming(taskHolder);
upcoming.initialiseContent(contentHolder);

// today.initialiseContent(contentHolder);
