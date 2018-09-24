'use strict'

const todos = getTodos()

const filters = {
    searchText: "",
    hideCompleted: false
}

renderTodos(todos, filters)

// Filter todos
document.querySelector("#filter-todo").addEventListener("input", (e) => {
    filters.searchText = e.target.value
    renderTodos(todos, filters)
})

document.querySelector("#todo-form").addEventListener("submit", (e) => {
    e.preventDefault()

    todos.push({
        id: uuidv4(),
        text: e.target.elements.todoName.value,
        completed: false
    })

    saveTodos(todos)
    renderTodos(todos, filters)
    
    e.target.elements.todoName.value = ""
})

document.querySelector("#todo-checkbox").addEventListener("change", (e) => {
    filters.hideCompleted = e.target.checked
    renderTodos(todos, filters)
})