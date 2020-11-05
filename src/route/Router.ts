import { ItemController } from '../controller/ItemController'
export class Router {

    private routes: any;
    private itemController:ItemController;

    constructor(){
        this.itemController = new ItemController();
    }

    public init(express: any) {
        this.routes = express.Router();

        this.routes.route('/items')
        .get(this.itemController.getItems);

        this.routes.route('/items/:id')
        .get(this.itemController.getItemById)
    }

    public getRoutes(){
        return this.routes;
    }

}

