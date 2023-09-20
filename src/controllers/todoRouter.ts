import express, { Router, Response, Request } from "express";
import TodoService, { todoService } from "../repositories/todos/todos";



export class TodoRouter {
    router : Router
    service: TodoService

    constructor(){
        this.router = express.Router()
        this.service = todoService
        this.router.get('/', this.getAllTasks)
        this.router.post('/', this.createNewTask)
        this.router.get('/:id', this.getTaskBtId)
        this.router.delete('/:id', this.deleteTaskBtId)
        this.router.put('/:id', this.updateTaskBtId)
    }
    
    getRouter =() => {
        return this.router
    }

    getAllTasks = async(req: Request, res: Response):Promise<void> => {
        const resp = await this.service.getTodos()
        res.send(resp)
    }
    createNewTask = async(req: Request, res: Response):Promise<void> => {
        const data = req.body
        console.log(data)
        const resp = await this.service.createTodo(data.title, data.body, data.category_id)
        res.send(resp)
    }
    getTaskBtId = async(req: Request, res: Response):Promise<void> => {
        const id = req.params.id
        const resp = await this.service.getTodoById(parseInt(id))
        res.send(resp)
    }
    deleteTaskBtId = async(req: Request, res: Response):Promise<void> => {
        const id = req.params.id
        const resp = await this.service.deleteTodoById(parseInt(id))
        res.send(resp)
    }
    updateTaskBtId = async(req: Request, res: Response):Promise<void> => {
        const id = req.params.id
        const data = req.body
        const resp = await this.service.updateTodoById(parseInt(id), data)
        res.send(resp)
    }
  
}



export const todoRouter = new TodoRouter()
