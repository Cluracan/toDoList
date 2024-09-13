import { DisplayHandler } from "./displayHandler";
import { TaskHolder } from "./taskHolder";

export class UserHandler {
  constructor() {}

  initialise() {
    //assuming single user exists
    const taskHolder = new TaskHolder("Lara");
    const displayHandler = new DisplayHandler(taskHolder);
    displayHandler.initialiseContent();
  }
}
