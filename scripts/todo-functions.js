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
    const todoElement = document.querySelector("#todos")
    const filteredTodos = todos.filter((todo) => {
        const searchTextMatch = todo.text.toLowerCase().includes(filter.searchText.toLowerCase())
        const hideCompleteMatch = !filter.hideCompleted || !todo.completed
        
        return searchTextMatch && hideCompleteMatch
    })

    todoElement.innerHTML = ""

    const incompleteTodos = filteredTodos.filter((todo) => !todo.completed)

    todoElement.appendChild(generateSummaryDOM(incompleteTodos))
    if(filteredTodos.length > 0){
        filteredTodos.forEach((todo) => {
            todoElement.appendChild(generateTodoDOM(todo))
        })
    }else{
        const paragraph = document.createElement("p")
        paragraph.classList.add("empty-message")
        paragraph.textContent = "There are no todos!"
        todoElement.appendChild(paragraph)
    }

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
    const todoElement = document.createElement("label")
    const divElement = document.createElement("div")
    const textElement = document.createElement("span")
    const checkboxElement = document.createElement("input")
    const buttonElement = document.createElement("button")

    checkboxElement.setAttribute("type", "checkbox")
    checkboxElement.checked = todo.completed
    divElement.appendChild(checkboxElement)
    checkboxElement.addEventListener("change", (e) => {
        completeTodo(todo.id)
        saveTodos(todos)
        renderTodos(todos, filters)
    })

    textElement.textContent = todo.text
    divElement.appendChild(textElement)

    // Setup container
    todoElement.classList.add("list-item")
    divElement.classList.add("list-item__container")
    todoElement.appendChild(divElement)

    buttonElement.textContent = "Remove"
    buttonElement.classList.add("button", "button--text")
    todoElement.appendChild(buttonElement)
    buttonElement.addEventListener("click", (e) => {
        removeTodo(todo.id)
        saveTodos(todos)
        renderTodos(todos, filters)
    })


    return todoElement
}

// Get the DOM elements for list summary
const generateSummaryDOM = (incompleteTodos) => {
    const SummuaryMessage = document.createElement("h2")
    SummuaryMessage.classList.add("list-title")
    const plural = incompleteTodos.length === 1 ? "" : "s"
    SummuaryMessage.textContent = `You have ${incompleteTodos.length} todo${plural} left.`
 

    return SummuaryMessage
}