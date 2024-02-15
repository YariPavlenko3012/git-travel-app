/**
 *service
 */
import axios from 'axios'
import merge from 'deepmerge'
/**
 * const
 */
import {
    API_ADMIN_CITY_CREATE,
    API_MAKE_ADMIN_CITY_DELETE,
    API_ADMIN_CITY_LIST,
    API_MAKE_ADMIN_CITY_TAXI_CREATE,
    API_MAKE_ADMIN_CITY_SHOW,
    API_MAKE_ADMIN_CITY_EDIT,
    API_MAKE_ADMIN_CITY_TAXI_EDIT,
    API_MAKE_ADMIN_CITY_TRANSLATE_EDIT,
    API_MAKE_ADMIN_CITY_CHANGE_STATUS,
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
                return QueryString.stringify(merge.all([
                    params,
                    {
                        include: ["translation", "translations.language", "portraitImageRelation", "landscapeImageRelation", "state", "state.translation", "country", "country.translation"]
                    }
                ]))
            }
        });

        cityList.data = cityList.data.map(city => new CityModel(city));

        return cityList;
    }

    static async show(cityId, params = {}) {
        return new CityModel(await axios.get(API_MAKE_ADMIN_CITY_SHOW(cityId), {
            params,
            paramsSerializer: params => {
                return QueryString.stringify(merge.all([
                    params,
                    {
                        include: ["translation", "translations.language", "portraitImageRelation", "landscapeImageRelation", "state", "state.translation", "country", "country.translation"]
                    }
                ]))
            }
        }));
    }

    static async create(data) {
        return new CityModel(await axios.post(API_ADMIN_CITY_CREATE, data));
    }

    static async delete(cityId) {
        return await axios.delete(API_MAKE_ADMIN_CITY_DELETE(cityId))
    }

    static async update(cityId, data) {
        return new CityModel(await axios.put(API_MAKE_ADMIN_CITY_EDIT(cityId), data));
    }

    static async updateTranslate(cityId, data) {
        return await axios.put(API_MAKE_ADMIN_CITY_TRANSLATE_EDIT(cityId), data);
    }

    static async updateWorkStatus(cityId, workStatus) {
        return await axios.put(API_MAKE_ADMIN_CITY_CHANGE_STATUS(cityId), {work_status: workStatus});
    }
}

