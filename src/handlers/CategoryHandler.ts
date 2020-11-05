import axios from 'axios';
import { API } from '../components/API';

export class CategoryHandler {
    
    public getMaxCategory = (categories :any []) => {
        const uniques = this.getOnlyUnique(categories);
        const ocurrences = this.getAllOcurrences(uniques, categories);
        return this.getMaximumOf(ocurrences);
    }

    private getOnlyUnique = (categories: any []) => {
        const unique = categories.filter(  (value , index , self) => {
            return self.indexOf(value) === index;
        })
        return unique;
    }

    private getMaximumOf(ocurrences: any[]) {
        const maximum = Math.max.apply(Math, ocurrences.map(item => item.count));
        const category = ocurrences.find(category => category.count == maximum);
        return category;
    }

    private getAllOcurrences(uniques: any[], categories: any[]) {
        const ocurrences = [];
        uniques.forEach(category => {
            const index = [];
            let idx = categories.indexOf(category);
            while (idx != -1) {
                index.push(idx);
                idx = categories.indexOf(category, idx + 1);
            }
            ocurrences.push({ category, count: index.length });
        });
        return ocurrences;
    }

    public buildCategories = async (category) => {
        try {
            const { data } = await axios.get( `${API.categories}${category}?attributes=path_from_root`);
            const { path_from_root } = data;
            return path_from_root.map( category => category.name );
            
        } catch (error) {
            console.log(error);
        }
    }    

}