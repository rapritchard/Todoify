const todos = [{
    text: "Make breakfast",
    completed: true
}, {
    text: "Put the towels in the washing machine",
    completed: false
}, {
    text: "Walk the dog",
    completed: true
}, {
    text: "Run the hoover around the house",
    completed: false
}, {
    text: "Make lunch",
    completed: false
}]

// 1. Setup div to contain todos
// 2. Setup filters (searchText) and wire up a new filter input to change .
// 3. Create a renderTodos function to render and rerender the latest filtered data

const filters = {
    searchText: "",
    hideCompleted: false
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

// 1. Create a form with a single input for the todo text
// 2. setup a submit handler and cancel the default action
// 3. add a new item to the todos array with that text data (completed value of false)
// 4. rerender the list
document.querySelector("#todo-form").addEventListener("submit", function(e){
    e.preventDefault()

    todos.push({
        text: e.target.elements.todoName.value,
        completed: false
    })
    renderTodos(todos, filters)
    e.target.elements.todoName.value = ""
})

// 1. Create a checkbox and setup event listener -> "Hide completed"
// 2. Create new hideCompleted filter (default false)
// 3 Update hideCompleted and rendeer list on checkbox change
// 4. Setup renderTodos to remove completed items

document.querySelector("#todo-checkbox").addEventListener("change", function(e){
    filters.hideCompleted = e.target.checked
    renderTodos(todos, filters)
})