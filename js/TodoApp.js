(function (window, document, TodoInput, TodoList, TodoStats, TodoStore) {
  'use strict';

  function TodoApp() {
    this.todoInput = new TodoInput('#new-todo');
    this.todoList = new TodoList('#todo-list');
    this.todoStats = new TodoStats('#todo-count');

    this._bind();
    this._hashchange();
  }

  TodoApp.prototype._bind = function () {
    window.addEventListener('hashchange', this._hashchange.bind(this));
    document.querySelector('#clear-completed').addEventListener('click', this._clear.bind(this));
  };

  TodoApp.prototype._hashchange = function () {
    var hash = window.location.hash;

    switch (hash) {
      case '#/active':
        this.todoList.filter = ['completed', false];
        break;
      case '#/completed':
        this.todoList.filter = ['completed', true];
        break;
      default:
        hash = '#/';
        this.todoList.filter = false;
    }

    this.todoList.refresh();

    var old = document.querySelector('.selected');
    if (old) {
      old.className = '';
    }
    var selected = document.querySelector('a[href="' + hash + '"]');
    if (selected) {
      selected.className = 'selected';
    }
  };

  TodoApp.prototype._clear = function () {
    TodoStore.clear();
    this.todoList.refresh();
  };

  return new TodoApp();
})(window, document, window.TodoInput, window.TodoList, window.TodoStats, window.TodoStore);
