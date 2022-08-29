/**
 *service
 */
import axios from 'axios'
/**
 * const
 */
import {
    API_ADMIN_USER_LIST,
    API_MAKE_ADMIN_USER_GET,
} from "../../constants/admin/api.constant";
/**
 * utils
 */
import {QueryString} from "../../utils/Querystring";
import UserStatisticModel from "../../model/userStatistic.model";
import CityModel from "../../model/City/city.model";

export default class UsersService {
    static async list(params) {
        const userList =  await axios.get(API_ADMIN_USER_LIST, {
            params,
            paramsSerializer: params => {
                return QueryString.stringify(params)
            }
        });

        userList.data = userList.data.map(user => new UserStatisticModel(user));

        return userList;
    }

    static async get( userId, params = {} ) {
        return new UserStatisticModel(await axios.get(API_MAKE_ADMIN_USER_GET(userId),  {
            params,
            paramsSerializer: params => {
                return QueryString.stringify(params)
            }
        }));
    }
}

