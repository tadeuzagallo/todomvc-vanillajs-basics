window.TodoList = (function (document, TodoStore, TodoItem) {
  'use strict';

  function TodoList(selector) {
    this.el = document.querySelector(selector);
    this._items = [];
    this._bind();
  }

  TodoList.prototype._bind = function () {
    var that = this;

    TodoStore.on('new', function (todo) {
      var todoItem = new TodoItem(todo);
      that._items.push(todoItem);
      that.el.appendChild(todoItem.el);
    });
  };

  return TodoList;

})(document, window.TodoStore, window.TodoItem);
