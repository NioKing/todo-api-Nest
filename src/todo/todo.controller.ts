import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Todo } from './todo.interface';
import { TodoService } from './todo.service';

@Controller('todos')
export class TodoController {

    constructor(private todoService: TodoService) { }


    // Get Todos
    @Get()
    async getTodo(): Promise<Todo[]> {
        const todos = await this.todoService.getTodos();
        return todos;
    }

    // Get Todo By Id
    @Get(':id')
    async getTodoById(
        @Param('id') id: string
    ): Promise<Todo> {
        const todo = await this.todoService.getTodoById(id);
        return todo;
    }

    // Create Todo
    @Post()
    async createTodo(
        @Body() body: Todo
    ): Promise<Todo[]> {
        const todos = await this.todoService.createTodo(body);
        return todos;
    }

    // Delete Todo
    @Delete(':id')
    async deleteTodo(
        @Param('id') id: string
    ): Promise<string> {
        const todo = await this.todoService.deleteTodo(id)
        return todo;
    }

    // Update Todo
    @Patch(':id')
    async updateTodo(
        @Param('id') id: string,
        @Body() body: Todo
    ): Promise<Todo> {
        const todo = await this.todoService.updateTodo(id, body)
        return todo;
    }
}
