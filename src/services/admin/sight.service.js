/**
 *service
 */
import axios from 'axios'
/**
 * const
 */
import {
    API_ADMIN_SIGHT_CREATE, API_ADMIN_SIGHT_CREATE_BATCH,
    API_ADMIN_SIGHT_LIST,
    API_MAKE_ADMIN_SIGHT_DELETE,
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

export default class SightService {
    static async show(sightId) {
        return new SightModel(await axios.get(API_MAKE_ADMIN_SIGHT_SHOW(sightId)));
    }

    static async list(params) {
        let sightList = await axios.get(API_ADMIN_SIGHT_LIST, {
            params,
            paramsSerializer: params => {
                return QueryString.stringify(params)
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

    static async createTranslate(sightId, data) {
        return await axios.post(API_MAKE_ADMIN_SIGHT_TRANSLATE_CREATE(sightId), data);
    }

    static async updateTranslate(sightId, translateId, data) {
        return await axios.put(API_MAKE_ADMIN_SIGHT_TRANSLATE_EDIT(sightId, translateId), data);
    }
}

