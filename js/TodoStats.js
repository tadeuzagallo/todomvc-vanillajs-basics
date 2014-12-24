window.TodoStats = (function (document, TodoStore) {
  'use strict';

  function TodoStats(selector) {
    this.el = document.querySelector(selector);
    this._create();
    this._bind();
    this.update();
  }

  TodoStats.prototype._create = function () {
    this.count = document.createElement('strong');
    this.items = document.createTextNode('');

    var suffix = document.createTextNode('left');

    this.el.appendChild(this.count);
    this.el.appendChild(this.items);
    this.el.appendChild(suffix);
  };

  TodoStats.prototype._bind = function () {
    TodoStore.addEventListener('change-all', this.update.bind(this));
  };

  TodoStats.prototype.update = function () {
    var count = TodoStore.activeTodos().length;

    this.count.innerText = count;
    this.items.textContent = count === 1 ? ' item ' : ' items ';
  };

  return TodoStats;
})(document, window.TodoStore);
