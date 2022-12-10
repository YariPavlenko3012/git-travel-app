/**
 * internal constants
 */
import {ACCESS_TOKEN_KEY, SETTINGS_KEY} from '../constants/storage.constant';

export default class StorageService {
    static get accessToken() {
        return localStorage.getItem(ACCESS_TOKEN_KEY);
    }

    static set accessToken(token) {
        return localStorage.setItem(ACCESS_TOKEN_KEY, token);
    }

    static removeAccessToken() {
        return localStorage.removeItem(ACCESS_TOKEN_KEY);
    }

    static get settings() {
        return JSON.parse(localStorage.getItem(SETTINGS_KEY) || "{}");
    }

    static set settings(settings) {
        return localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    }
}
