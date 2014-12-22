window.TodoInput = (function (document, TodoStore) {
  'use strict';

  function TodoInput(selector) {
    this.el = document.querySelector(selector);
    this._bind();
  }

  TodoInput.prototype._bind = function () {
    this.el.addEventListener('keydown', this._keydown);
  };

  TodoInput.prototype._keydown = function (event) {
    if (event.keyCode === 13) {
      TodoStore.create(event.target.value.trim());
      event.target.value = '';
    }
  };

  return TodoInput;
})(document, window.TodoStore);
