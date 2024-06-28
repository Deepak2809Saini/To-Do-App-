

        const inputField = document.querySelector(".enter-todo");
        const enterBtn = document.querySelector(".Subbmit-btn");
        const todoList = document.querySelector(".todo-list");
        const inputPlace = document.querySelector(".result-area");

        document.addEventListener('DOMContentLoaded', () => {

            // Function to load todos from localStorage

            function loadTodos() {
                const todos = JSON.parse(localStorage.getItem('todos')) || [];
                todos.forEach(todo => {
                    createTodoItem(todo.text, todo.completed);
                });
                if (todos.length > 0) {
                    inputPlace.style.display = 'block';
                }
            }

            // Function to save todos to localStorage
            function saveTodos() {
                const todos = [];
                todoList.querySelectorAll('li').forEach(item => {
                    todos.push({
                        text: item.querySelector('span').textContent,
                        completed: item.querySelector('span').style.textDecoration === 'line-through'
                    });
                });
                localStorage.setItem('todos', JSON.stringify(todos));
            }

            // Function to create and append a new todo item
            function createTodoItem(text, completed = false) {
                const listItem = document.createElement('li');

                const todoText = document.createElement('span');
                todoText.textContent = text;
                if (completed) {
                    todoText.style.textDecoration = 'line-through';
                    listItem.style.backgroundColor = '#e6f7ff';
                }
                listItem.appendChild(todoText);

                const checkBtn = document.createElement('button');
                checkBtn.textContent = '✅';
                 

                    checkBtn.addEventListener('click', () => {
                        todoText.style.textDecoration = 'line-through';
                        listItem.style.backgroundColor = '#e6f7ff';
                    })

                   
                saveTodos();



                
                listItem.appendChild(checkBtn);

                const removeBtn = document.createElement('button');
                removeBtn.textContent = '❌';
                removeBtn.addEventListener('click', () => {
                    listItem.remove();
                    saveTodos();
                    if (todoList.children.length === 0) {
                        inputPlace.style.display = 'none';
                    }
                });
                listItem.appendChild(removeBtn);

                todoList.appendChild(listItem);
            }

            function addTodo() {
                let inputValue = inputField.value.trim();

                if (inputValue !== "") {
                    createTodoItem(inputValue);
                    saveTodos();
                    inputField.value = '';
                    inputPlace.style.display = 'block';
                } else {
                    alert("Please enter a to-do.");
                }
            }

            enterBtn.addEventListener('click', addTodo);

            inputField.addEventListener('keydown', (event) => {
                if (event.key === 'Enter') {
                    addTodo();
                }
            });

            loadTodos();
        });

