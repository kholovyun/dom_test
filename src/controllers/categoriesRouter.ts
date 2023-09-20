import express, { Router, Response, Request } from "express";
import CategoriesService, { categoryService } from "../repositories/categories/categories";



export class CategoriesRouter {
    router : Router
    service: CategoriesService

    constructor(){
        this.router = express.Router()
        this.service = categoryService
        this.router.get('/', this.getAllCategories)
        this.router.post('/', this.createCategory)
        this.router.get('/:id', this.getCategoryBtId)
    }
    
    getRouter =() => {
        return this.router
    }

    getAllCategories= async(req: Request, res: Response):Promise<void> => {
        const resp = await this.service.getCategories()
        res.send(resp)
    }
    createCategory = async(req: Request, res: Response):Promise<void> => {
        const data = req.body
        const resp = await this.service.createCategory(data.name)
        res.send(resp)
    }
    getCategoryBtId = async(req: Request, res: Response):Promise<void> => {
        const id = req.params.id
        const resp = await this.service.getCategoryById(parseInt(id))
        res.send(resp)
    }
}



export const categoriesRouter = new CategoriesRouter()
