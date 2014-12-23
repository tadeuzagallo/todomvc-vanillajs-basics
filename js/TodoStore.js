window.TodoStore = (function (Todo) {
  'use strict';

  var TodoStore = {};

  var _todos = [];
  var _events = {};
  
  TodoStore.create = function (value) {
    var newTodo = new Todo(value);
    _todos.push(newTodo);
    this.emmit('new', newTodo);
  };

  TodoStore.on = function (event, callback) {
    if (typeof _events[event] === 'undefined') {
      _events[event] = [];
    }

    _events[event].push(callback);
  };

  TodoStore.off = function (event, callback) {
    if (callback) {
      var callbacks = _events[event];
      if (callbacks) {
        for (var i = 0, l = callbacks.length; i < l; i++) {
          if (callbacks[i] === callback) {
            callbacks[i].splice(i, 1);
            l--;
          }
        }
      }
    } else {
      _events[event] = undefined;
    }
  };

  TodoStore.emmit = function (event, data) {
    var callbacks = _events[event];

    if (callbacks) {
      callbacks.forEach(function (callback) {
        callback(data);
      });
    }
  };

  return TodoStore;
})(window.Todo, window.TodoList);
