import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { takeLast } from 'rxjs';
import { Todo } from './todo.interface';

@Injectable()
export class TodoService {
    todos: Todo[] = [
        {id: '1', title: "Wash a car", body: "Wash a car after shopping"},
        {id: '2', title: "Read a book", body: "Let's reed some books"},
        {id: '3', title: "Go to shop", body: "Let's buy some foods"},
        {id: '4', title: "Test todo id 4", body: "Test todo id 4"},
    ]


    // Get All Todos
    async getTodos(): Promise<Todo[]> {
        return await [...this.todos];
    }

    // Get Todo by Id
    async getTodoById(id: string): Promise<Todo> {
        const todo = await this.findTodo(id);
        
        if(!todo) {
            throw new NotFoundException();
        }

        return {...todo};
    }

    // Create Todo
    async createTodo(todo: Todo): Promise<Todo[]> {
        if(todo.title === '' || todo.body === '') {
            throw new BadRequestException();
        }

        const todoToCreate: Todo = await {
            id: new Date().getTime().toString(),
            title: todo.title,
            body: todo.body
        }
        this.todos.push(todoToCreate);

        return [...this.todos];
    }


    // Delete Todo
    async deleteTodo(id: string): Promise<string> {
        const todo = await this.findTodo(id)

        if(!todo) {
            throw new NotFoundException();
        }

        const index = await this.todos.indexOf(todo)
        this.todos.splice(index, 1)

        return `${id} was removed!`;
    }


    
    
    // Update Todo
    async updateTodo(id: string, todo: Todo): Promise<Todo> {
        if (todo.title === '' || todo.body === '') {
            throw new BadRequestException();
        }
        
        const index = await this.todos.findIndex(t => t.id === id);
        this.todos[index] = {...this.todos[index], ...todo};
        
        return { ...this.todos[index]};
    }

    // Find todo by id method
    private async findTodo(id: string): Promise<Todo> {
        const todo = await this.todos.find(t => t.id === id)
        return todo;
    }
}
