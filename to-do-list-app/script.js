/** 
 * add todos
    * get input
    * add event listener on submitbtn
    * add todos when submit
 * delete todos
    * add event on delete icon
    * delete that specific todo
    
 * use local storage
    * use id for each todo
    * create array objects
    * get exist local storage item or set []
    * push new data into existing array object
    * when submit save todos data (id, title, text) in local storage
    * add data in 2 ways (object, array object)
 * show data
    * get data from local storage
    * show data in ui
*/

const todoList = document.getElementById('todos-list');
const searchBar = document.getElementById('search-bar');
const textInput = document.getElementById('todo-input');
const submitBtn = document.getElementById('submit-btn');


// dom manipulation in ui function
const showTodos = () => {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];

    // clear existing items in html
    todoList.innerHTML = "";

    todos?.forEach((todo) => {
        const newListDiv = document.createElement('div');
        newListDiv.id = `todo-${todo?.id}`;

        const h5 = document.createElement('h5');
        h5.textContent = todo?.title;

        const deleteBtn = document.createElement('button');
        deleteBtn.id = `delete-btn-${todo?.id}`;
        deleteBtn.innerHTML = `<i class="fa-solid fa-trash"></i>`;

        newListDiv.appendChild(h5);
        newListDiv.appendChild(deleteBtn);
        todoList.appendChild(newListDiv);

        // add event in delete icon
        deleteBtn.addEventListener('click', () => {
            deleteToDoList(newListDiv, todo?.id);
        })
    });
}

submitBtn.addEventListener('click', () => {
    // handling empty input
    const textInputValue = textInput.value.trim();
    if (textInputValue === "") {
        alert('Empty field! please enter a todo..');
        return;
    }

    // get the next sequential id
    const newTodoId = Math.floor(10000 + Math.random() * 90000);
    const newTodo = { id: newTodoId, title: textInputValue };

    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.push(newTodo);
    localStorage.setItem("todos", JSON.stringify(todos));

    textInput.value = '';
    showTodos();
})

// delete todos functionality
const deleteToDoList = (todo, todoId) => {
    if (confirm("Want to delete this todo?")) {
        todo.remove();

        let todos = JSON.parse(localStorage.getItem('todos')) || [];
        todos = todos.filter(todo => todo.id !== todoId);
        localStorage.setItem("todos", JSON.stringify(todos));
        alert("Todo deleted successfully!");
    }
}


// show todos when the page refresh or reloads
showTodos();