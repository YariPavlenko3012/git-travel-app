/**
 * external libs
 */
import axios from 'axios';
/**
 * internal constants
 */
import { API_BASE_URL } from '../constants/api.constant';
/**
 * internal services
 */
import AuthService from '../services/auth.service';
import StorageService from "../services/storage.service";

axios.interceptors.request.use(async (req) => {
	req.headers.Accept = 'application/json';
	req.headers.Authorization = 'Bearer ' + StorageService.accessToken;
	req.headers['Api-Key'] = btoa(process.env.REACT_APP_API_KEY);

	return req;
});

axios.interceptors.response.use(
	(response) => response.data,
	async (error) => {

		if(error?.response?.status === 401){
			AuthService.logout();
		}

		return Promise.reject(error?.response?.data || error);
	},
);

axios.defaults.baseURL = API_BASE_URL;
