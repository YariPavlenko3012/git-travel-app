/**
 *service
 */
import axios from 'axios'
/**
 * const
 */
import {
    ADMIN_EXCURSION_CREATE,
    ADMIN_EXCURSION_LIST,
    ADMIN_EXCURSION_MAKE_NEAR_ROADS_PLACE,
    ADMIN_MAKE_EXCURSION_DELETE,
    ADMIN_MAKE_EXCURSION_UPDATE,
    ADMIN_MAKE_EXCURSION_SHOW,
    API_ADMIN_COUNTRY_LIST
} from "../../constants/admin/api.constant";
import {QueryString} from "../../utils/Querystring";
import ExcursionModel from "../../model/excursion.model";
import CountryModel from "../../model/Country/country.model";


export default class ExcursionService {
    static async create(data) {
        return await axios.post(ADMIN_EXCURSION_CREATE, data);
    }
    static async update(excursionId, data) {
        return await axios.put(ADMIN_MAKE_EXCURSION_UPDATE(excursionId), data);
    }

    static async list(params) {
        let excursionList = await axios.get(ADMIN_EXCURSION_LIST, {
            params,
            paramsSerializer: params => {
                return QueryString.stringify(params)
            }
        });

        excursionList.data = excursionList.data.map( excursion => new ExcursionModel(excursion));

        return excursionList;
    }

    static async show(excursionId) {
        return new ExcursionModel(await axios.get(ADMIN_MAKE_EXCURSION_SHOW(excursionId)));
    }

    static async delete(excursionId) {
        return await axios.delete(ADMIN_MAKE_EXCURSION_DELETE(excursionId))
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

