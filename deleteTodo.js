import { StoreGateway } from "./storeGateway.js";
import { TodoFactory } from "./todoFactory.js";

const todosIdentifier = 'todos';
let todos = [];
let idToDelete;
let storeGateway;

function initializeData(){
    storeGateway = new StoreGateway();
    const storedValue = storeGateway.getStoreData(todosIdentifier);
    if(storedValue !== undefined){
        const todoFactory = new TodoFactory();
        const restoredTodos = todoFactory.initializeTodosFromStore(storedValue);
        todos = restoredTodos;
    }

    const searchParams = new URLSearchParams(window.location.search);

    if(searchParams.has('id') === false) {
      alert('Keine Todo-ID angegeben.');
      window.location.href = "index.html";
      return;
    }

    const todoId = searchParams.get('id');
    const numericTodoId = Number(todoId);
    if(Number.isNaN(numericTodoId)) {
      alert('Keine Zahl übergeben.');
      window.location.href = "index.html";
      return;
    }

    const resolvedTodo = todos.find(todo => todo.id === numericTodoId);
    if(resolvedTodo === undefined)
    {
      alert('Todo mit ID existiert nicht!');
      window.location.href = "index.html";
      return;
    }

    idToDelete = resolvedTodo.id;
}

function deleteTodo() {
    todos = todos.filter(element => element.id !== idToDelete);
    storeGateway.setStoredValue(todosIdentifier, JSON.stringify(todos));
    window.location.href = "index.html";
}

window.initializeData = initializeData;
window.deleteTodo = deleteTodo;