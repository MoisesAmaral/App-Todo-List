//seleção da DOM
const todoInput = document.querySelector('.todo-input')
const todoButton = document.querySelector('.todo-button')
const todoList = document.querySelector('.todo-list')
const filterOption = document.querySelector('.filter-todo')

//Eventos de escutas
document.addEventListener('DOMContentLoaded', getTodos)
//Ouvir o elemto toto-button, ou seja fica escutando para ver se o usuário vai clicar no button
todoButton.addEventListener('click', addTodo)
// faz a mesma coisa do evento acima, fica ouvindo para ver se o usuario vai clicar no botão de excluir ou marcar como lido
todoList.addEventListener('click', deleteAndCheck)
filterOption.addEventListener('click', filterTodo)

//funções
function addTodo(event){
    //previne que o elemento form, comporte da maneira antiga, ou seja nõ faç nenhuma requisição de atualizaçõ na pagina
    event.preventDefault() 
    //crio a div e adiciona a class 'todo
    const todoDiv = document.createElement('div')
    todoDiv.classList.add('todo')
    // crio o elemento 'li' adciona a class 'todo-list
    const todoLi = document.createElement('li')
    todoLi.classList.add('todo-list')
    // aqui eu capturo o que o usuario digitar
    todoLi.innerText = todoInput.value    
    // aqui eu monto a muinha li
    todoDiv.appendChild(todoLi)
    //aqui criamos o elemento button apagar ou deletar na DOM, no HTML
    const completeButton = document.createElement('button')
    completeButton.innerHTML = '<i class="fas fa-check"></i>'
    completeButton.classList.add('completed-btn')
    todoDiv.appendChild(completeButton)    
    //chamo a função que vai salvar no localStorange
    saveLocalTodos(todoInput.value)
    //aqui criamos o elemento button completo ou lido na DOM, no HTML
    const trashButton = document.createElement('button')
    trashButton.innerHTML = '<i class="fas fa-trash"></i>'
    trashButton.classList.add('trash-btn')
    todoDiv.appendChild(trashButton)
    // aqui eu monto todo elemento 
    todoList.appendChild(todoDiv)
    //aqui eu limpo o campo de digitação apos o texto ser adicionado na minha lista
    todoInput.value = ''
}

// Delete e check
//função para remover e marcar como lido as listas
function deleteAndCheck(e){    
    const item = e.target
    const todo = item.parentElement
    // se clicar no delete, será apagado
    if(item.classList[0] === 'trash-btn'){
        todo.classList.add('fall')
        //remover do local storage
        removeLocaStorage(todo)
        todo.addEventListener('transitionend', () =>{
            todo.remove()
        })        
    }
    //se clicar no completo, adicionara uma classe ao MediaElementAudioSourceNode, mudando a sua aparencia
    if(item.classList[0] === 'completed-btn'){
        todo.classList.toggle('completed')
    }
}
function filterTodo(e) {
    const todos = todoList.childNodes;
    
    todos.forEach( (todo) => {
        switch(e.target.value) {
            case 'all':
                todo.style.display = 'flex'
                break;
            case "completed":
                if(todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
            case "uncompleted":
                if(!todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;             
        }        
    })
}
function saveLocalTodos(todo){
    let todos
    if(localStorage.getItem('todos') === null){
        todos = []
    }else{
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    todos.push(todo)
    localStorage.setItem('todos', JSON.stringify(todos))
}
function getTodos(){
    let todos
    if(localStorage.getItem('todos') === null){
        todos = []
    }else{
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    todos.forEach(function(todo){        
    const todoDiv = document.createElement('div')
    todoDiv.classList.add('todo')   

    const todoLi = document.createElement('li')
    todoLi.classList.add('todo-list') 
    todoLi.innerText = todo
    todoDiv.appendChild(todoLi)

    const completeButton = document.createElement('button')
    completeButton.innerHTML = '<i class="fas fa-check"></i>'
    completeButton.classList.add('completed-btn')
    todoDiv.appendChild(completeButton)

    const trashButton = document.createElement('button')
    trashButton.innerHTML = '<i class="fas fa-trash"></i>'
    trashButton.classList.add('trash-btn')
    todoDiv.appendChild(trashButton)
    
    todoList.appendChild(todoDiv)
    })
}
function removeLocaStorage(todo){
    let todos
    if(localStorage.getItem('todos') === null){
        todos = []
    }else{
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    const todoIndex = todo.children[0].innerText
    todos.splice(todos.indexOf(todoIndex), 1)
    localStorage.setItem('todos', JSON.stringify(todos))
}