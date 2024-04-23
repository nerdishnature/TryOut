import { IndexProvider } from "./indexProvider.js";
import { Todo } from "./todo.js";

export class TodoFactory {
    constructor() { }

    initializeTodosFromStore(storedValue) {
        let restoredTodos = [];

        const storedTodos = JSON.parse(storedValue);
        if (storedTodos !== undefined && storedTodos !== null && storedTodos !== '') {
            for (let i = 0; i < storedTodos.length; i++) {
                const storedTodo = storedTodos[i];
                const todoEntry = new Todo(storedTodo.id, storedTodo.who, storedTodo.what, storedTodo.priority, storedTodo.creationTime);
                restoredTodos.push(todoEntry);
            }
        }

        return restoredTodos;
    }

    createNewTodo(who, what, priority) {
        const indexProvider = new IndexProvider();
        const todoId = indexProvider.getNextId();
        const creationTime = Date.now;

        const todo = new Todo(todoId, who, what, priority, creationTime);
        return todo;
    }
}