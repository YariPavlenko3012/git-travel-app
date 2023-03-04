/**
 *service
 */
import axios from 'axios'
/**
 * const
 */
import {
    API_ADMIN_STATE_CREATE,
    API_ADMIN_STATE_LIST,
    API_MAKE_ADMIN_STATE_DELETE,
    API_MAKE_ADMIN_STATE_SHOW,
    API_MAKE_ADMIN_STATE_TRANSLATE_CREATE,
    API_MAKE_ADMIN_STATE_TRANSLATE_EDIT,
    API_MAKE_ADMIN_STATE_UPDATE,
} from "../../constants/admin/api.constant";
/**
 * utils
 */
import {QueryString} from "../../utils/Querystring";
/**
 * model
 */
import StateModel from "../../model/State/state.model";

export default class StateService {
    static async list(params) {
        let stateList = await axios.get(API_ADMIN_STATE_LIST, {
            params,
            paramsSerializer: params => {
                return QueryString.stringify({
                    ...params,
                    include: {
                        translation: null,
                        country: {
                            include: {
                                translation: null,
                            }
                        },
                        ...params.include,
                    }
                })
            }
        });

        stateList.data = stateList.data.map( country => new StateModel(country));

        return stateList;
    }

    static async show(stateId, params = {}) {
        return new StateModel(await axios.get(API_MAKE_ADMIN_STATE_SHOW(stateId, {
            params,
            paramsSerializer: params => {
                return QueryString.stringify({
                    ...params,
                    include: {
                        translation: null,
                        country: {
                            include: {
                                translation: null,
                            }
                        },
                        ...params.include,
                    }
                })
            }
        })));
    }

    static async create(data) {
        return new StateModel(await axios.post(API_ADMIN_STATE_CREATE, data));
    }

    static async update(stateId, data) {
        return new StateModel(await axios.put(API_MAKE_ADMIN_STATE_UPDATE(stateId), data));
    }

    static async updateTranslate(stateId, translateId, data) {
        return await axios.put(API_MAKE_ADMIN_STATE_TRANSLATE_EDIT(stateId, translateId), data);
    }

    static async delete(stateId) {
        return await axios.delete(API_MAKE_ADMIN_STATE_DELETE(stateId));
    }
}

