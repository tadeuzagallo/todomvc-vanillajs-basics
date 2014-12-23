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
    this.item = document.createTextNode('');
    var suffix = document.createTextNode('left');

    this.el.appendChild(this.count);
    this.el.appendChild(this.item);
    this.el.appendChild(suffix);
  };

  TodoStats.prototype._bind = function () {
    TodoStore.on('changeAll', this.update.bind(this));
  };

  TodoStats.prototype.update = function () {
    var count = TodoStore.activeTodos().length;
    this.count.innerText = count;
    this.item.textContent = count === 1 ? ' item ' : ' items '; 
  };

  return TodoStats;
})(document, window.TodoStore);
