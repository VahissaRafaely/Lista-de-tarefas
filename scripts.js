const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");
const searchInput = document.querySelector("#search-input");
const filterSelect = document.querySelector("#filter-select");

let oldInputValue;

// Funções
const saveTodoOnScreen = (text) => {
  const todo = document.createElement("div");
  todo.classList.add("todo");

  const todoTitle = document.createElement("h3");
  todoTitle.innerText = text;
  todo.appendChild(todoTitle);

  todo.classList.add(text.toLowerCase().replace(/\s/g, "-"));

  const doneBtn = document.createElement("button");
  doneBtn.classList.add("finish-todo");
  doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
  todo.appendChild(doneBtn);

  const editBtn = document.createElement("button");
  editBtn.classList.add("edit-todo");
  editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
  todo.appendChild(editBtn);

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("remove-todo");
  deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
  todo.appendChild(deleteBtn);

  todoList.appendChild(todo);
};

const saveTodo = (text) => {
  saveTodoOnScreen(text);
  todoInput.value = "";
  todoInput.focus();
};

const updateTodoOnScreen = (oldText, newText) => {
  const todos = document.querySelectorAll(".todo");

  todos.forEach((todo) => {
    const todoTitle = todo.querySelector("h3");

    if (todoTitle.innerText === oldText) {
      todoTitle.innerText = newText;
    }
  });
};

const updateTodo = (oldText, newText) => {
  updateTodoOnScreen(oldText, newText);
};

const performSearch = () => {
  const searchValue = searchInput.value.trim().toLowerCase().replace(/\s/g, "-");

  const todos = document.querySelectorAll(".todo");

  todos.forEach((todo) => {
    const todoText = todo.classList;

    if (!todoText.contains(searchValue)) {
      todo.style.display = "none";
    } else {
      todo.style.display = "flex";
    }
  });

  if (searchValue === "") {
    todos.forEach((todo) => {
      todo.style.display = "flex";
    });
  }
};

const filterTodos = (filterType) => {
  const todos = document.querySelectorAll(".todo");

  todos.forEach((todo) => {
    const isDone = todo.classList.contains("done");

    if (filterType === "all") {
      todo.style.display = "flex";
    } else if (filterType === "todo" && !isDone) {
      todo.style.display = "flex";
    } else if (filterType === "done" && isDone) {
      todo.style.display = "flex";
    } else {
      todo.style.display = "none";
    }
  });
};

// Eventos
todoForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const inputValue = todoInput.value;

  if (inputValue) {
    saveTodo(inputValue);
  }
});

document.addEventListener("click", (e) => {
    const targetEl = e.target;
    const parentEl = targetEl.closest(".todo");
  
    if (parentEl) {
      const todoTitle = parentEl.querySelector("h3").innerText;
  
      if (targetEl.classList.contains("finish-todo")) {
        parentEl.classList.toggle("done");
      }
  
      if (targetEl.classList.contains("remove-todo")) {
        parentEl.remove();
      }
  
      if (targetEl.classList.contains("edit-todo")) {
        editInput.value = todoTitle;
        oldInputValue = todoTitle;
        editForm.style.display = "block";
      }
    }
  });
  

cancelEditBtn.addEventListener("click", (e) => {
  e.preventDefault();
  editForm.style.display = "none";
});

editForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const editInputValue = editInput.value;

  if (editInputValue) {
    updateTodoOnScreen(oldInputValue, editInputValue);
    updateTodo(oldInputValue, editInputValue);
  }

  editForm.style.display = "none";
});

searchInput.addEventListener("input", performSearch);

filterSelect.addEventListener("change", () => {
  const filterType = filterSelect.value;
  filterTodos(filterType);
});
