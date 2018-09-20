// Fetch existing todos from localStorage
const getTodos = function(){
    const todoJSON = localStorage.getItem("todos")

    if(todoJSON !== null){
        return JSON.parse(todoJSON)
    }else{
        return []
    }
}

// Save todos to localStorage
const saveTodos = function(todos){
    localStorage.setItem("todos", JSON.stringify(todos))
}

// Render application todos based on current filters
const renderTodos = function(todos, filter){
    const filteredTodos = todos.filter(function(todo){
        const searchTextMatch = todo.text.toLowerCase().includes(filter.searchText.toLowerCase())
        const hideCompleteMatch = !filter.hideCompleted || !todo.completed
        
        return searchTextMatch && hideCompleteMatch
    })

    document.querySelector("#todos").innerHTML = ""

    const incompleteTodos = filteredTodos.filter(function(todo){
        return !todo.completed
    })

    document.querySelector("#todos").appendChild(generateSummaryDOM(incompleteTodos))

    filteredTodos.forEach(function(todo){
        document.querySelector("#todos").appendChild(generateTodoDOM(todo))
    })

}

// Remove a todo from the list
const removeTodo = function(id){
    const todoID = todos.findIndex(function(todo){
        return todo.id === id
    })

    if(todoID > -1){
        todos.splice(todoID, 1)
    }
}

// Get the DOM elements for a todo
const generateTodoDOM = function(todo){
    const todoElement = document.createElement("div")
    const textElement = document.createElement("span")
    const checkboxElement = document.createElement("input")
    const buttonElement = document.createElement("button")

    checkboxElement.setAttribute("type", "checkbox")
    todoElement.appendChild(checkboxElement)

    textElement.textContent = todo.text
    todoElement.appendChild(textElement)

    buttonElement.textContent = "X"
    buttonElement.addEventListener("click", function(e){
        removeTodo(todo.id)
        saveTodos(todos)
        renderTodos(todos, filters)
    })
    todoElement.appendChild(buttonElement)

    return todoElement
}

// Get the DOM elements for list summary
const generateSummaryDOM = function(incompleteTodos){
    const SummuaryMessage = document.createElement("h2")
    SummuaryMessage.textContent = `You have ${incompleteTodos.length} todos left.`
    return SummuaryMessage
}