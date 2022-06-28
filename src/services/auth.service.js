/**
 *service
 */
import axios from 'axios'
/**
 *service
 */
import StorageService from "./storage.service";
/**
 * const
 */
import {API_LOGIN_URL, API_REGISTRATION_URL, API_FORGOT_PASSWORD_URL, API_CONFIRM_EMAIL_URL, API_USER_ME_URL} from "../constants/api.constant";
import UserModel from "../model/user.model";

export default class AuthService {
    static async login(data) {
        return await axios.post(API_LOGIN_URL, data);
    }

    static async me() {
        const user = await axios.get(API_USER_ME_URL);

        return new UserModel(user)
    }

    static logout() {
        StorageService.removeAccessToken();
    }
}
