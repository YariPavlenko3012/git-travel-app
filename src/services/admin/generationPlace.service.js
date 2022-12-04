/**
 *service
 */
import axios from 'axios'
/**
 * const
 */
import {
    ADMIN_CREATE_FINISH_STATUS_BY_CITY_GENERATE_PLACE,
    ADMIN_CREATE_SQUARE_GENERATE_PLACE,
    ADMIN_GET_CITY_WHITE_LIST_GENERATE_PLACE,
    ADMIN_GET_GENERATED_SQUARE_GENERATE_PLACE,
    API_ADMIN_SIGHT_DOWNLOAD_IMAGE,
} from "../../constants/admin/api.constant";
import {QueryString} from "../../utils/Querystring";
import CityModel from "../../model/City/city.model";


export default class GenerationPlaceService {
    static async create(data) {
        return await axios.post(ADMIN_CREATE_SQUARE_GENERATE_PLACE, data);
    }

    static async downloadImage(url) {
        return await axios.post(API_ADMIN_SIGHT_DOWNLOAD_IMAGE, {url})
    }

    static async finish(data) {
        return await axios.post(ADMIN_CREATE_FINISH_STATUS_BY_CITY_GENERATE_PLACE, data)
    }

    static async generatedSquare(params) {
        return await axios.get(ADMIN_GET_GENERATED_SQUARE_GENERATE_PLACE, {
            params,
            paramsSerializer: params => {
                return QueryString.stringify(params)
            }
        })
    }

    static async cityWhiteList(params) {
        let cityList =  await axios.get(ADMIN_GET_CITY_WHITE_LIST_GENERATE_PLACE, {
            params,
            paramsSerializer: params => {
                return QueryString.stringify(params)
            }
        })

        cityList.data = cityList.data.map(city => new CityModel(city));

        return cityList;
    }
}

