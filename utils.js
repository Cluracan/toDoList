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

const createEditDialog = (task, taskHolder) => {
  const editTaskDialog = document.createElement("dialog");
  const editForm = document.createElement("form");
  editForm.method = "dialog";

  // --- title ---
  const titleInput = document.createElement("input");
  titleInput.type = "text";
  titleInput.value = task.title;
  editForm.appendChild(titleInput);

  // --- notes ---
  const notesHolder = createDiv("notes-holder");
  const notesLabel = document.createElement("label");
  notesLabel.for = "notes";
  notesLabel.textContent = "Notes";
  notesHolder.appendChild(notesLabel);
  const notesInput = document.createElement("textarea");
  notesInput.id = "notes";
  notesInput.rows = 5;
  notesInput.cols = 32;
  notesHolder.appendChild(notesInput);
  editForm.appendChild(notesHolder);

  // --- project ---
  const projectHolder = document.createElement("fieldset");
  const projectLegend = document.createElement("legend");
  projectLegend.textContent = "Project";
  projectHolder.appendChild(projectLegend);

  for (let project of taskHolder.projectList) {
    const optionHolder = createDiv("option-holder");
    const projectOption = document.createElement("input");
    projectOption.type = "radio";
    projectOption.id = project;
    projectOption.name = "project";
    if (task.project === project) {
      projectOption.checked = true;
    }
    optionHolder.appendChild(projectOption);
    const projectLabel = document.createElement("label");
    projectLabel.setAttribute("for", project);
    projectLabel.textContent = project;
    optionHolder.appendChild(projectLabel);
    projectHolder.appendChild(optionHolder);
  }
  editForm.appendChild(projectHolder);

  // --- due date ---
  const dueDateHolder = createDiv("due-date-holder");
  const dueDateLabel = document.createElement("label");
  dueDateLabel.for = "dueDate";
  dueDateLabel.textContent = "Due date";
  dueDateHolder.appendChild(dueDateLabel);
  const dueDateValue = createDiv("due-date-value");
  dueDateValue.textContent = "test";
  dueDateHolder.appendChild(dueDateValue);
  dueDateValue.addEventListener("click", (e) => {
    console.log("click");
    dueDateHiddenInput.showPicker();
  });
  const dueDateHiddenInput = document.createElement("input");
  dueDateHiddenInput.type = "date";
  dueDateHiddenInput.id = "dueDate";
  dueDateHolder.appendChild(dueDateHiddenInput);
  editForm.appendChild(dueDateHolder);

  // --- tags ---
  const tagHolder = document.createElement("fieldset");
  const tagLegend = document.createElement("legend");
  tagLegend.textContent = "tags";
  tagHolder.appendChild(tagLegend);
  for (const testTag of ["priority", "family", "must do"]) {
    const tagOption = document.createElement("input");
    tagOption.type = "checkbox";
    tagOption.id = testTag;
    tagOption.name = "tags";
    if (task.tags.includes(testTag)) {
      tagOption.checked = true;
    }
    tagHolder.appendChild(tagOption);
    const tagLabel = document.createElement("label");
    tagLabel.setAttribute("for", testTag);
    tagLabel.textContent = testTag;
    tagHolder.appendChild(tagLabel);
  }
  editForm.appendChild(tagHolder);

  // --- confirm/cancel ---
  const buttonHolder = createDiv("dialog-button-holder");

  const confirmButton = document.createElement("button");
  confirmButton.textContent = "Confirm";
  confirmButton.addEventListener("click", (e) => {
    console.log(e);
  });
  buttonHolder.appendChild(confirmButton);

  const cancelButton = document.createElement("button");
  cancelButton.textContent = "Cancel";
  cancelButton.addEventListener("click", (e) => {
    console.log(e);
  });
  buttonHolder.appendChild(cancelButton);
  editForm.appendChild(buttonHolder);

  editTaskDialog.appendChild(editForm);
  return editTaskDialog;
};
export { createDiv, createEditDialog };
