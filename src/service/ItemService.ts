import HttpRequestError from "../errors/HttpRequestError";
import { CategoryHandler } from '../handlers/CategoryHandler'
import { API } from "../components/API";
import { Attribute } from "../constants/Attibutes";
import { DescriptionHandler } from "../handlers/DescriptionHandler";
import axios from 'axios';

export class ItemService {

    private attributes = [ "id","title","price","condition","pictures","free_shipping","category_id"];
    private categoryHandler: CategoryHandler;
    private descriptionHandler: DescriptionHandler;

    constructor() {
        this.categoryHandler = new CategoryHandler();
        this.descriptionHandler = new DescriptionHandler();
    }

    public getItems = async (q:string) => {
        let results:any = {
            author: {},
            items: [],
            categories: []
        }
        
        try {
            const { data:items } = await axios.get(`${API.search }${q}`);
            const ids = items.results.map( item => item.id);
            
            //Categorias
            const categories = items.results.map( item => item.category_id);
            const { category } = this.categoryHandler.getMaxCategory(categories);
            results.categories = await this.categoryHandler.buildCategories(category);

            //Items filtrados por atributos
            const idx = ids.slice(0, 4);
            const uri = `${API.filters }${idx.toString()}&attributes=${ this.attributes.toString()}`
            const { data } = await axios.get(uri);

            results.items = data.map( items => items.body );
            results.author = this.sign(); 
            
        } catch (error) {
            throw new HttpRequestError(error.data);
        }
        return results;
    }
    
    public getItemById = async (id:string) => {
        let results:any = {
            author: {},
            item: {},
            categories: []
        }

        try {
            const itemAtributes = Attribute.getItemAttributes();
            const { data } = await axios.get(`${API.detail}${id}?attributes=${itemAtributes.toString()}`);
            results.item = data;

            results.item.description = await this.descriptionHandler.getDescription(id);
            results.categories = await this.categoryHandler.buildCategories(results.item.category_id);

            results.author = this.sign();
        } catch (error) {
            console.log(error)
            throw new Error(error.data)
        }
        return results;
    }
    private sign = () =>  { return {name: "Marcos", lastname: "Barroso"  }  } 
}

