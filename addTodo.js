import { StoreGateway } from "./storeGateway.js";
import { TodoFactory } from "./todoFactory.js";

const todosIdentifier = 'todos';
let todos = [];
let storeGateway;

function initializeData(){
    storeGateway = new StoreGateway();
    const storedValue = storeGateway.getStoreData(todosIdentifier);
    if(storedValue !== undefined){
        const todoFactory = new TodoFactory();
        const restoredTodos = todoFactory.initializeTodosFromStore(storedValue);
        todos = restoredTodos;
    }
}

function submitForm(form) {
    let whoValue = form.who.value;
    let whatValue = form.what.value;
    let prioValue = form.priority.value;

    const todoFactory = new TodoFactory();
    const newTodo = todoFactory.addNewTodo(whoValue, whatValue, prioValue);

    todos.push(newTodo);
    storeGateway.setStoredValue(todosIdentifier, JSON.stringify(todos));

    window.location.href = "index.html";
}

window.initializeData = initializeData;
window.submitForm = submitForm;