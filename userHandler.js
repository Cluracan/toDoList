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

  setLastUser(user) {
    localStorage.setItem("toDoList-lastUser", user);
  }

  clearLastUser() {
    localStorage.removeItem("toDoList-lastUser");
  }
  removeUser(userName) {
    localStorage.removeItem(`${userName}-toDoList`);
    let userList = JSON.parse(localStorage.getItem("toDoList-userList"));
    userList = userList.filter((user) => user != userName);
    localStorage.setItem("toDoList-userList", JSON.stringify(userList));
    this.initialise();
  }
}
