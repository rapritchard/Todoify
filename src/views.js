import { getFilters } from './filters';
import { getTodos, toggleTodo, saveTodos, removeTodo } from './todos';
// renderTodos
// Args: none
// return: none

const renderTodos = () => {
  const todos = getTodos();
  const filters = getFilters();
  const todoElement = document.querySelector('#todos');

  const filteredTodos = todos.filter((todo) => {
    const searchTextMatch = todo.text.toLowerCase().includes(filters.searchText.toLowerCase());
    const hideCompleteMatch = !filters.hideCompleted || !todo.completed;

    return searchTextMatch && hideCompleteMatch;
  });

  todoElement.innerHTML = '';

  const incompleteTodos = filteredTodos.filter(todo => !todo.completed);

  todoElement.appendChild(generateSummaryDOM(incompleteTodos));
  if (filteredTodos.length > 0) {
    filteredTodos.forEach((todo) => {
      todoElement.appendChild(generateTodoDOM(todo));
    });
  } else {
    const paragraph = document.createElement('p');
    paragraph.classList.add('empty-message');
    paragraph.textContent = 'There are no todos!';
    todoElement.appendChild(paragraph);
  }
};

// generateTodoDom
// args: todo
// return: the todo element

const generateTodoDOM = (todo) => {
  const todoElement = document.createElement('label');
  const divElement = document.createElement('div');
  const textElement = document.createElement('span');
  const checkboxElement = document.createElement('input');
  const buttonElement = document.createElement('button');

  checkboxElement.setAttribute('type', 'checkbox');
  checkboxElement.checked = todo.completed;
  divElement.appendChild(checkboxElement);
  checkboxElement.addEventListener('change', () => {
    toggleTodo(todo.id);
    renderTodos();
  });

  textElement.textContent = todo.text;
  divElement.appendChild(textElement);

  // Setup container
  todoElement.classList.add('list-item');
  divElement.classList.add('list-item__container');
  todoElement.appendChild(divElement);

  buttonElement.textContent = 'Remove';
  buttonElement.classList.add('button', 'button--text');
  todoElement.appendChild(buttonElement);
  buttonElement.addEventListener('click', () => {
    removeTodo(todo.id);
    renderTodos();
  });


  return todoElement;
};

// generateSummaryDOM
// args: incompletedTodos
// return: summary element

const generateSummaryDOM = (incompleteTodos) => {
  const SummuaryMessage = document.createElement('h2');
  SummuaryMessage.classList.add('list-title');
  const plural = incompleteTodos.length === 1 ? '' : 's';
  SummuaryMessage.textContent = `You have ${incompleteTodos.length} todo${plural} left.`;


  return SummuaryMessage;
};

// exports

export { generateSummaryDOM, generateTodoDOM, renderTodos };
