window.TodoItem = (function (document) {
  'use strict';

  function TodoItem(todo) {
    this._todo = todo;
    this._create();
    this._bind();
    this.update();
  }

  TodoItem.prototype._create = function () {
    this.el = document.createElement('li');

    var container = document.createElement('div');
    container.className = 'view';

    this.checkbox = document.createElement('input');
    this.checkbox.className = 'toggle';
    this.checkbox.type = 'checkbox';

    this.label = document.createElement('label');

    this.destroy = document.createElement('button');
    this.destroy.className = 'destroy';

    container.appendChild(this.checkbox);
    container.appendChild(this.label);
    container.appendChild(this.destroy);

    this.el.appendChild(container);
  };

  TodoItem.prototype._bind = function () {
    this.checkbox.addEventListener('change', this._toggle.bind(this));
    this.destroy.addEventListener('click', this._delete.bind(this));
  };

  TodoItem.prototype._toggle = function () {
    this._todo.completed = this.checkbox.checked;
    this.update();
  };

  TodoItem.prototype._delete = function () {
    this.el.parentNode.removeChild(this.el);
  };

  TodoItem.prototype.update = function () {
    this.el.className = this._todo.completed ? 'completed' : '';
    this.label.innerText = this._todo.title;
  };

  return TodoItem;
})(document);
