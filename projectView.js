export class ProjectView {
  taskCollection;
  constructor(taskHolder) {
    this.taskHolder = taskHolder;
    this.collectionTitle = "projects";
  }
  initialiseContent(projectName) {
    console.log(`initialising ${projectName}`);
    this.taskCollection = this.taskHolder.getProjectTasks(projectName);
    console.log(this.taskCollection);
  }
}
