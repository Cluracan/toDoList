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
  "Lara-toDoList",
  JSON.stringify({
    taskList: [
      new Task(
        "Draw a picture",
        1,
        format(new Date(), "yyyy-MM-dd"),
        "",
        false,
        "art",
        "high"
      ),
      new Task(
        "Mow the garden",
        2,
        format(new Date(), "yyyy-MM-dd"),
        "some notes",
        false,
        "gardening",
        "medium"
      ),
      new Task(
        "Swim",
        3,
        format(new Date("September 22, 2024"), "yyyy-MM-dd"),
        false
      ),
      new Task(
        "Birthday",
        4,
        format(new Date("October 29, 2024"), "yyyy-MM-dd"),
        "",
        false,
        "personal",
        "high"
      ),
      new Task("Make a tea", 5, null, "", false, "personal", "high"),
    ],
    currentID: 5,
  })
);
// localStorage.removeItem("toDoList-lastUser");
// localStorage.setItem("toDoList-lastUser", "Bob");
// localStorage.setItem("toDoList-userList", JSON.stringify(["Lara"]));
const userHandler = new UserHandler();
userHandler.initialise();
