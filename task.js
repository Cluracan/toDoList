export class Task {
  constructor(
    title,
    id,
    dueDate = null,
    notes = null,
    completed = false,
    project = "personal",
    priority = "none"
  ) {
    this.title = title;
    this.id = id;
    this.notes = notes;
    this.dueDate = dueDate;
    this.completed = completed;
    this.project = project;
    this.priority = priority;
  }
}
