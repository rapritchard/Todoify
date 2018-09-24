'use strict'

// Fetch existing todos from localStorage
const getTodos = () => {
    const todoJSON = localStorage.getItem("todos")

    try{
        return todoJSON ? JSON.parse(todoJSON) : []
    }catch(e){
        return []
    }
}

// Save todos to localStorage
const saveTodos = (todos) => {
    localStorage.setItem("todos", JSON.stringify(todos))
}

// Render application todos based on current filters
const renderTodos = (todos, filter) => {
    const filteredTodos = todos.filter((todo) => {
        const searchTextMatch = todo.text.toLowerCase().includes(filter.searchText.toLowerCase())
        const hideCompleteMatch = !filter.hideCompleted || !todo.completed
        
        return searchTextMatch && hideCompleteMatch
    })

    document.querySelector("#todos").innerHTML = ""

    const incompleteTodos = filteredTodos.filter((todo) => !todo.completed)

    document.querySelector("#todos").appendChild(generateSummaryDOM(incompleteTodos))

    filteredTodos.forEach((todo) => {
        document.querySelector("#todos").appendChild(generateTodoDOM(todo))
    })

}

// Remove a todo from the list
const removeTodo = (id) => {
    const todoID = todos.findIndex((todo) => todo.id === id)

    if(todoID > -1){
        todos.splice(todoID, 1)
    }
}

// Update a todo as completed
const completeTodo = (id) => { 
    const todo = todos.find((todo) => todo.id === id)
    
    if(todo){
        todo.completed = !todo.completed
    }
}

// Get the DOM elements for a todo
const generateTodoDOM = (todo) => {
    const todoElement = document.createElement("div")
    const textElement = document.createElement("span")
    const checkboxElement = document.createElement("input")
    const buttonElement = document.createElement("button")

    checkboxElement.setAttribute("type", "checkbox")
    checkboxElement.checked = todo.completed
    checkboxElement.addEventListener("change", (e) => {
        completeTodo(todo.id)
        saveTodos(todos)
        renderTodos(todos, filters)
    })
    todoElement.appendChild(checkboxElement)

    textElement.textContent = todo.text
    todoElement.appendChild(textElement)

    buttonElement.textContent = "X"
    buttonElement.addEventListener("click", (e) => {
        removeTodo(todo.id)
        saveTodos(todos)
        renderTodos(todos, filters)
    })
    todoElement.appendChild(buttonElement)

    return todoElement
}

// Get the DOM elements for list summary
const generateSummaryDOM = (incompleteTodos) => {
    const SummuaryMessage = document.createElement("h2")
    SummuaryMessage.textContent = `You have ${incompleteTodos.length} todos left.`
    return SummuaryMessage
}