let todos = []

const filters = {
    searchText: "",
    hideCompleted: false
}

const todoJSON = localStorage.getItem("todos")
if(todoJSON !== null){
    todos = JSON.parse(todoJSON)
}

const renderTodos = function(todos, filter){
    const filteredTodos = todos.filter(function(todo){
        // if(filter.hideCompleted){
        //     return todo.text.toLowerCase().includes(filter.searchText.toLowerCase()) && !todo.completed
        // }else{
        //     return todo.text.toLowerCase().includes(filter.searchText.toLowerCase()) 
        // } 
        const searchTextMatch = todo.text.toLowerCase().includes(filter.searchText.toLowerCase())
        const hideCompleteMatch = !filter.hideCompleted || !todo.completed

        return searchTextMatch && hideCompleteMatch
    })

    document.querySelector("#todos").innerHTML = ""

    const incompleteTodos = filteredTodos.filter(function(todo){
        return !todo.completed
    })

    const SummuaryMessage = document.createElement("h2")
    SummuaryMessage.textContent = `You have ${incompleteTodos.length} todos left.`
    document.querySelector("#todos").appendChild(SummuaryMessage)

    filteredTodos.forEach(function(todo){
        let newTodo = document.createElement("p")
        newTodo.textContent = todo.text
        document.querySelector("#todos").appendChild(newTodo)
    })

}

renderTodos(todos, filters)

// Filter todos
document.querySelector("#filter-todo").addEventListener("input", function(e){
    filters.searchText = e.target.value
    renderTodos(todos, filters)
})

document.querySelector("#todo-form").addEventListener("submit", function(e){
    e.preventDefault()

    todos.push({
        text: e.target.elements.todoName.value,
        completed: false
    })
    localStorage.setItem("todos", JSON.stringify(todos))
    renderTodos(todos, filters)
    e.target.elements.todoName.value = ""
})

document.querySelector("#todo-checkbox").addEventListener("change", function(e){
    filters.hideCompleted = e.target.checked
    renderTodos(todos, filters)
})