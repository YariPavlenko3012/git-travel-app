// AUTH
const AUTH = `/auth`;
export const AUTH_PAGE_REGISTRATION_URI = `${AUTH}/registration`;
export const AUTH_PAGE_LOGIN_URI = `${AUTH}/login`;
export const AUTH_PAGE_FORGOT_PASSWORD_URI = `${AUTH}/forgot-password`;
export const AUTH_PAGE_LOGOUT_URI = `${AUTH}/logout`;
export const AUTH_PAGE_CONFIRM_EMAIL_URI = `${AUTH}/confirm-email/:token`;
export const AUTH_PAGE_SUSPICIOUS_ACTIVITY_URI = `${AUTH}/suspicious-activity/:userId/:token`;

// PROFILE
const PROFILE = `/profile`;
const SETTINGS = `${PROFILE}/settings`;
export const PROFILE_PAGE_SETTINGS_GENERAL_URI = `${SETTINGS}/general`;
export const PROFILE_PAGE_SETTINGS_EMAIL_URI = `${SETTINGS}/email`;
export const PROFILE_PAGE_SETTINGS_PASSWORD_URI = `${SETTINGS}/password`;

// FEED
const FEED = `/feed`;
export const FEED_PAGE_GENERAL_URI = `${FEED}`;
export const FEED_PAGE_USER_URI = `${FEED}/:userLogin`;

export const AUTH_PAGE_PAGE = `${AUTH}/ok`;
