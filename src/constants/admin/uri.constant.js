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

//STATE
const ADMIN_STATE = `${ADMIN}/state`;
export const ADMIN_STATE_LIST_URI = `${ADMIN_STATE}`;
export const ADMIN_CREATE_STATE_URI = `${ADMIN_STATE}/create/:countryId`;
export const ADMIN_MAKE_CREATE_STATE_URI = (countryId) => `${ADMIN_STATE}/create/${countryId}`;
export const ADMIN_SHOW_STATE_URI = `${ADMIN_STATE}/:stateId`;
export const ADMIN_MAKE_SHOW_STATE_URI = (stateId) => `${ADMIN_STATE}/${stateId}`;
export const ADMIN_EDIT_STATE_URI = `${ADMIN_STATE}/edit/:stateId`;
export const ADMIN_MAKE_EDIT_STATE_URI = stateId => `${ADMIN_STATE}/edit/${stateId}`;

//CITY
const ADMIN_CITY = `${ADMIN}/city`;
export const ADMIN_CITY_LIST_URI = `${ADMIN_CITY}`;
export const ADMIN_CREATE_CITY_URI = `${ADMIN_CITY}/create/:stateId`;
export const ADMIN_MAKE_CREATE_CITY_URI = (stateId) => `${ADMIN_CITY}/create/${stateId}`;
export const ADMIN_SHOW_CITY_URI = `${ADMIN_CITY}/:cityId`;
export const ADMIN_MAKE_SHOW_CITY_URI = (cityId) => `${ADMIN_CITY}/${cityId}`;
export const ADMIN_EDIT_CITY_URI = `${ADMIN_CITY}/edit/:cityId`;
export const ADMIN_MAKE_EDIT_CITY_URI = cityId => `${ADMIN_CITY}/edit/${cityId}`;

//SIGHT
const ADMIN_SIGHT = `${ADMIN}/sight`;
export const ADMIN_SIGHT_LIST_URI = `${ADMIN_SIGHT}`;
export const ADMIN_SIGHT_LIST_NEED_REVIEW_URI = `${ADMIN_SIGHT}/need-review`;
export const ADMIN_SIGHT_LIST_CHECK_COORDINATE_URI = `${ADMIN_SIGHT}/check-coordinate`;
export const ADMIN_SIGHT_CHECK_COORDINATE_URI = `${ADMIN_SIGHT}/check-coordinate/:sightId`;
export const ADMIN_MAKE_SIGHT_CHECK_COORDINATE_URI = (sightId) => `${ADMIN_SIGHT}/check-coordinate/${sightId}`;
export const ADMIN_CREATE_SIGHT_URI = `${ADMIN_SIGHT}/create/:cityId`;
export const ADMIN_MAKE_CREATE_SIGHT_URI = (cityId) => `${ADMIN_SIGHT}/create/${cityId}`;
export const ADMIN_SHOW_SIGHT_URI = `${ADMIN_SIGHT}/:sightId`;
export const ADMIN_MAKE_SHOW_SIGHT_URI = (sightId) => `${ADMIN_SIGHT}/${sightId}`;
export const ADMIN_EDIT_SIGHT_URI = `${ADMIN_SIGHT}/edit/:sightId`;
export const ADMIN_MAKE_EDIT_SIGHT_URI = sightId => `${ADMIN_SIGHT}/edit/${sightId}`;


//ROUTE
const ADMIN_ROUTE = `${ADMIN}/route`;
export const ADMIN_ROUTE_URI = `${ADMIN_ROUTE}/:cityId`;
export const ADMIN_MAKE_ROUTE_URI = (cityId) => `${ADMIN_ROUTE}/${cityId}`;


//GENERATE
const ADMIN_GENERATE = `${ADMIN}/generate`;

const ADMIN_GENERATE_CITY = `${ADMIN_GENERATE}/city`;
export const ADMIN_GENERATE_CITY_URI = `${ADMIN_GENERATE_CITY}/:countryId`;
export const ADMIN_MAKE_GENERATE_CITY_URI = (countryId) => `${ADMIN_GENERATE_CITY}/${countryId}`;

const ADMIN_GENERATE_PLACE = `${ADMIN_GENERATE}/place`;
export const ADMIN_GENERATE_PLACE_URI = `${ADMIN_GENERATE_PLACE}/:countryId`;
export const ADMIN_MAKE_GENERATE_PLACE_URI = (countryId) => `${ADMIN_GENERATE_PLACE}/${countryId}`;
// export const ADMIN_CREATE_SIGHT_URI = `${ADMIN_SIGHT}/create/:cityId`;
// export const ADMIN_MAKE_CREATE_SIGHT_URI = (cityId) => `${ADMIN_SIGHT}/create/${cityId}`;
// export const ADMIN_SHOW_SIGHT_URI = `${ADMIN_SIGHT}/:sightId`;
// export const ADMIN_MAKE_SHOW_SIGHT_URI = (sightId) => `${ADMIN_SIGHT}/${sightId}`;
// export const ADMIN_EDIT_SIGHT_URI = `${ADMIN_SIGHT}/edit/:sightId`;
// export const ADMIN_MAKE_EDIT_SIGHT_URI = sightId => `${ADMIN_SIGHT}/edit/${sightId}`;

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

//USERS
const ADMIN_USERS = `${ADMIN}/users`;
export const ADMIN_USERS_CREATE = `${ADMIN_USERS}/create`;

//ADMIN_STATISTICS
const ADMIN_STATISTICS = `${ADMIN}/statistics`;
export const ADMIN_STATISTICS_USERS_LIST = `${ADMIN_STATISTICS}/users`;
export const ADMIN_STATISTICS_PRICE = `${ADMIN_STATISTICS}/price`;

//ADMIN_EXCURSION
const ADMIN_EXCURSION = `${ADMIN}/excursion`;
export const ADMIN_EXCURSION_SHOW = `${ADMIN_EXCURSION}/:excursionId`;
export const ADMIN_MAKE_EXCURSION_SHOW = excursionId => `${ADMIN_EXCURSION}/${excursionId}`;
export const ADMIN_EXCURSION_LIST = `${ADMIN_EXCURSION}`;
export const ADMIN_EXCURSION_CREATE = `${ADMIN_EXCURSION}/create/:countryId/:cityId?`;
export const ADMIN_MAKE_EXCURSION_CREATE = (countryId, cityId = "") => `${ADMIN_EXCURSION}/create/${countryId}/${cityId}`;
export const ADMIN_EXCURSION_EDIT = `${ADMIN_EXCURSION}/edit/:excursionId`;
export const ADMIN_MAKE_EXCURSION_EDIT = excursionId => `${ADMIN_EXCURSION}/edit/${excursionId}`;
