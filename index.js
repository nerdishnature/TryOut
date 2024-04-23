import { Todo } from "./todo.js";
import { StoreGateway } from "./storeGateway.js";
import { TodoFactory } from "./todoFactory.js";

let todos = [];

function initializeData(){
    const storeGateway = new StoreGateway();
    const storedValue = storeGateway.getStoreData('todos');
    if(storedValue !== undefined){
        const todoFactory = new TodoFactory();
        const restoredTodos = todoFactory.initializeTodosFromStore(storedValue);
        todos = restoredTodos;
    }

    updateView();
}

function updateView(){
    const todoCollectionRef = document.getElementById('todoCollection');
    if(todos.length > 0) {
        let wrappedInfos = '';
        todos.forEach(element => {
            wrappedInfos += generateTodoInfo(element);
        });
        todoCollectionRef.innerHTML = wrappedInfos;
    }
    else {
        todoCollectionRef.innerHTML = '<tr><td colspan="4">Keine Aufgaben zum Erledigen</td></tr>';
    }
}

function generateTodoInfo(element){
    let singleLine = '<tr>';
    singleLine += '<td>';
    singleLine += element.id;
    singleLine += '</td><td>';
    singleLine += element.who;
    singleLine += '</td><td>';
    singleLine += element.what;
    singleLine += '</td><td>';
    singleLine += getPriorityRepresentation(element.priority);
    singleLine += '</td>';
    singleLine += '</tr>';
    return singleLine;
}

window.initializeData = initializeData;