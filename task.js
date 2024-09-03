export class Task {
  constructor(
    title,
    id,
    date = null,
    notes = null,
    completed = false,
    project = "personal",
    tags = []
  ) {
    this.title = title;
    this.id = id;
    this.notes = notes;
    this.date = date;
    this.completed = completed;
    this.project = project;
    this.tags = tags;
  }
}
