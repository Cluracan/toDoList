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

const editTaskDialog = document.createElement("dialog");
const editForm = document.createElement("form");
editForm.method = "dialog";
const contentHolder = document.createElement("p");
const questionLabel = document.createElement("label");
questionLabel.for = "favAnimal";
questionLabel.textContent = "Favourite Animal";
const selectElement = document.createElement("select");
selectElement.id = "favAnimal";
selectElement.name = "favAnimal";
const optionA = document.createElement("option");
optionA.textContent = "cat";
selectElement.appendChild(optionA);
const optionB = document.createElement("option");
optionB.textContent = "cat too";
selectElement.appendChild(optionB);
contentHolder.appendChild(questionLabel);
contentHolder.appendChild(selectElement);
editForm.appendChild(contentHolder);
editTaskDialog.appendChild(editForm);

export { createDiv, editTaskDialog };
