window.TodoItem = (function (document, TodoStore) {
  'use strict';

  function TodoItem(todo) {
    this._todo = todo;
    this._create();
    this._bind();
    this.update();
  }

  TodoItem.prototype._create = function () {
    this.el = document.createElement('li');
    this.el.className = 'editing';

    var container = document.createElement('div');
    container.className = 'view';

    this.checkbox = document.createElement('input');
    this.checkbox.className = 'toggle';
    this.checkbox.type = 'checkbox';

    this.label = document.createElement('label');

    this.destroy = document.createElement('button');
    this.destroy.className = 'destroy';

    this.input = document.createElement('input');
    this.input.className = 'edit';

    container.appendChild(this.checkbox);
    container.appendChild(this.label);
    container.appendChild(this.destroy);

    this.el.appendChild(container);
  };

  TodoItem.prototype._bind = function () {
    this.checkbox.addEventListener('change', this._toggle.bind(this));
    this.destroy.addEventListener('click', this._delete.bind(this));
    this.label.addEventListener('dblclick', this._edit.bind(this));
    this.input.addEventListener('blur', this._doneEditing.bind(this));
    this.input.addEventListener('keydown', this._keydown.bind(this));
  };

  TodoItem.prototype._toggle = function () {
    this._todo.completed = this.checkbox.checked;
    this.update();
    TodoStore.emmit('changeAll');
  };

  TodoItem.prototype._delete = function () {
    this.el.parentNode.removeChild(this.el);
    TodoStore.remove(this._todo);
  };

  TodoItem.prototype._edit = function () {
    this.oldClass = this.el.className;
    this.el.className = 'editing';
    this.input.value = this._todo.title;
    this.el.appendChild(this.input);
    this.input.focus();
  };

  TodoItem.prototype._doneEditing = function () {
    this._todo.title = this.input.value.trim(); 
    this.input.value = '';
    this.update();

    this.el.removeChild(this.input);
    this.el.className = this.oldClass;
  };

  TodoItem.prototype._keydown = function (event) {
    if (event.keyCode === 13) {
      this.input.blur();
    }
  };

  TodoItem.prototype.update = function () {
    this.el.className = this._todo.completed ? 'completed' : '';
    this.label.innerText = this._todo.title;
  };

  return TodoItem;
})(document, window.TodoStore);
