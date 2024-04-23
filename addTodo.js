import { StoreGateway } from "./storeGateway.js";
import { TodoFactory } from "./todoFactory.js";

const todosIdentifier = 'todos';
let todos = [];
let storeGateway;
let todoFactory;

function initializeData(){
    storeGateway = new StoreGateway();
    todoFactory = new TodoFactory();
    const storedValue = storeGateway.getStoreData(todosIdentifier);
    if(storedValue !== undefined){
        const restoredTodos = todoFactory.initializeTodosFromStore(storedValue);
        todos = restoredTodos;
    }
}

function submitForm(form) {
    const whoValue = form.who.value;
    const whatValue = form.what.value;
    const prioValue = form.priority.value;

    const newTodo = todoFactory.createNewTodo(whoValue, whatValue, prioValue);

    todos.push(newTodo);
    storeGateway.setStoredValue(todosIdentifier, JSON.stringify(todos));

    window.location.href = "index.html";
}

window.initializeData = initializeData;
window.submitForm = submitForm;