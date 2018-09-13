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

// Summary Message -> You have 2 todos left (p element)
// Add a p for each todo above (use text value)

const incompleteTodos = todos.filter(function(todo){
    return !todo.completed
})
const SummuaryMessage = document.createElement("p")
SummuaryMessage.textContent = `You have ${incompleteTodos.length} todos left.`
document.querySelector("body").appendChild(SummuaryMessage)

todos.forEach(function(todo){
    let newP = document.createElement("p")
    newP.textContent = todo.text
    document.querySelector("body").appendChild(newP)
})
