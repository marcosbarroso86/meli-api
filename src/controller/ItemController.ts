import {Request, Response, response} from "express";
import { ItemService } from "../service/ItemService";
import HTTPResponseHandler from "../handlers/HTTPResponseHandler";

export class ItemController {

    private itemService: ItemService;
    
    constructor() {
        this.itemService = new ItemService();
    }

    public getItems = (req: Request , res: Response ) => {
        const { q } = req.query
        this.itemService.getItems(q)
            .then( items => res.send(items))
            .catch(error => {
                console.log(error);
                HTTPResponseHandler.sendInternalError( res , error , null )
            })
    }

    public getItemById = (req: Request , res: Response) => {
        const  { id } = req.params;
     
        this.itemService.getItemById(id)
            .then( item => res.send(item))
            .catch( error => {
                console.log(error);
                HTTPResponseHandler.sendInternalError( res , error , null )
            })
    }       

   
}
