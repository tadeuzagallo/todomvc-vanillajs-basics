window.TodoStore = (function (Todo) {
  'use strict';

  var TodoStore = {};

  TodoStore.events = {};

  var todos = localStorage.getItem('todos');
  if (todos) {
    TodoStore.todos = JSON.parse(todos);
  } else {
    TodoStore.todos = [];
  }

  TodoStore.create = function (title) {
    var newTodo = new Todo(title);
    this.todos.push(newTodo);
    this.emmitEvent('new-todo', newTodo);
    this.emmitEvent('change-all');
  };

  TodoStore.addEventListener = function(event, callback) {
    if (typeof this.events[event] === 'undefined') {
      this.events[event] = [];
    }

    this.events[event].push(callback);
  };

  TodoStore.emmitEvent = function (event) {
    var callbacks = this.events[event];
    var args = [].slice.call(arguments, 1);

    if (callbacks) {
      callbacks.forEach(function (callback) {
        callback.apply(null, args);
      });
    }
  };

  TodoStore.destroy = function (todo) {
    var index = this.todos.indexOf(todo);
    if (index > -1) {
      this.todos.splice(index, 1);
    }

    this.emmitEvent('change-all');
  };

  TodoStore.activeTodos = function () {
    return this.todos.filter(function (todo) {
      return !todo.completed;
    });
  };

  TodoStore.save = function () {
    localStorage.setItem('todos', JSON.stringify(TodoStore.todos));
  };

  TodoStore.clear = function () {
    this.todos = this.activeTodos();
    this.emmitEvent('change-all');
  };

  TodoStore.addEventListener('change-all', TodoStore.save);

  return TodoStore;
})(window.Todo);
