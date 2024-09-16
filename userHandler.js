import { DisplayHandler } from "./displayHandler";
import { TaskHolder } from "./taskHolder";

export class UserHandler {
  constructor() {}

  initialise() {
    //assuming single user exists
    if (localStorage.getItem("toDoList-lastUser")) {
      const userName = localStorage.getItem("toDoList-lastUser");
      const taskHolder = new TaskHolder(userName);
      const displayHandler = new DisplayHandler(taskHolder);
      displayHandler.initialiseContent();
    }
  }
}
