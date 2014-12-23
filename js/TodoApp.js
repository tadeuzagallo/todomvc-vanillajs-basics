(function (window, TodoInput, TodoList, TodoStats) {
  'use strict';

  new TodoInput('#new-todo');
  var todoList = new TodoList('#todo-list');
  new TodoStats('#todo-count');

  function hashchange() {
    switch (window.location.hash) {
      case '#/active':
        todoList.filter = ['completed', false];
        break;
      case '#/completed':
        todoList.filter = ['completed', true];
        break;
      default:
        todoList.filter = false;
    }


    var prevSelected = document.querySelector('.selected');
    if (prevSelected) {
      prevSelected.className = '';
    }

    var selected = document.querySelector('a[href="' + window.location.hash +'"]');
    if (selected) {
      selected.className = 'selected';
    }

    todoList.refresh();
  }
  window.addEventListener('hashchange', hashchange);
  hashchange();
})(window, window.TodoInput, window.TodoList, window.TodoStats);
