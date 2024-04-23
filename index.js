import {Todo} from "./todo.js"

function initializeData(){
 let todo = new Todo(1, "Hans", "Info Hausaufgaben", 2);
 alert(todo.who + ' - ' + todo.what);
}