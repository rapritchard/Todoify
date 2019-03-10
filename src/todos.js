import uuidv4 from 'uuid/v4';

let todos = [];
// loadTodos
// Args: none
// Return: none
const loadTodos = () => {
  const todoJSON = localStorage.getItem('todos');

  try {
    todos = todoJSON ? JSON.parse(todoJSON) : [];
  } catch (e) {
    todos = [];
  }
};

// saveTodos
// Args: none
// Return: none
const saveTodos = () => {
  localStorage.setItem('todos', JSON.stringify(todos));
};

// getTodos
// Args: none
// return: none
const getTodos = () => todos;

// createTodo
// args: todo text
// return none
const createTodo = (todoText) => {
  if (todoText.length > 0) {
    todos.push({
      id: uuidv4(),
      text: todoText,
      completed: false,
    });
    saveTodos(todos);
  }
};

// removeTodo
// args: id of todo
// return: none
const removeTodo = (id) => {
  const todoID = todos.findIndex(todo => todo.id === id);

  if (todoID > -1) {
    todos.splice(todoID, 1);
    saveTodos(todos);
  }
};

// toggleTodo
// args: id of todo
// return: none
const toggleTodo = (id) => {
  const todo = todos.find(todo => todo.id === id);

  if (todo) {
    todo.completed = !todo.completed;
    saveTodos();
  }
};

// call loadTodos and export
todos = loadTodos();

export {
  loadTodos, getTodos, saveTodos, removeTodo, toggleTodo, createTodo
};
