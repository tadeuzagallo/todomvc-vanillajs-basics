window.Todo = (function () {
  'use strict';

  function Todo(title) {
    this.title = title;
    this.completed = false;
  }

  return Todo;
})();
