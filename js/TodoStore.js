window.TodoStore = (function (Todo) {
  'use strict';

  var TodoStore = {};

  
  TodoStore.events = {};

  var savedItems = localStorage.getItem('todos');
  if (savedItems) {
    TodoStore.todos = JSON.parse(savedItems);
  } else {
    TodoStore.todos = [];
  }

  TodoStore.create = function (value) {
    var newTodo = new Todo(value);
    this.todos.push(newTodo);
    this.emmit('new', newTodo);
    this.emmit('changeAll');
  };

  TodoStore.destroy = function (todo) {
    this.todos.splice(
      this.todos.indexOf(todo),
      1
    );

    this.emmit('changeAll');
  };

  TodoStore.save = function () {
    localStorage.setItem('todos', JSON.stringify(this.todos));
  };

  TodoStore.activeTodos = function () {
    return this.todos.filter(function (todo) {
      return !todo.completed;
    });
  };

  TodoStore.on = function (event, callback) {
    if (typeof this.events[event] === 'undefined') {
      this.events[event] = [];
    }

    this.events[event].push(callback);
  };

  TodoStore.off = function (event, callback) {
    if (callback) {
      var callbacks = this.events[event];
      if (callbacks) {
        for (var i = 0, l = callbacks.length; i < l; i++) {
          if (callbacks[i] === callback) {
            callbacks[i].splice(i, 1);
            l--;
          }
        }
      }
    } else {
      this.events[event] = undefined;
    }
  };

  TodoStore.emmit = function (event, data) {
    var callbacks = this.events[event];

    if (callbacks) {
      callbacks.forEach(function (callback) {
        callback(data);
      });
    }
  };

  TodoStore.on('changeAll', TodoStore.save.bind(TodoStore));

  return TodoStore;
})(window.Todo, window.TodoList);
