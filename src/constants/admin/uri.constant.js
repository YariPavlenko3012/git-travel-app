//ADMIN
export const ADMIN = '/admin';
const ADMIN_CREATE = `${ADMIN}/create`;
const ADMIN_EDIT = `${ADMIN}/edit`;

//COUNTRY
const ADMIN_COUNTRY = `${ADMIN}/country`;
export const ADMIN_COUNTRY_LIST_URI = `${ADMIN_COUNTRY}`;
export const ADMIN_CREATE_COUNTRY_URI = `${ADMIN_COUNTRY}/create`;
export const ADMIN_SHOW_COUNTRY_URI = `${ADMIN_COUNTRY}/:countryId`;
export const ADMIN_MAKE_SHOW_COUNTRY_URI = (countryId) => `${ADMIN_COUNTRY}/${countryId}`;
export const ADMIN_EDIT_COUNTRY_URI = `${ADMIN_COUNTRY}/edit/:countryId`;
export const ADMIN_MAKE_EDIT_COUNTRY_URI = countryId => `${ADMIN_COUNTRY}/edit/${countryId}`;

//CITY
const ADMIN_CITY = `${ADMIN}/city`;
export const ADMIN_CITY_LIST_URI = `${ADMIN_CITY}`;
export const ADMIN_CREATE_CITY_URI = `${ADMIN_CITY}/create/:countryId`;
export const ADMIN_MAKE_CREATE_CITY_URI = (countryId) => `${ADMIN_CITY}/create/${countryId}`;
export const ADMIN_SHOW_CITY_URI = `${ADMIN_CITY}/:cityId`;
export const ADMIN_MAKE_SHOW_CITY_URI = (cityId) => `${ADMIN_CITY}/${cityId}`;
export const ADMIN_EDIT_CITY_URI = `${ADMIN_CITY}/edit/:cityId`;
export const ADMIN_MAKE_EDIT_CITY_URI = cityId => `${ADMIN_CITY}/edit/${cityId}`;

//SIGHT
const ADMIN_SIGHT = `${ADMIN}/sight`;
export const ADMIN_SIGHT_LIST_URI = `${ADMIN_SIGHT}`;
export const ADMIN_CREATE_SIGHT_URI = `${ADMIN_SIGHT}/create/:cityId`;
export const ADMIN_MAKE_CREATE_SIGHT_URI = (cityId) => `${ADMIN_SIGHT}/create/${cityId}`;
export const ADMIN_SHOW_SIGHT_URI = `${ADMIN_SIGHT}/:sightId`;
export const ADMIN_MAKE_SHOW_SIGHT_URI = (sightId) => `${ADMIN_SIGHT}/${sightId}`;
export const ADMIN_EDIT_SIGHT_URI = `${ADMIN_SIGHT}/edit/:sightId`;
export const ADMIN_MAKE_EDIT_SIGHT_URI = sightId => `${ADMIN_SIGHT}/edit/${sightId}`;

//LANGUAGE
const ADMIN_LANGUAGE = `${ADMIN}/language`;
export const ADMIN_LANGUAGE_LIST_URI = `${ADMIN_LANGUAGE}`;
export const ADMIN_CREATE_LANGUAGE_URI = `${ADMIN_LANGUAGE}/create`;
export const ADMIN_SHOW_LANGUAGE_URI = `${ADMIN_LANGUAGE}/:languageId`;
export const ADMIN_MAKE_SHOW_LANGUAGE_URI = (languageId) => `${ADMIN_LANGUAGE}/${languageId}`;
export const ADMIN_EDIT_LANGUAGE_URI = `${ADMIN_LANGUAGE}/edit/:languageId`;
export const ADMIN_MAKE_EDIT_LANGUAGE_URI = languageId => `${ADMIN_LANGUAGE}/edit/${languageId}`;

//CURRENCY
const ADMIN_CURRENCY = `${ADMIN}/currency`;
export const ADMIN_CURRENCY_LIST_URI = `${ADMIN_CURRENCY}`;
export const ADMIN_CREATE_CURRENCY_URI = `${ADMIN_CURRENCY}/create`;
export const ADMIN_SHOW_CURRENCY_URI = `${ADMIN_CURRENCY}/:currencyId`;
export const ADMIN_MAKE_SHOW_CURRENCY_URI = (currencyId) => `${ADMIN_CURRENCY}/${currencyId}`;
export const ADMIN_EDIT_CURRENCY_URI = `${ADMIN_CURRENCY}/edit/:currencyId`;
export const ADMIN_MAKE_EDIT_CURRENCY_URI = currencyId => `${ADMIN_CURRENCY}/edit/${currencyId}`;
