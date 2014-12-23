window.Todo = (function () {
  'use strict';

  function Todo(value) {
    this.title = value;
    this.completed = false;
  }

  return Todo;
})();
