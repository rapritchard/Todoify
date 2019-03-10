import { renderTodos } from './views';
import { setFilters } from './filters';
import { createTodo } from './todos';

// Render Todos
renderTodos();
// Set up search text handler
document.querySelector('#filter-todo').addEventListener('input', (e) => {
  setFilters({ searchText: e.target.value });
  renderTodos();
});

// Set up Checkbox Handler
document.querySelector('#todo-checkbox').addEventListener('change', (e) => {
  setFilters({ hideCompleted: e.target.checked });
  renderTodos();
});

// Set up form submission handler
document.querySelector('#todo-form').addEventListener('submit', (e) => {
  e.preventDefault();

  const text = e.target.elements.todoName.value.trim();
  if (text.length > 0) {
    createTodo(text);
    renderTodos();

    e.target.elements.todoName.value = '';
  } else {
    e.target.elements.todoName.value = '';
  }
});

// add a watcher for local storage
window.addEventListener('storage', (e) => {
  if (e.key === 'todos') {
    renderTodos();
  }
});
