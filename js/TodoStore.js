window.TodoStore = (function (Todo) {
  'use strict';
  var TodoStore = {};
  var _todos = [];
  
  TodoStore.create = function (value) {
    _todos.push(new Todo(value));
  };

  return TodoStore;
})(window.Todo);
