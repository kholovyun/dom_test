import dotenv from "dotenv"
import * as mysql from 'mysql2';
dotenv.config()

export default class MySqlDB {
    public client: any
    constructor() {
        this.client =  mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME

        }).promise();
    }
    public close = async(): Promise<void> => {
          await this.client.end()
    } 

    public init = async():  Promise<void> => {
        try {
            await this.client.query('CREATE DATABASE IF NOT EXISTS todos');
      
            await this.client.query('USE todos');

            await this.client.query(`
                CREATE TABLE IF NOT EXISTS categories (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    name VARCHAR(100) NOT NULL
                )
            `);
 
            await this.client.query(`
                CREATE TABLE IF NOT EXISTS list (
                id INT AUTO_INCREMENT PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                body VARCHAR(255) NOT NULL,
                category_id INT NOT NULL,
                completed BOOLEAN NOT NULL DEFAULT 0,
                FOREIGN KEY (category_id) REFERENCES categories(id)
            )
        `);
            console.log("MySQL connected");
        } catch (error) {
            console.error(error);
        }
    }
    
}

export const  mySqlDB = new MySqlDB()
