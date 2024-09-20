import { TaskHolder } from "./taskHolder";
import { createDiv } from "./utils";

export class ChangeUser {
  constructor(userHandler) {
    this.userHandler = userHandler;
    this.savedUsers = TaskHolder.getUserList();
  }
  initialiseContent() {
    const contentHolder = document.getElementById("content");
    contentHolder.innerHTML = "";
    const userSelectDialog = document.createElement("dialog");
    const heading = createDiv("change-user-heading");
    heading.textContent = "Choose a user:";
    userSelectDialog.appendChild(heading);
    const savedUsers = createDiv("change-user-saved-user-holder");
    this.savedUsers.forEach((user) => {
      const userOption = createDiv("change-user-saved-user");
      const userName = createDiv("change-user-saved-user-name");
      userName.textContent = user;
      userOption.appendChild(userName);

      const removeUser = createDiv("remove-user");
      removeUser.textContent = "remove";
      removeUser.addEventListener("click", (e) => {
        this.userHandler.removeUser(user);
      });
      userOption.appendChild(removeUser);

      const selectUser = createDiv("select-user");
      selectUser.textContent = "select";
      selectUser.addEventListener("click", (e) => {
        this.userHandler.setLastUser(user);
        this.userHandler.initialise();
      });
      userOption.appendChild(selectUser);
      savedUsers.appendChild(userOption);
    });
    userSelectDialog.appendChild(savedUsers);
    //
    const newUser = createDiv("change-user-new-user");
    const newUserInput = document.createElement("input");
    newUserInput.type = "text";
    newUserInput.placeholder = "new user";
    newUserInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && e.target.value.trim()) {
        this.userHandler.setLastUser(newUserInput.value.trim());
        this.userHandler.initialise();
      }
    });
    newUser.appendChild(newUserInput);
    const selectUser = createDiv("select-new-user");
    selectUser.textContent = "select";
    selectUser.addEventListener("click", (e) => {
      if (newUserInput.value.trim()) {
        this.userHandler.setLastUser(newUserInput.value.trim());
        this.userHandler.initialise();
      }
    });
    newUser.appendChild(selectUser);
    userSelectDialog.appendChild(newUser);
    contentHolder.appendChild(userSelectDialog);
    userSelectDialog.showModal();
  }
}
