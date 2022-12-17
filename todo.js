let todoItems = []
const todoInput = document.querySelector('.wrapper_input')
const completedTodosDiv = document.querySelector('.wrapper__todos_completed')
const uncompletedTodosDiv = document.querySelector('.wrapper__todos_uncompleted')
const audio = new Audio('sound.mp3')
console.log('qq')
window.onload = () => {
    let storageTodoItems = localStorage.getItem('todoItems')
    if(storageTodoItems !== null){
        todoItems = JSON.parse(storageTodoItems)
    }
    render()
}
todoInput.onkeyup=((e) => {
    let value = e.target.value.replace(/^\s+/,"")
    if(value && e.keyCode === 13){
        addTodo(value)
        todoInput.value = ''
        todoInput.focus()
    }
})
function addTodo(text){
    todoItems.push({
        id: Date.now(),
        text,
        completed: false
    })
    saveAndRender()
    console.log(todoItems)
}
function removeTodo(id){
    todoItems = todoItems.filter(todo => todo.id !== Number(id))
    saveAndRender()
}
function markAsCompleted(id){
    todoItems = todoItems.filter(todo => {
        if(todo.id === Number(id)){
            todo.completed = true
        }
        return todo
    })
    audio.play()
    saveAndRender()
}
function markAsUncompleted(id){
    
    todoItems = todoItems.filter(todo => {
        if(todo.id === Number(id)){
            todo.completed = false
        }
        return todo
    })
    saveAndRender()
}
function save(){
    localStorage.setItem('todoItems', JSON.stringify(todoItems))
}
function render(){
    let unCompletedTodos = todoItems.filter(item => !item.completed)
    let completedTodos = todoItems.filter(item => item.completed)
    completedTodosDiv.innerHTML = ''
    uncompletedTodosDiv.innerHTML = ''
    if(unCompletedTodos.length > 0){
        unCompletedTodos.forEach(todo => {
            uncompletedTodosDiv.append(createTodoElement(todo))
        })
    }else{
        uncompletedTodosDiv.innerHTML = `<div class='empty'>No uncompleted mission</div>`
    }
    if(completedTodos.length > 0 ){
        completedTodosDiv.innerHTML = `<div class='completed__title'>Completed (${completedTodos.length}/${todoItems.length})</div>`
        
        completedTodos.forEach(todo => {
            completedTodosDiv.append(createTodoElement(todo))
        })
    }
}
function saveAndRender(){
    save()
    render()
}

function createTodoElement(todo){
    const todoDiv = document.createElement('div')
    todoDiv.setAttribute('data-id', todo.id)
    todoDiv.className = 'todo-item'


    const todoTextSpan = document.createElement('span')
    todoTextSpan.innerHTML = todo.text

    const todoInputCheckbox = document.createElement('input')
    todoInputCheckbox.type = 'checkbox'
    todoInputCheckbox.checked = todo.completed
    todoInputCheckbox.onclick = (e) => {
        let id = e.target.closest('.todo-item').dataset.id
        e.target.checked ? markAsCompleted(id) : markAsUncompleted(id)
    }

const todoRemoveBtn = document.createElement('a')
todoRemoveBtn.href = '#'
todoRemoveBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
<path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
</svg>`
todoRemoveBtn.onclick = (e) => {
    let id = e.target.closest('.todo-item').dataset.id
    removeTodo(id)
}
    todoTextSpan.prepend(todoInputCheckbox)
    todoDiv.appendChild(todoTextSpan)
    todoDiv.appendChild(todoRemoveBtn)
    return todoDiv

}