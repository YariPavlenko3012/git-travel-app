/**
 *service
 */
import axios from 'axios'
/**
 * const
 */
import {
    API_ADMIN_LANGUAGE_CREATE,
    API_ADMIN_LANGUAGE_LIST,
    API_MAKE_ADMIN_CITY_LANGUAGE_DELETE,
    API_MAKE_ADMIN_LANGUAGE_SHOW,
    API_MAKE_ADMIN_LANGUAGE_UPDATE,
} from "../../constants/admin/api.constant";
/**
 * utils
 */
import {QueryString} from "../../utils/Querystring";
/**
 * model
 */
import LanguageModel from "../../model/language.model";

export default class LanguageService {
    static async list(params) {
        let languageList = await axios.get(API_ADMIN_LANGUAGE_LIST, {
            params,
            paramsSerializer: params => {
                return QueryString.stringify(params)
            }
        });
    
        languageList = languageList.map(language => new LanguageModel(language))
        
        return languageList;
    }
    
    static async show(languageId) {
        return new LanguageModel(await axios.get(API_MAKE_ADMIN_LANGUAGE_SHOW(languageId)));
    }
    
    static async update(languageId, data) {
        return new LanguageModel(await axios.put(API_MAKE_ADMIN_LANGUAGE_UPDATE(languageId), data));
    }
    
    static async create(data) {
        return new LanguageModel(await axios.post(API_ADMIN_LANGUAGE_CREATE, data));
    }
    
    static async delete(languageId) {
        return await axios.delete(API_MAKE_ADMIN_CITY_LANGUAGE_DELETE(languageId));
    }
}

