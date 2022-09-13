"use strict";

let addInput = document.getElementById("todo-input");

let addBtn = document.getElementById("todo-add-btn");

let list = document.getElementById("todo-list");

let paragraph, editBtn;
let paraCount = -1;
let paraArray = [];
let LsArray = [];
let paraArrayIndex = -1;

function createTodo() {
  let text = addInput.value;

  if (text === "") {
    return;
  }

  paraArray.push(text);
  console.log(paraArray);
  localStorage.setItem("todo", JSON.stringify(paraArray));

  let item = document.createElement("li");

  let checkbox = document.createElement("input");
  checkbox.classList.add("checkbox");
  checkbox.type = "checkbox";

  paragraph = document.createElement("p");
  paragraph.classList.add("paragraph");
  paragraph.id = "paragraph";
  paragraph.textContent = text;

  let remove = document.createElement("span");
  remove.classList.add("remove");
  remove.id = "remove";
  remove.innerHTML = "&cross;";

  editBtn = document.createElement("button");
  editBtn.classList.add("editBtn");
  editBtn.type = "submit";
  editBtn.id = paraCount;
  editBtn.innerText = "Edit";
  // console.log(editBtn.id);

  item.appendChild(checkbox);
  item.appendChild(paragraph);
  item.appendChild(remove);
  item.appendChild(editBtn);
  list.appendChild(item);

  addInput.value = "";
}

// update input function;

function showEditInput(EditBtnElement) {
  console.log(EditBtnElement);
  let editInput = document.getElementsByClassName("editInput")[0];
  if (editInput) {
    editInput.remove();
  }

  let input = document.createElement("input");
  input.type = "text";
  input.name = "editInput";

  paraArrayIndex = EditBtnElement.id;
  input.value = paraArray[EditBtnElement.id];
  input.classList.add("editInput");

  EditBtnElement.parentElement.appendChild(input);
  input.focus();
}

// remove todo function

function removeTodo(removeElement) {
  removeElement.parentElement.remove();
}

function toggleComplete(inputElement) {
  // if (inputElement.checked === false) {
  //   inputElement.parentElement.classList.remove("complete");
  // }
  // else {
  inputElement.parentElement.classList.add("complete");
  inputElement.checked = true;
  // }
}

// update todo function

function updateTodo() {
  let editInput = document.getElementsByClassName("editInput")[0];
  if (!editInput) {
    return;
  }

  let newText = editInput.value;

  if (newText !== "") {
    let paragraph = editInput.parentElement.querySelector("#paragraph");
    paragraph.innerHTML = newText;
    paraArray[paraArrayIndex] = newText;
    localStorage.setItem("todo", JSON.stringify(paraArray));
  }
  console.log(paraArray);
  editInput.remove();
}

// events

list.addEventListener("click", function (event) {
  event.stopPropagation();

  switch (event.target.tagName) {
    case "BUTTON":
      showEditInput(event.target);
      console.log(event);
      break;
    case "SPAN":
      removeTodo(event.target);
      break;
  }
});

list.addEventListener("change", function (event) {
  if (event.target.tagName === "INPUT" && event.target.type === "checkbox") {
    toggleComplete(event.target);
  }
});

list.addEventListener("keypress", function (event) {
  event.stopPropagation();
  if (event.key === "Enter") {
    updateTodo();
  }
});

document.addEventListener("click", updateTodo);

addBtn.addEventListener("click", function (event) {
  event.stopPropagation();
  ++paraCount;
  createTodo();
});

addInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    ++paraCount;
    createTodo();
  }
});
