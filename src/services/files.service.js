/**
 *service
 */
import axios from 'axios'
/**
 * const
 */
import {
    API_MAKE_ACCOUNT_USER_INFO_URL,
} from "../constants/api.constant";
import {API_ADMIN_CITY_LIST} from "../constants/admin/api.constant";
import {QueryString} from "../utils/Querystring";
export default class FilesService {
    static async upload(data) {
        return await axios.post("/v1/admin/files", data)
    }

    static async uploadChunk(data) {
        return await axios.post("/v1/files/chunk", data)
    }

    static async delete(data) {
        return await axios.delete("/v1/admin/files", {
            params: data,
            paramsSerializer: params => {
                return QueryString.stringify(params)
            }
        })
    }
}

