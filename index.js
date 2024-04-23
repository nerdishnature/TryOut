import { StoreGateway } from "./storeGateway.js";
import { TodoFactory } from "./todoFactory.js";

const todosIdentifier = 'todos';
let todos = [];

function initializeData(){
    const storeGateway = new StoreGateway();
    const storedValue = storeGateway.getStoreData(todosIdentifier);
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
        todoCollectionRef.innerHTML = '<tr><td colspan="5">Keine Aufgaben zum Erledigen</td></tr>';
    }
}

function createTodo(){
    const todoFactory = new TodoFactory();
    const storeGateway = new StoreGateway();

    const newTodo = todoFactory.addNewTodo('Tom', 'Hausaufgaben', 1);
    todos.push(newTodo);
    
    storeGateway.setStoredValue(todosIdentifier, JSON.stringify(todos));
    updateView();
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
    singleLine += '</td><td>';
    singleLine += '<a href="./deleteTodo.html?id=' + element.id + '">-</a>';
    singleLine += '</td>'
    singleLine += '</tr>';
    return singleLine;
}

function getPriorityRepresentation(priority) {
    switch(priority) {
        case "1": return 'HOCH';
        case "2": return 'MITTEL';
        case "3": return 'NIEDRIG';
        default: return '';
    }
}

window.initializeData = initializeData;
window.createTodo = createTodo;