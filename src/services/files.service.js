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
export default class FilesService {
    static async upload(data) {
        return await axios.post("/v1/upload/files", data)
    }
}

