import dotenv from "dotenv"
import { mySqlDB } from "../mySqlDB";
dotenv.config()

export default class TodoService {
    private client: any
    constructor() {
        this.client = mySqlDB.client
    }
    public getTodos = async(): Promise<any> => {
        try {
            const todos = await this.client.query(
                'SELECT list.*, categories.name AS category_name ' +
                'FROM list ' +
                'LEFT JOIN categories ON list.category_id = categories.id'
              );
            const result = todos[0]
            return result
        } catch (error) {
            console.log(error)
        }
    }
    public getTodoById = async(id: any): Promise<any> => {
        try {
            const todo = await this.client.query(
                'SELECT * FROM `list` WHERE id = ?' , [id]
              );
              console.log(todo)
              return todo[0]
        } catch (error) {
            console.log(error)
        }
    }
    public createTodo = async(title: string, body: string, category_id: string): Promise<any> => {
        try {
            const todo = this.client.query(
                `INSERT INTO list (title, body, category_id) VALUES (?, ?, ?)`, [title, body, category_id]
              );
            return todo
        } catch (error) {
            console.log(error)
        }
    }
    public deleteTodoById = async (id: number) => {
        try {
            const result = await this.client.query('DELETE FROM `list` WHERE id = ?', [id]);
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    public updateTodoById = async(id: any, newData: any): Promise<any> => {
        try {
            await this.client.execute(
                'UPDATE list SET title = ?, category_id = ?, body = ?, completed = ? WHERE id = ?',
                [newData.title, newData.category_id, newData.body, newData.completed, id]
            );
    
            return "Success"
        } catch (error) {
            console.log(error)
        }
    }
    
}

export const  todoService = new TodoService()
