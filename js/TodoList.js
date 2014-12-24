window.TodoList = (function (document, TodoStore, TodoItem) {
  'use strict';

  function TodoList(selector) {
    this.el = document.querySelector(selector);
    this._bind();
  }

  TodoList.prototype._bind = function () {
    TodoStore.addEventListener('new-todo', this._addTodo.bind(this));
  };

  TodoList.prototype._addTodo = function (todo) {
    if (!this.filter || todo[this.filter[0]] === this.filter[1]) {
      this.el.appendChild(new TodoItem(todo).el);
    }
  };

  TodoList.prototype.refresh = function () {
    var items = TodoStore.todos.map(function (todo) {
      return new TodoItem(todo);
    });

    if (this.filter) {
      items = items.filter(function (item) {
        return item._todo[this.filter[0]] === this.filter[1];
      }.bind(this));
    }

    this.el.innerHTML = '';
    items.forEach(function (item) {
      this.el.appendChild(item.el);
    }, this);
  };

  return TodoList;
})(document, window.TodoStore, window.TodoItem);
