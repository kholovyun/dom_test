import express, { Express } from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import { mySqlDB } from "./repositories/mySqlDB";
import { TodoRouter } from "./controllers/todoRouter";
import { CategoriesRouter } from "./controllers/categoriesRouter";

dotenv.config()

class App {
    private app: Express
    constructor(){
        this.app = express()
        this.app.use(express.json())
        this.app.use(express.static('public'))
        this.app.use(cors())
    }

    public init = async(): Promise<void> => {
        try{
            this.app.listen(process.env.APP_PORT, 
                () => console.log(`Server is runnig on port: ${process.env.APP_PORT}`))
            await mySqlDB.init()

            this.app.use('/tasks', new TodoRouter().getRouter())
            this.app.use('/categories', new CategoriesRouter().getRouter())

            process.on('exit', () => {
                mySqlDB.close()
            })
        } catch(err: unknown){
            console.log(err);
        }
    }
}

const app = new App()

app.init()