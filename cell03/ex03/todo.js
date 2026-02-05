window.onload = function () {
  loadTodos();
};

function newTodo() {
  var text = prompt("New TO DO:");
  if (!text || text.trim() === "")
    return;

  addTodo(text);
  saveTodos();
}

function addTodo(text) {
  var list = document.getElementById("ft_list");
  var div = document.createElement("div");

  div.innerHTML = text;

  div.onclick = function () {
    if (confirm("Do you want to remove this TO DO?")) {
      list.removeChild(div);
      saveTodos();
    }
  };

  // ใส่ไว้บนสุด
  list.insertBefore(div, list.firstChild);
}

function saveTodos() {
  var list = document.getElementById("ft_list");
  var todos = [];

  for (var i = 0; i < list.children.length; i++) {
    todos.push(list.children[i].innerHTML);
  }

  document.cookie = "todos=" + encodeURIComponent(JSON.stringify(todos));
}

function loadTodos() {
  var cookies = document.cookie.split("; ");

  for (var i = 0; i < cookies.length; i++) {
    var parts = cookies[i].split("=");
    if (parts[0] === "todos") {
      var todos = JSON.parse(decodeURIComponent(parts[1]));
      for (var j = 0; j < todos.length; j++) {
        addTodo(todos[j]);
      }
    }
  }
}
