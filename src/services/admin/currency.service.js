/**
 *service
 */
import axios from 'axios'
/**
 * const
 */
import {
    API_ADMIN_CURRENCY_CREATE,
    API_ADMIN_CURRENCY_LIST, API_MAKE_ADMIN_CITY_CURRENCY_DELETE,
    API_MAKE_ADMIN_CURRENCY_SHOW,
    API_MAKE_ADMIN_CURRENCY_UPDATE,
} from "../../constants/admin/api.constant";
/**
 * utils
 */
import {QueryString} from "../../utils/Querystring";
/**
 * model
 */
import CurrencyModel from "../../model/currency.model";

export default class CurrencyService {
    static async list( params ) {
        let currencyList = await axios.get(API_ADMIN_CURRENCY_LIST, {
            params,
            paramsSerializer: params => {
                return QueryString.stringify(params)
            }
        });
    
        currencyList = currencyList.map( currency => new CurrencyModel(currency));
        
        return currencyList
    }
    
    static async create( data ) {
        return new CurrencyModel(await axios.post(API_ADMIN_CURRENCY_CREATE, data));
    }
    
    static async update( currencyId, data ) {
        return new CurrencyModel(await axios.put(API_MAKE_ADMIN_CURRENCY_UPDATE(currencyId), data));
    }
    
    static async show( currencyId ) {
        return new CurrencyModel(await axios.get(API_MAKE_ADMIN_CURRENCY_SHOW(currencyId)));
    }
    
    static async delete(currencyId) {
        return await axios.delete(API_MAKE_ADMIN_CITY_CURRENCY_DELETE(currencyId));
    }
}

