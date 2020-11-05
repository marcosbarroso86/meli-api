import axios from 'axios';
import { API } from '../components/API';

export class DescriptionHandler {

    public getDescription = async (id: any) => {
        const { data } = await axios.get(`${API.detail}${id}/descriptions`);
        const [ description ] = data; 
        return description && description.plain_text;
    }
}