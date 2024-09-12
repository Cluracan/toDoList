import "./style.css";
import morningBackgroundUrl from "./blue-morning.jpg";
import afternoonBackgroundUrl from "./blue-afternoon.jpg";
import eveningBackgroundUrl from "./blue-night.jpeg/";
import { format } from "date-fns";
import { Today } from "./today";
import { TaskHolder } from "./taskHolder";
import { Task } from "./task";
import { Upcoming } from "./upcoming";
import { AllTask } from "./allTasks";
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
const allTasks = new AllTask(taskHolder);
upcoming.initialiseContent(contentHolder);

// today.initialiseContent(contentHolder);

const todayViewButton = document.getElementById("today-view");
todayViewButton.addEventListener("click", (e) => {
  today.initialiseContent(contentHolder);
  navHighlight("today-view");
});

const weekViewButton = document.getElementById("week-view");
weekViewButton.addEventListener("click", (e) => {
  upcoming.initialiseContent(contentHolder);
  navHighlight("week-view");
});

const allViewButton = document.getElementById("all-view");
allViewButton.addEventListener("click", (e) => {
  allTasks.initialiseContent(contentHolder);
  navHighlight("all-view");
});

const navHighlight = (targetID) => {
  let elementArray = [todayViewButton, weekViewButton, allViewButton];
  //add lists and allTaskButton to this
  for (const element of elementArray) {
    if (element.id === targetID) {
      element.classList.add("nav-selected");
    } else {
      element.classList.remove("nav-selected");
    }
  }
};
