window.Todo = (function () {
  'use strict';

  function Todo(value) {
    this.value = value;
    this.completed = false;
  }

  return Todo;
})();
