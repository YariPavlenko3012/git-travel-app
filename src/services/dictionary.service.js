/**
 *service
 */
import axios from 'axios'
/**
 * const
 */
import {
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

export default class DictionaryService {
    static async enums(params = {}) {
        return await axios.get(API_DICTIONARY_ENUMS_URL, {
            params,
            paramsSerializer: params => {
                return QueryString.stringify(params)
            }
        });
    }
    static async countries(params = {}) {
        return await axios.get(API_DICTIONARY_COUNTRIES_URL, {
            params,
            paramsSerializer: params => {
                return QueryString.stringify(params)
            }
        });
    }

    static async cities(params = {}) {
        return await axios.get(API_DICTIONARY_CITIES_URL, {
            params,
            paramsSerializer: params => {
                return QueryString.stringify(params)
            }
        });
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

    static async sights(params = {}) {
        console.log({
            params,
            paramsSerializer: params => {
                return QueryString.stringify(params)
            }
        }, "s")
        return await axios.get(API_DICTIONARY_SIGHT_URL, {
            params,
            paramsSerializer: params => {
                return QueryString.stringify(params)
            }
        });
    }
}

