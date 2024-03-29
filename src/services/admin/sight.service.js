/**
 *service
 */
import axios from 'axios'
import merge from 'deepmerge'
/**
 * const
 */
import {
    API_ADMIN_SIGHT_CREATE, API_ADMIN_SIGHT_CREATE_BATCH,
    API_ADMIN_SIGHT_LIST,
    API_MAKE_ADMIN_SIGHT_CHANGE_STATUS,
    API_MAKE_ADMIN_SIGHT_DELETE,
    API_MAKE_ADMIN_SIGHT_GET_CITIES,
    API_MAKE_ADMIN_SIGHT_NEED_REVIEW,
    API_MAKE_ADMIN_SIGHT_SHOW,
    API_MAKE_ADMIN_SIGHT_TRANSLATE_CREATE,
    API_MAKE_ADMIN_SIGHT_TRANSLATE_EDIT,
    API_MAKE_ADMIN_SIGHT_UPDATE,
} from "../../constants/admin/api.constant";
/**
 * utils
 */
import {QueryString} from "../../utils/Querystring";
/**
 * model
 */
import SightModel from "../../model/Sight/sight.model";
import CityModel from "../../model/City/city.model";

export default class SightService {
    static async show(sightId, params = {}) {
        return new SightModel(await axios.get(API_MAKE_ADMIN_SIGHT_SHOW(sightId), {
            params,
            paramsSerializer: params => {
                return QueryString.stringify(merge.all([
                    params,
                    {
                        include: ["translation", "translations.language", "images", "city.translation", "city.state.translation", "city.state.country.translation"],
                    }
                ]))
            }
        }));
    }

    static async list(params) {
        let sightList = await axios.get(API_ADMIN_SIGHT_LIST, {
            params,
            paramsSerializer: params => {
                return QueryString.stringify(merge.all([
                    params,
                    {
                        include: ["translation", "translations.language", "images", "city.translation", "city.state.translation", "city.state.country.translation"],
                    }
                ]))
            }
        });


        sightList.data = sightList.data.map(sight => new SightModel(sight))

        return sightList;
    }

    static async create(data) {
        return new SightModel(await axios.post(API_ADMIN_SIGHT_CREATE, data));
    }

    static async createBatch(data) {
        return new SightModel(await axios.post(API_ADMIN_SIGHT_CREATE_BATCH, data));
    }

    static async update(sightId, data) {
        return new SightModel(await axios.put(API_MAKE_ADMIN_SIGHT_UPDATE(sightId), data));
    }

    static async delete(sightId) {
        return await axios.delete(API_MAKE_ADMIN_SIGHT_DELETE(sightId));
    }


    static async updateTranslate(sightId, data) {
        return await axios.put(API_MAKE_ADMIN_SIGHT_TRANSLATE_EDIT(sightId), data);
    }

    static async updateWorkStatus(sightId, workStatus) {
        return await axios.put(API_MAKE_ADMIN_SIGHT_CHANGE_STATUS(sightId), {work_status: workStatus});
    }

    static async needReview(sightId, data) {
        return await axios.put(API_MAKE_ADMIN_SIGHT_NEED_REVIEW(sightId), data);
    }

    static async getCitiesBySight(sightId, params = {}) {
        const cities = await axios.get(API_MAKE_ADMIN_SIGHT_GET_CITIES(sightId), {
            params,
            paramsSerializer: params => {
                return QueryString.stringify({
                    ...params,
                    include: ['translation']
                })
            }
        })

        return cities.data.map(city => new CityModel(city));
    }
}





