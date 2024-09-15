import { format, isBefore, add } from "date-fns";

const createDiv = (classList, id) => {
  const newDiv = document.createElement("div");
  if (classList) {
    newDiv.classList = classList;
  }
  if (id) {
    newDiv.id = id;
  }
  return newDiv;
};

const createEditDialog = (task, idIndex, taskHolder, dayIndex = 0) => {
  const editTaskDialog = document.createElement("dialog");
  const editForm = document.createElement("form");
  editForm.method = "dialog";

  // --- title ---
  const titleInput = document.createElement("input");
  titleInput.id = "dialog-title";
  titleInput.type = "text";
  titleInput.name = "title";
  titleInput.value = task.title;
  editForm.appendChild(titleInput);

  // --- notes ---
  const notesHolder = createDiv("notes-holder");
  const notesLabel = document.createElement("label");
  notesLabel.for = "dialog-notes";
  notesLabel.textContent = "Notes";
  notesHolder.appendChild(notesLabel);
  const notesInput = document.createElement("textarea");
  notesInput.id = "dialog-notes";
  notesInput.name = "notes";
  notesInput.placeholder = "Insert your notes here.";
  notesInput.value = task.notes || "";
  notesInput.rows = 5;
  notesInput.cols = 32;
  notesHolder.appendChild(notesInput);
  editForm.appendChild(notesHolder);

  // --- project ---
  const projectHolder = document.createElement("fieldset");
  const projectLegend = document.createElement("legend");
  projectLegend.textContent = "Project";
  projectHolder.appendChild(projectLegend);

  taskHolder.projectList.keys().forEach((project) => {
    const optionHolder = createDiv("option-holder");
    const projectOption = document.createElement("input");
    projectOption.type = "radio";
    projectOption.id = `${project}-${dayIndex}-${idIndex}`;
    projectOption.value = `${project}`;
    projectOption.name = "project";
    if (task.project === project) {
      projectOption.checked = true;
    }
    optionHolder.appendChild(projectOption);
    const projectLabel = document.createElement("label");
    projectLabel.setAttribute("for", `${project}-${dayIndex}-${idIndex}`);
    projectLabel.textContent = project;
    optionHolder.appendChild(projectLabel);
    projectHolder.appendChild(optionHolder);
  });
  editForm.appendChild(projectHolder);

  // --- due date ---
  const dueDateHolder = createDiv("due-date-holder");
  const dueDateLabel = document.createElement("label");
  dueDateLabel.for = "dueDate";
  dueDateLabel.textContent = "Due date";
  dueDateHolder.appendChild(dueDateLabel);

  let dueDateValueHolder = createDiv("due-date-value");
  let dueDateValueSpan = document.createElement("span");
  dueDateValueHolder.appendChild(dueDateValueSpan);
  updateDateText(dueDateValueSpan, task.dueDate);
  dueDateHolder.appendChild(dueDateValueHolder);
  dueDateValueSpan.addEventListener("click", (e) => {
    dueDateHiddenInput.showPicker();
  });
  if (task.dueDate) {
    addDeleteDateButton();
  }

  const dueDateHiddenInput = document.createElement("input");
  dueDateHiddenInput.type = "date";
  dueDateHiddenInput.id = "dueDate";
  dueDateHiddenInput.name = "dueDate";
  dueDateHiddenInput.value = task.dueDate;
  dueDateHolder.appendChild(dueDateHiddenInput);
  editForm.appendChild(dueDateHolder);
  dueDateHiddenInput.addEventListener("change", (e) => {
    if (
      isBefore(dueDateHiddenInput.value, new Date()) ||
      dueDateHiddenInput.value === format(new Date(), "yyyy-MM-dd")
    ) {
      dueDateHiddenInput.value = format(new Date(), "yyyy-MM-dd");
      dueDateValueSpan.textContent = "Today";
    } else {
      dueDateValueSpan.textContent = format(e.target.value, "do MMMM");
    }
    if (!dueDateValueHolder.children.namedItem("delete-date")) {
      addDeleteDateButton();
    }
  });

  function addDeleteDateButton() {
    const deleteDate = document.createElement("span");
    deleteDate.id = "delete-date";
    deleteDate.classList.add("delete-date");
    deleteDate.textContent = "\u2716";
    dueDateValueHolder.appendChild(deleteDate);
    deleteDate.addEventListener("click", (e) => {
      dueDateHiddenInput.value = null;
      updateDateText(dueDateValueSpan, null);
      deleteDate.remove();
    });
  }

  // --- Priorities ---
  const priorityHolder = document.createElement("fieldset");
  priorityHolder.classList.add("priority-holder");
  const priorityLegend = document.createElement("legend");
  priorityLegend.textContent = "Priority";
  priorityHolder.appendChild(priorityLegend);
  for (const priorityName of taskHolder.priorityList.keys()) {
    const priorityOption = document.createElement("input");
    priorityOption.type = "radio";
    priorityOption.classList.add("priority-radio");
    priorityOption.id = `${priorityName}-${dayIndex}-${idIndex}`;
    priorityOption.value = priorityName;
    priorityOption.name = "priority";
    if (task.priority.includes(priorityName)) {
      priorityOption.checked = true;
    }
    priorityHolder.appendChild(priorityOption);
    const priorityLabel = document.createElement("label");
    priorityLabel.classList.add("priority-label");
    priorityLabel.classList.add("noselect");
    priorityLabel.style.backgroundColor = priorityColors[priorityName];
    priorityLabel.setAttribute("for", `${priorityName}-${dayIndex}-${idIndex}`);
    priorityLabel.textContent = `${priorityName}`;
    priorityHolder.appendChild(priorityLabel);
  }
  editForm.appendChild(priorityHolder);

  // --- confirm/cancel ---
  const buttonHolder = createDiv("dialog-button-holder");

  const confirmButton = document.createElement("button");
  confirmButton.classList.add("dialog-button");
  confirmButton.textContent = "Confirm";
  confirmButton.addEventListener("click", (e) => {
    const data = new FormData(editForm);
    taskHolder.editTask(task.id, {
      title: data.get("title"),
      notes: data.get("notes"),
      project: data.get("project"),
      dueDate: data.get("dueDate"),
      priority: data.getAll("priority"),
    });
  });
  buttonHolder.appendChild(confirmButton);

  const cancelButton = document.createElement("button");
  cancelButton.classList.add("dialog-button");
  cancelButton.textContent = "Cancel";

  buttonHolder.appendChild(cancelButton);
  editForm.appendChild(buttonHolder);

  editTaskDialog.appendChild(editForm);

  editTaskDialog.addEventListener("click", (e) => {
    const dialogDimensions = editTaskDialog.getBoundingClientRect();
    if (
      e.clientX < dialogDimensions.left ||
      e.clientX > dialogDimensions.right ||
      e.clientY < dialogDimensions.top ||
      e.clientY > dialogDimensions.bottom
    ) {
      editTaskDialog.close();
    }
  });

  return editTaskDialog;
  /*
Interesting!

the 'name' attribute is the key in key/value pairs on submit (which is used in 'FormData')
the 'value' is obviously the value in the above :)
the 'id' and 'for' link label to checkbox/radio button which means clicking on a label name autochecks the button/box
note that 'for' didn't work when I tried "tagLabel.for = ..."  - I had to use "tagLabel.setAttribute('for',...)" (I guess it isn't a 'standard one?) 
also note the use of get & getAll (to cope with multiple entries in tags) in formdata - get just gets first value, getAll gets all values associated with the name
*/
};

const updateDateText = (dueDateValue, dueDate) => {
  if (!dueDate) {
    dueDateValue.textContent = "no due date";
  } else if (dueDate === format(new Date(), "yyyy-MM-dd")) {
    dueDateValue.textContent = "Today";
  } else if (isBefore(dueDate, new Date())) {
    dueDateValue.textContent = "Today";
  } else {
    dueDateValue.textContent = format(dueDate, "do MMMM");
  }
};

const createTaskList = (timeModule, taskList, contentHolder, dayIndex = 0) => {
  const contentFadeIn = createDiv(`${timeModule.collectionTitle}-fade-in`);

  taskList
    .sort((a, b) => b.id - a.id)
    .sort((task) => (task.completed ? 1 : -1));
  taskList.forEach((task, index) => {
    const taskDiv = createDiv(`${timeModule.collectionTitle}-toDo`);
    const completedButton = createDiv("completed-button");
    completedButton.addEventListener("click", (e) => {
      if (!task.completed) {
        completedButton.textContent = `\u2713`;
        task.completed = true;
        taskDiv.classList.add("completed");
      } else {
        taskDiv.classList.remove("completed");
        completedButton.textContent = "";
        task.completed = false;
      }
      timeModule.updateContent(contentHolder);
    });

    if (task.completed) {
      taskDiv.classList.add("completed");
      completedButton.textContent = "\u2713";
    }
    taskDiv.appendChild(completedButton);

    const toDoItem = createDiv(`${timeModule.collectionTitle}-toDo-item`);
    const toDoItemList = createDiv(
      `${timeModule.collectionTitle}-toDo-item-list`
    );
    toDoItemList.textContent = task.project;
    const toDoItemName = createDiv(
      `${timeModule.collectionTitle}-toDo-item-name`
    );
    toDoItemName.textContent = task.title;
    toDoItem.appendChild(toDoItemList);
    toDoItem.append(toDoItemName);

    const editDialog = createEditDialog(
      task,
      index,
      timeModule.taskHolder,
      dayIndex
    );
    editDialog.addEventListener("close", (e) => {
      timeModule.updateTaskCollection();
      timeModule.updateContent(contentHolder);
    });
    contentHolder.appendChild(editDialog);
    toDoItem.addEventListener("click", (e) => {
      editDialog.showModal();
    });
    taskDiv.appendChild(toDoItem);

    const deleteButton = createDiv("delete-button");
    deleteButton.textContent = "\u2716";
    deleteButton.addEventListener("click", (e) => {
      timeModule.taskHolder.deleteTask(task.id);
      timeModule.updateTaskCollection();
      timeModule.updateContent(contentHolder);
    });

    taskDiv.appendChild(deleteButton);
    contentFadeIn.appendChild(taskDiv);
  });
  return contentFadeIn;
};

const createAddTask = (
  timeModule,
  contentHolder,
  dayIndex = 0,
  projectName = "personal"
) => {
  const taskDate = add(new Date(), {
    days: dayIndex,
  });
  let formattedTaskDate = format(taskDate, "yyyy-MM-dd");
  if (timeModule.collectionTitle === "projects") {
    formattedTaskDate = null;
  }

  const addTask = createDiv(`${timeModule.collectionTitle}-add-task`);
  const addIcon = createDiv(`${timeModule.collectionTitle}-add-icon`);
  addIcon.textContent = "+";

  addIcon.addEventListener("click", (e) => {
    addInput.focus();
  });

  const addInput = document.createElement("textarea");
  addInput.classList = `${timeModule.collectionTitle}-add-input`;
  addInput.rows = 1;
  addInput.placeholder = "Add task";

  addInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      timeModule.taskHolder.addTask(
        e.target.value,
        formattedTaskDate,
        null,
        projectName
      );
      timeModule.updateTaskCollection();
      timeModule.updateContent(contentHolder);
      // e.target.scrollIntoView();
      addInput.value = "";
    }
  });

  addTask.appendChild(addIcon);
  addTask.appendChild(addInput);
  return addTask;
};

const createNewProjectDialog = (navBar) => {
  const newProjectDialog = document.createElement("dialog");
  const newProjectForm = document.createElement("form");
  newProjectForm.method = "dialog";
  newProjectForm.id = "nav-new-project-form";
  const newProjectInput = document.createElement("input");
  const newProjectLabel = document.createElement("label");
  newProjectLabel.for = "nav-new-project-input";
  newProjectLabel.textContent = "Project name";
  newProjectInput.id = "nav-new-project-input";
  newProjectInput.type = "text";
  newProjectForm.appendChild(newProjectLabel);
  newProjectForm.appendChild(newProjectInput);
  newProjectDialog.appendChild(newProjectForm);
  newProjectInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      newProjectDialog.close();
      navBar.display.projectView.initialiseContent(newProjectInput.value);
    } else {
      // this.style.width = this.value.length + "ch";
    }
  });
  // Close on outer click
  newProjectDialog.addEventListener("click", (e) => {
    const dialogDimensions = newProjectDialog.getBoundingClientRect();
    if (
      e.clientX < dialogDimensions.left ||
      e.clientX > dialogDimensions.right ||
      e.clientY < dialogDimensions.top ||
      e.clientY > dialogDimensions.bottom
    ) {
      newProjectDialog.close();
    }
  });
  return newProjectDialog;
};

const priorityColors = {
  high: "rgb(255,0,0)",
  medium: "rgb(255,165,0)",
  low: "rgb(0,128,0)",
  none: "var(--main-color)",
};

export {
  createDiv,
  createTaskList,
  createAddTask,
  createNewProjectDialog,
  priorityColors,
};
