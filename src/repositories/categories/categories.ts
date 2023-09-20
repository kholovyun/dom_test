import dotenv from "dotenv"
import { mySqlDB } from "../mySqlDB";
dotenv.config()

export default class CategoriesService {
    private client: any
    constructor() {
        this.client = mySqlDB.client
    }
    public getCategories = async(): Promise<any> => {
        try {
            const categories = await this.client.query(
                'SELECT * FROM `categories`'
              );
            const result = categories[0]
            return result
        } catch (error) {
            console.log(error)
        }
    }
    public getCategoryById = async(id: any): Promise<any> => {
        try {
            const category = await this.client.query(
                'SELECT * FROM `list` WHERE id = ?', [id]
              );
              return category[0]
        } catch (error) {
            console.log(error)
        }
    }
    public createCategory = async(name: string): Promise<any> => {
        try {
            const category = this.client.query(
                `INSERT INTO categories (name) VALUES (?)`, [name]
              );
            return category
        } catch (error) {
            console.log(error)
        }
    }
    
}

export const  categoryService = new CategoriesService()
