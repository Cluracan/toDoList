import { format, isBefore } from "date-fns";

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
  titleInput.name = "title";
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
  notesInput.name = "notes";
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

  for (let project of taskHolder.projectList) {
    const optionHolder = createDiv("option-holder");
    const projectOption = document.createElement("input");
    projectOption.type = "radio";
    projectOption.id = project;
    projectOption.value = project;
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
  let dueDateValue = createDiv("due-date-value");
  updateDateText(dueDateValue, task.dueDate);
  // dueDateValue.textContent = getDueDate(task.dueDate);
  dueDateHolder.appendChild(dueDateValue);
  dueDateValue.addEventListener("click", (e) => {
    dueDateHiddenInput.showPicker();
  });
  if (task.dueDate) {
    const deleteDate = createDiv("delete-date", "delete-date");
    deleteDate.textContent = "\u2716";
    dueDateHolder.appendChild(deleteDate);
    deleteDate.addEventListener("click", (e) => {
      console.log("click delete date");
      dueDateHiddenInput.value = null;
      updateDateText(dueDateValue, null);
      deleteDate.remove();
    });
  }
  const dueDateHiddenInput = document.createElement("input");
  dueDateHiddenInput.type = "date";
  dueDateHiddenInput.id = "dueDate";
  dueDateHiddenInput.name = "dueDate";
  dueDateHolder.appendChild(dueDateHiddenInput);
  editForm.appendChild(dueDateHolder);
  dueDateHiddenInput.addEventListener("change", (e) => {
    console.log("change!");
    if (
      isBefore(dueDateHiddenInput.value, new Date()) ||
      dueDateHiddenInput.value === format(new Date(), "yyyy-MM-dd")
    ) {
      console.log("altering to today");
      dueDateHiddenInput.value = format(new Date(), "yyyy-MM-dd");
      dueDateValue.textContent = "today";
    } else {
      dueDateValue.textContent = format(e.target.value, "do MMMM");
    }
    if (!dueDateHolder.children.namedItem("delete-date")) {
      const deleteDate = createDiv("delete-date", "delete-date");
      deleteDate.textContent = "\u2716";
      dueDateHolder.appendChild(deleteDate);
      deleteDate.addEventListener("click", (e) => {
        console.log("click delete date");
        dueDateHiddenInput.value = null;
        updateDateText(dueDateValue, null);
        deleteDate.remove();
      });
    }
  });

  // --- tags ---
  const tagHolder = document.createElement("fieldset");
  const tagLegend = document.createElement("legend");
  tagLegend.textContent = "tags";
  tagHolder.appendChild(tagLegend);
  for (const testTag of ["priority", "family", "must do"]) {
    const tagOption = document.createElement("input");
    tagOption.type = "checkbox";
    tagOption.id = testTag;
    tagOption.value = testTag;
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
    const data = new FormData(editForm);
    taskHolder.editTask(task.id, {
      title: data.get("title"),
      notes: data.get("notes"),
      project: data.get("project"),
      dueDate: data.get("dueDate"),
      tags: data.getAll("tags"),
    });
  });
  buttonHolder.appendChild(confirmButton);

  const cancelButton = document.createElement("button");
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
    console.log("match");
    dueDateValue.textContent = "today";
  } else if (isBefore(dueDate, new Date())) {
    console.log("BEFORE");
    dueDateValue.textContent = "today";
  } else {
    dueDateValue.textContent = format(dueDate, "do MMMM");
  }
};

export { createDiv, createEditDialog };
