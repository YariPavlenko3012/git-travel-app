/**
 *service
 */
import axios from 'axios'
/**
 * const
 */
import {
    API_ADMIN_CITY_LIST, API_ADMIN_COUNTRY_LIST, API_ADMIN_SIGHT_LIST,
    API_DICTIONARY_CITIES_URL,
    API_DICTIONARY_COUNTRIES_URL,
    API_DICTIONARY_CURRENCIES_URL, API_DICTIONARY_ENUMS_URL,
    API_DICTIONARY_LANGUAGES_URL, API_DICTIONARY_SIGHT_URL,
    API_DICTIONARY_STATES_URL,
} from "../constants/admin/api.constant";
/**
 * utils
 */
import {QueryString} from "../utils/Querystring";
import CityModel from "../model/City/city.model";
import CountryModel from "../model/Country/country.model";
import SightModel from "../model/Sight/sight.model";

export default class DictionaryService {
    static async enums(params = {}) {
        return await axios.get(API_DICTIONARY_ENUMS_URL, {
            params,
            paramsSerializer: params => {
                return QueryString.stringify(params)
            }
        });
    }

    static async countries(params) {
        let countryList = await axios.get(API_ADMIN_COUNTRY_LIST, {
            params,
            paramsSerializer: params => {
                return QueryString.stringify({
                    ...params,
                    include: {
                        translation: null,
                        ...params.include,
                    }
                })
            }
        });

        countryList.data = countryList.data.map( country => new CountryModel(country));

        return countryList;
    }

    static async cities(params) {
        let cityList = await axios.get(API_ADMIN_CITY_LIST, {
            params,
            paramsSerializer: params => {
                return QueryString.stringify({
                    ...params,
                    include: {
                        translation: null,
                        ...params.include
                    }
                })
            }
        });

        cityList.data = cityList.data.map(city => new CityModel(city));

        return cityList;
    }

    static async languages() {
        return await axios.get(API_DICTIONARY_LANGUAGES_URL);
    }

    static async currencies() {
        return await axios.get(API_DICTIONARY_CURRENCIES_URL);
    }

    static async states() {
        return await axios.get(API_DICTIONARY_STATES_URL);
    }

    static async sights(params) {
        let sightList = await axios.get(API_ADMIN_SIGHT_LIST, {
            params,
            paramsSerializer: params => {
                return QueryString.stringify({
                    ...params,
                    include: {
                        translation: null,
                        ...params.include,
                    }
                })
            }
        });


        sightList.data = sightList.data.map(sight => new SightModel(sight))

        return sightList;
    }
}

