window.TodoList = (function (document, TodoStore, TodoItem) {
  'use strict';

  function TodoList(selector) {
    this.el = document.querySelector(selector);
    this._bind();
    this.refresh();
  }

  TodoList.prototype._bind = function () {
    var that = this;

    TodoStore.on('new', function (todo) {
      var todoItem = new TodoItem(todo);
      that._items.push(todoItem);
      if (!this.filter || todo[this.filter[0]] === this.filter[1]) {
        that.el.appendChild(todoItem.el);
      }
    }.bind(this));
  };

  TodoList.prototype.refresh = function () {
    var items = this._items = TodoStore.todos.map(function (todo) {
      return new TodoItem(todo);
    });

    if (this.filter) {
      var key = this.filter[0];
      var value = this.filter[1];
      items = items.filter(function (item) {
        return item._todo[key] === value;
      });
    }

    this.el.innerHTML = '';

    items.forEach(function (item) {
      this.el.appendChild(item.el);
    }.bind(this));
  };

  return TodoList;

})(document, window.TodoStore, window.TodoItem);
