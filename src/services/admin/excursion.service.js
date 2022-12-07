/**
 *service
 */
import axios from 'axios'
/**
 * const
 */
import {
    ADMIN_EXCURSION_CREATE, ADMIN_EXCURSION_LIST, ADMIN_EXCURSION_MAKE_NEAR_ROADS_PLACE
} from "../../constants/admin/api.constant";
import {QueryString} from "../../utils/Querystring";


export default class ExcursionService {
    static async create(data) {
        return await axios.post(ADMIN_EXCURSION_CREATE, data);
    }

    static async list() {
        return await axios.get(ADMIN_EXCURSION_LIST);
    }

    static async nearRoadsPlace(excursionId, itemId, params) {
        return await axios.get(ADMIN_EXCURSION_MAKE_NEAR_ROADS_PLACE(excursionId, itemId), {
            params,
            paramsSerializer: params => {
                return QueryString.stringify(params)
            }
        })
    }
}

