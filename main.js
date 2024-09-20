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

// localStorage.removeItem("toDoList-lastUser");

const userHandler = new UserHandler();
userHandler.initialise();
