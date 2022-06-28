/**
 *service
 */
import axios from 'axios'
/**
 * const
 */
import {
    API_ADMIN_CITY_CREATE,
    API_MAKE_ADMIN_CITY_TRANSLATE_CREATE,
    API_ADMIN_CITY_LIST,
    API_MAKE_ADMIN_CITY_TAXI_CREATE,
    API_MAKE_ADMIN_CITY_SHOW,
    API_MAKE_ADMIN_CITY_EDIT,
    API_MAKE_ADMIN_CITY_TAXI_EDIT,
    API_MAKE_ADMIN_CITY_TRANSLATE_EDIT,
} from "../../constants/admin/api.constant";
/**
 * utils
 */
import {QueryString} from "../../utils/Querystring";
/**
 * model
 */
import CityModel from "../../model/City/city.model";

export default class CityService {
    static async list(params) {
        let cityList = await axios.get(API_ADMIN_CITY_LIST, {
            params,
            paramsSerializer: params => {
                return QueryString.stringify(params)
            }
        });
    
        cityList = cityList.map(city => new CityModel(city));
    
        return cityList;
    }
    
    static async show(cityId) {
        return new CityModel(await axios.get(API_MAKE_ADMIN_CITY_SHOW(cityId)));
    }
    
    static async create(data) {
        return new CityModel(await axios.post(API_ADMIN_CITY_CREATE, data));
    }
    
    static async update(cityId, data) {
        return new CityModel(await axios.put(API_MAKE_ADMIN_CITY_EDIT(cityId), data));
    }
    
    static async createTaxi(cityId, data) {
        return await axios.post(API_MAKE_ADMIN_CITY_TAXI_CREATE(cityId), data);
    }
    
    static async updateTaxi(cityId, cabId, data) {
        return await axios.put(API_MAKE_ADMIN_CITY_TAXI_EDIT(cityId, cabId), data);
    }
    
    static async createTranslate(cityId, data) {
        return await axios.post(API_MAKE_ADMIN_CITY_TRANSLATE_CREATE(cityId), data);
    }
    
    static async updateTranslate(countryId, translateId, data) {
        return await axios.put(API_MAKE_ADMIN_CITY_TRANSLATE_EDIT(countryId, translateId), data);
    }
}

