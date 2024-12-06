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
        newListDiv.classList.add("new-list-div");

        const h5 = document.createElement('h5');
        h5.textContent = todo?.title;

        const btnDiv = document.createElement('div');

        const editBtn = document.createElement('button');
        editBtn.id = "edit-btn";
        editBtn.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`;

        const trashBtn = document.createElement('button');
        trashBtn.id = `trash-btn-${todo?.id}`;
        trashBtn.innerHTML = `<i class="fa-solid fa-trash"></i>`;

        newListDiv.appendChild(h5);
        btnDiv.appendChild(editBtn);
        btnDiv.appendChild(trashBtn);
        newListDiv.appendChild(btnDiv);
        todoList.appendChild(newListDiv);

        // edit button event handler
        editBtn.addEventListener('click', () => {
            editTodoList(newListDiv, todo?.id);
        })

        // delete button event handler
        trashBtn.addEventListener('click', () => {
            deleteToDoList(newListDiv, todo?.id);
        })
    });
}

// submit button event handler
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

// edit todo list event handler
const editTodoList = (todoDiv, todoId) => {
    console.log(todoDiv, todoId);
    const h5 = document.querySelector('h5');
    const btnDiv = document.querySelector('div');

    // store the original content & hide the existing elements
    // const orginalTitle = h5.textContent;
    h5.style.display = 'none';
    btnDiv.style.display = 'none';

    let todos = JSON.parse(localStorage.getItem('todos'));
    todos = todos?.filter((todo) => todo?.id === todoId);

    // create edit ui (input / save / cancel btn)
    const input = document.createElement('input');
    input.type = "text";
    input.value = todos[0]?.title;
    input.classList.add('edit-input');

    const saveBtn = document.createElement('button');
    const cancelBtn = document.createElement('button');
    saveBtn.textContent = "Save";
    cancelBtn.textContent = "Cancel";
    saveBtn.classList.add('save-btn');
    cancelBtn.classList.add('cancel-btn');

    todoDiv.appendChild(input);
    todoDiv.appendChild(saveBtn);
    todoDiv.appendChild(cancelBtn);

    // handle save action
    saveBtn.addEventListener("click", () => {
        const newTitle = input.value.trim();
        if (newTitle) {
            // update title in local storage
            let todos = JSON.parse(localStorage.getItem('todos')) || [];
            todos = todos?.map((todo) => todo?.id === todoId ? { ...todo, title: newTitle } : todo);
            localStorage.setItem("todos", JSON.stringify(todos));
        }

        input.remove();
        saveBtn.remove();
        cancelBtn.remove();
    })

    // handle cancel action
    cancelBtn.addEventListener("click", () => {
        h5.style.display = 'none'
        btnDiv.style.display = 'none'

        input.remove();
        saveBtn.remove();
        cancelBtn.remove();
    })
}

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