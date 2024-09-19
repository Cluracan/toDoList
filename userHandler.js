import { ChangeUser } from "./changeUser";
import { DisplayHandler } from "./displayHandler";
import { TaskHolder } from "./taskHolder";

export class UserHandler {
  constructor() {}

  initialise() {
    //assuming single user exists
    if (localStorage.getItem("toDoList-lastUser")) {
      const userName = localStorage.getItem("toDoList-lastUser");
      const taskHolder = new TaskHolder(userName);
      const displayHandler = new DisplayHandler(taskHolder, this);
      displayHandler.initialiseContent();
    } else {
      const changeUser = new ChangeUser(this);
      changeUser.initialiseContent();
    }
  }

  clearLastUser() {
    localStorage.removeItem("toDoList-lastUser");
  }
}
