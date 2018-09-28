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

    let text = e.target.elements.todoName.value.trim()
    if(text.length > 0){
        todos.push({
            id: uuidv4(),
            text,
            completed: false
        })
    
        saveTodos(todos)
        renderTodos(todos, filters)
        
        e.target.elements.todoName.value = ""
    }else{
        e.target.elements.todoName.value = ""
    }

})

document.querySelector("#todo-checkbox").addEventListener("change", (e) => {
    filters.hideCompleted = e.target.checked
    renderTodos(todos, filters)
})