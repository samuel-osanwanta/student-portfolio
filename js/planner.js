// Academic planner: add, complete and delete tasks
const KEY = "portfolio-tasks";
const form = document.getElementById("task-form");
const input = document.getElementById("task-input");
const dateInput = document.getElementById("task-date");
const errorBox = document.getElementById("task-error");
const list = document.getElementById("task-list");
const countBox = document.getElementById("task-count");
const emptyBox = document.getElementById("task-empty");
const sound = document.getElementById("done-sound");

let tasks = loadTasks();

function loadTasks() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || [];
  } catch (e) {
    return [];
  }
}

function saveTasks() {
  try {
    localStorage.setItem(KEY, JSON.stringify(tasks));
  } catch (e) {}
}

function render() {
  list.innerHTML = "";
  tasks.forEach(function (task) {
    const li = document.createElement("li");
    if (task.done) li.classList.add("done");

    const box = document.createElement("input");
    box.type = "checkbox";
    box.checked = task.done;
    box.dataset.action = "toggle";
    box.dataset.id = task.id;
    box.setAttribute("aria-label", "Mark “" + task.text + "” as completed");

    const text = document.createElement("span");
    text.className = "t-text";
    text.textContent = task.text;

    li.append(box, text);

    if (task.due) {
      const due = document.createElement("span");
      due.className = "t-date";
      due.textContent = "Due " + task.due;
      li.append(due);
    }

    const del = document.createElement("button");
    del.className = "del";
    del.type = "button";
    del.textContent = "Delete";
    del.dataset.action = "delete";
    del.dataset.id = task.id;
    li.append(del);

    list.append(li);
  });

  const done = tasks.filter(function (t) { return t.done; }).length;
  countBox.textContent = tasks.length ? done + " of " + tasks.length + " tasks completed" : "";
  emptyBox.hidden = tasks.length > 0;
}

function addTask(text, due) {
  tasks.push({ id: Date.now(), text: text, due: due, done: false });
  saveTasks();
  render();
}

function toggleTask(id) {
  tasks.forEach(function (t) {
    if (t.id === id) {
      t.done = !t.done;
      if (t.done && sound) {
        sound.currentTime = 0;
        sound.play().catch(function () {});
      }
    }
  });
  saveTasks();
  render();
}

function deleteTask(id) {
  tasks = tasks.filter(function (t) { return t.id !== id; });
  saveTasks();
  render();
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const text = input.value.trim();
  if (text === "") {
    errorBox.textContent = "Enter a task before adding it.";
    input.classList.add("invalid");
    input.focus();
    return;
  }
  errorBox.textContent = "";
  input.classList.remove("invalid");
  addTask(text, dateInput.value);
  form.reset();
  input.focus();
});

list.addEventListener("click", function (e) {
  const target = e.target;
  if (target.dataset.action === "delete") deleteTask(Number(target.dataset.id));
});

list.addEventListener("change", function (e) {
  if (e.target.dataset.action === "toggle") toggleTask(Number(e.target.dataset.id));
});

render();
