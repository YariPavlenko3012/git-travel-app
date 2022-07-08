export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const REQUEST_VERSION = "/v1"

//AUTH
const AUTH = `${REQUEST_VERSION}/admin`;
export const API_REGISTRATION_URL = `${AUTH}/register`;
export const API_LOGIN_URL = `${AUTH}/login`;
export const API_FORGOT_PASSWORD_URL = `${AUTH}/reset-password`;
export const API_CONFIRM_EMAIL_URL = `${AUTH}/confirm-email`;
export const API_USER_ME_URL = `${AUTH}/user/me`;

//PROFILE
const PROFILE = `${REQUEST_VERSION}/profile`;
export const API_PROFILE_UPDATE_GENERAL_URL = `${PROFILE}`;
export const API_PROFILE_UPDATE_EMAIL_URL = `${PROFILE}/email`;
export const API_PROFILE_UPDATE_PASSWORD_URL = `${PROFILE}/password`;
export const API_PROFILE_SUSPICIOUS_ACTIVITY_URL = `${PROFILE}/suspicious-activity`;

//POST
const POST = `${REQUEST_VERSION}/posts`;
export const API_POST_CREATE_URL = `${POST}`;
export const API_POST_UPLAOD_FILE_URL = `${POST}/files`;
export const API_POST_LIST_URL = `/feeds`;
export const API_POST_MAKE_DELETE_URL = (postId) => `${POST}/${postId}`;
export const API_POST_MAKE_LIKE_URL = (postId) => `${POST}/${postId}/likes`;
export const API_POST_MAKE_UNLIKE_URL = (postId) => `${POST}/${postId}/likes`;
export const API_POST_MAKE_FAVORITES_URL = (postId) => `${POST}/${postId}/favorites`;
export const API_POST_MAKE_UNFAVORITES_URL = (postId) => `${POST}/${postId}/favorites`;
export const API_POST_MAKE_LIST_COMMENTS_URL = (postId) => `${POST}/${postId}/comments`;
export const API_POST_MAKE_CREATE_COMMENTS_URL = (postId) => `${POST}/${postId}/comments`;
export const API_POST_MAKE_DELETE_COMMENTS_URL = (postId, commentId) => `${POST}/${postId}/comments/${commentId}`;
export const API_POST_MAKE_LIST_REPLAY_COMMENTS_URL = (postId, commentId) => `${POST}/${postId}/comments/${commentId}/replies`;
export const API_POST_MAKE_USERS_POST_URL = (userId) => `${POST}/users/${userId}`;

//ACCOUNT
const ACCOUNT = `${REQUEST_VERSION}/account`;
export const API_MAKE_ACCOUNT_USER_INFO_URL = (userLogin) => `${ACCOUNT}/${userLogin}/info`;

//USERS
const USERS = `${REQUEST_VERSION}/users`;
export const API_USERS_SUBSCRIBE_URL = `${USERS}/followers`;
export const API_USERS_UNSUBSCRIBE_URL = `${USERS}/followers`;
export const API_MAKE_USERS_FOLLOWERS_URL = (userId) => `${USERS}/${userId}/followers`;
export const API_MAKE_USERS_FOLLOWING_URL = (userId) => `${USERS}/${userId}/followings`;
export const API_MAKE_USERS_GET_VISIT_COUNTRY_URL = (userLogin) => `${USERS}/${userLogin}/visited-country`;
export const API_USERS_CREATE_VISIT_COUNTRY_URL = (userID) => `${USERS}/${userID}/visited-country`;
export const API_MAKE_USERS_DELETE_VISIT_COUNTRY_URL = (userId, countryCode) => `${USERS}/${userId}/visited-country/${countryCode}`;
