(function (window, document, TodoInput, TodoList, TodoStats, TodoStore) {
  'use strict';

  function TodoApp() {
    this.todoInput = new TodoInput('#new-todo');
    this.todoList = new TodoList('#todo-list');
    this.todoStats = new TodoStats('#todo-count');

    this._find();
    this._bind();
    this._hashchange();
  }

  TodoApp.prototype._find = function () {
    this.clearCompleted = document.querySelector('#clear-completed');
  };

  TodoApp.prototype._bind = function () {
    window.addEventListener('hashchange', this._hashchange.bind(this));

    this.clearCompleted.addEventListener('click', this._clear.bind(this));
  };

  TodoApp.prototype._hashchange = function () {
    switch (window.location.hash) {
      case '#/active':
        this.todoList.filter = ['completed', false];
        break;
      case '#/completed':
        this.todoList.filter = ['completed', true];
        break;
      default:
        this.todoList.filter = false;
    }

    var prevSelected = document.querySelector('.selected');
    if (prevSelected) {
      prevSelected.className = '';
    }

    var selected = document.querySelector('a[href="' + window.location.hash +'"]');
    if (selected) {
      selected.className = 'selected';
    }

    this.todoList.refresh();
  };

  TodoApp.prototype._clear = function () {
    TodoStore.clearCompleted();
    this.todoList.refresh();
  };

  return new TodoApp();
})(window, document, window.TodoInput, window.TodoList, window.TodoStats, window.TodoStore);
