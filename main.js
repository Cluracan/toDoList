import "./style.css";
import morningBackgroundUrl from "./blue-morning.jpg";
import afternoonBackgroundUrl from "./blue-afternoon.jpg";
import eveningBackgroundUrl from "./blue-night.jpeg/";
import { format } from "date-fns";
import { Task } from "./task";
import { UserHandler } from "./userHandler";
const backgroundHolder = document.getElementById("backdrop");

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
      "art",
      "high"
    ),
    new Task(
      "To do item 2",
      2,
      format(new Date(), "yyyy-MM-dd"),
      "some notes",
      false,
      "gardening",
      "medium"
    ),
    new Task(
      "To do item 3",
      3,
      format(new Date("September 16, 2024"), "yyyy-MM-dd"),
      false
    ),
    new Task(
      "To do Item 4",
      4,
      format(new Date("September 24, 2024"), "yyyy-MM-dd"),
      "",
      false,
      "personal",
      "high"
    ),
    new Task("To do Item 5", 4, null, "", false, "personal", "high"),
  ])
);

localStorage.setItem("Lara-toDoList-currentID", 4);
localStorage.setItem("toDoList-lastUser", "Lara");
const userHandler = new UserHandler();
userHandler.initialise();
