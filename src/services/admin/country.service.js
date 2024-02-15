/**
 *service
 */
import axios from 'axios'
import merge from 'deepmerge'
/**
 * const
 */
import {
    API_ADMIN_COUNTRY_CREATE,
    API_ADMIN_COUNTRY_LIST,
    API_MAKE_ADMIN_COUNTRY_DELETE,
    API_MAKE_ADMIN_COUNTRY_SHOW,
    API_MAKE_ADMIN_COUNTRY_TRANSLATE_EDIT,
    API_MAKE_ADMIN_COUNTRY_UPDATE,
} from "../../constants/admin/api.constant";
/**
 * utils
 */
import {QueryString} from "../../utils/Querystring";
/**
 * model
 */
import CountryModel from "../../model/Country/country.model";

export default class CountryService {
    static async list(params) {
        let countryList = await axios.get(API_ADMIN_COUNTRY_LIST, {
            params,
            paramsSerializer: params => {
                return QueryString.stringify(merge.all([
                    params,
                    {
                        include: ["translation", "translations.language", "officialLanguageRelation", "currency", "capital", "capital.translation"]
                    }
                ]))
            }
        });

        countryList.data = countryList.data.map( country => new CountryModel(country));

        return countryList;
    }

    static async show(countryId, params = {}) {
        return new CountryModel(await axios.get(API_MAKE_ADMIN_COUNTRY_SHOW(countryId), {
            params,
            paramsSerializer: params => {
                return QueryString.stringify(merge.all([
                    params,
                    {
                        include: ["landscapeImageRelation", "portraitImageRelation", "translation", "translations.language", "officialLanguageRelation", "currency", "capital", "capital.translation", ]
                    }
                ]))
            }
        }));
    }

    static async create(data) {
        return new CountryModel(await axios.post(API_ADMIN_COUNTRY_CREATE, data));
    }

    static async update(countryId, data) {
        return new CountryModel(await axios.put(API_MAKE_ADMIN_COUNTRY_UPDATE(countryId), data));
    }

    static async updateTranslate(countryId, data) {
        return await axios.put(API_MAKE_ADMIN_COUNTRY_TRANSLATE_EDIT(countryId), data);
    }

    static async delete(countryId) {
        return await axios.delete(API_MAKE_ADMIN_COUNTRY_DELETE(countryId));
    }
}

