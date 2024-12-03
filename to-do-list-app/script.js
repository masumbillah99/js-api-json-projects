const todoList = document.getElementById('todos-list');
const searchBar = document.getElementById('search-bar');
const textInput = document.getElementById('todo-input');
const submitBtn = document.getElementById('submit-btn');

submitBtn.addEventListener('click', () => {
    // handling empty input
    const textInputValue = textInput.value.trim();
    if (textInputValue === "") {
        alert('Empty field! please enter a todo..');
    }

    const newListDiv = document.createElement('div');

    const h5 = document.createElement('h5');
    h5.textContent = textInputValue;

    const deleteBtn = document.createElement('button');
    deleteBtn.id = "delete-btn";
    deleteBtn.innerHTML = `<i class="fa-solid fa-trash"></i>`;

    newListDiv.appendChild(h5);
    newListDiv.appendChild(deleteBtn);

    // add the div to the todo list
    todoList.appendChild(newListDiv);

    // optionally reset the input field
    textInput.value = '';

    // add event in delete icon
    deleteBtn.addEventListener('click', () => {
        deleteToDoList(newListDiv);
    })
})

// delete todos functionality
const deleteToDoList = (todo) => {
    todo.remove();
    alert("Todo deleted successfully!");
}