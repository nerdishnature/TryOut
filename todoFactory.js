import { IndexProvider } from "./indexProvider";
import { Todo } from "./todo";

export class TodoFactory {
    constructor() { }

    initializeTodosFromStore(storedValue) {
        const storedTodos = JSON.parse(storedValue);
        let restoredTodos = [];
        for (let i = 0; i < storedTodos.length; i++) {
            const storedTodo = storedTodos[i];
            const todoEntry = new Todo(storedTodo.id, storedTodo.who, storedTodo.what, storedTodo.priority);
            restoredTodos.push(todoEntry);
        }

        return restoredTodos;
    }

    addNewTodo(who, what, priority){
        const indexProvider = new IndexProvider();
        const todoId = indexProvider.getNextId();

        const todo = new Todo(todoId, who, what, priority);
        return todo;
    }
}