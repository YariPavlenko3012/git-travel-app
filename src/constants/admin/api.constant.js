export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const REQUEST_VERSION = "/v1";

const ADMIN = `${REQUEST_VERSION}/admin`;

const ADMIN_COUNTRY = `${ADMIN}/countries`;
export const API_ADMIN_COUNTRY_LIST = `${ADMIN_COUNTRY}`;
export const API_ADMIN_COUNTRY_CREATE = `${ADMIN_COUNTRY}`;
export const API_MAKE_ADMIN_COUNTRY_UPDATE = countryId => `${ADMIN_COUNTRY}/${countryId}`;
export const API_MAKE_ADMIN_COUNTRY_DELETE = countryId => `${ADMIN_COUNTRY}/${countryId}`;
export const API_MAKE_ADMIN_COUNTRY_SHOW = countryId => `${ADMIN_COUNTRY}/${countryId}`;
export const API_MAKE_ADMIN_COUNTRY_TRANSLATE_CREATE = countryId =>  `${ADMIN_COUNTRY}/${countryId}/languages`;
export const API_MAKE_ADMIN_COUNTRY_TRANSLATE_EDIT = (countryId, translateId) => `${ADMIN_COUNTRY}/${countryId}/languages/${translateId}`;

const ADMIN_STATE = `${ADMIN}/states`;
export const API_ADMIN_STATE_LIST = `${ADMIN_STATE}`;
export const API_ADMIN_STATE_CREATE = `${ADMIN_STATE}`;
export const API_MAKE_ADMIN_STATE_UPDATE = countryId => `${ADMIN_STATE}/${countryId}`;
export const API_MAKE_ADMIN_STATE_DELETE = countryId => `${ADMIN_STATE}/${countryId}`;
export const API_MAKE_ADMIN_STATE_SHOW = countryId => `${ADMIN_STATE}/${countryId}`;
export const API_MAKE_ADMIN_STATE_TRANSLATE_CREATE = countryId =>  `${ADMIN_STATE}/${countryId}/languages`;
export const API_MAKE_ADMIN_STATE_TRANSLATE_EDIT = (countryId, translateId) => `${ADMIN_STATE}/${countryId}/languages/${translateId}`;

const ADMIN_SIGHT = `${ADMIN}/sights`;
export const API_ADMIN_SIGHT_LIST = `${ADMIN_SIGHT}`;
export const API_ADMIN_SIGHT_CREATE = `${ADMIN_SIGHT}`;
export const API_ADMIN_SIGHT_DOWNLOAD_IMAGE = `${ADMIN_SIGHT}/download-image`;
export const API_ADMIN_SIGHT_CREATE_BATCH = `${ADMIN_SIGHT}/batch`;
export const API_MAKE_ADMIN_SIGHT_UPDATE = sightId => `${ADMIN_SIGHT}/${sightId}`;
export const API_MAKE_ADMIN_SIGHT_DELETE = sightId => `${ADMIN_SIGHT}/${sightId}`;
export const API_MAKE_ADMIN_SIGHT_CHANGE_STATUS = sightId => `${ADMIN_SIGHT}/${sightId}/work-status`;
export const API_MAKE_ADMIN_SIGHT_NEED_REVIEW = sightId => `${ADMIN_SIGHT}/${sightId}/need-review`;
export const API_MAKE_ADMIN_SIGHT_GET_CITIES = sightId => `${ADMIN_SIGHT}/${sightId}/cities`;
export const API_MAKE_ADMIN_SIGHT_SHOW = sightId => `${ADMIN_SIGHT}/${sightId}`;
export const API_MAKE_ADMIN_SIGHT_TRANSLATE_CREATE = sightId => `${ADMIN_SIGHT}/${sightId}/languages`;
export const API_MAKE_ADMIN_SIGHT_TRANSLATE_EDIT = (sightId, translateId) => `${ADMIN_SIGHT}/${sightId}/languages/${translateId}`;

const ADMIN_CITY = `${ADMIN}/cities`;
export const API_ADMIN_CITY_LIST = `${ADMIN_CITY}`;
export const API_ADMIN_CITY_CREATE = `${ADMIN_CITY}`;
export const API_MAKE_ADMIN_CITY_DELETE = cityId => `${ADMIN_CITY}/${cityId}`;
export const API_MAKE_ADMIN_CITY_EDIT = cityId => `${ADMIN_CITY}/${cityId}`;
export const API_MAKE_ADMIN_CITY_SHOW = cityId => `${ADMIN_CITY}/${cityId}`;
export const API_MAKE_ADMIN_CITY_CHANGE_STATUS = cityId => `${ADMIN_CITY}/${cityId}/work-status`;
export const API_MAKE_ADMIN_CITY_TRANSLATE_CREATE = cityId =>`${ADMIN_CITY}/${cityId}/languages`;
export const API_MAKE_ADMIN_CITY_TRANSLATE_EDIT = (cityId, translateId) => `${ADMIN_CITY}/${cityId}/languages/${translateId}`;
export const API_MAKE_ADMIN_CITY_TAXI_CREATE = cityId => `${ADMIN_CITY}/${cityId}/cabs`;
export const API_MAKE_ADMIN_CITY_TAXI_EDIT = (cityId, cabId) => `${ADMIN_CITY}/${cityId}/cabs/${cabId}`;

const ADMIN_GENERATE_PLACE = `${ADMIN}/generation`;
export const ADMIN_CREATE_SQUARE_GENERATE_PLACE = `${ADMIN_GENERATE_PLACE}/place`;
export const ADMIN_CREATE_FINISH_STATUS_BY_CITY_GENERATE_PLACE = `${ADMIN_GENERATE_PLACE}/finish`;
export const ADMIN_GET_GENERATED_SQUARE_GENERATE_PLACE  = `${ADMIN_GENERATE_PLACE}/squares`;
export const ADMIN_GET_CITY_WHITE_LIST_GENERATE_PLACE  = `${ADMIN_GENERATE_PLACE}/city-whiteList`;


const ADMIN_EXCURSION = `${ADMIN}/excursions`;
export const ADMIN_EXCURSION_CREATE = `${ADMIN_EXCURSION}`;
export const ADMIN_EXCURSION_LIST = `${ADMIN_EXCURSION}`;
export const ADMIN_EXCURSION_MAKE_NEAR_ROADS_PLACE = (excursionId, itemId) => `${ADMIN_EXCURSION}/${excursionId}/items/${itemId}/routes/24/nearBy`;



const ADMIN_LANGUAGE = `${ADMIN}/languages`;
export const API_ADMIN_LANGUAGE_LIST = `${ADMIN_LANGUAGE}`;
export const API_ADMIN_LANGUAGE_CREATE = `${ADMIN_LANGUAGE}`;
export const API_MAKE_ADMIN_CITY_LANGUAGE_DELETE = languageId => `${ADMIN_LANGUAGE}/${languageId}`;
export const API_MAKE_ADMIN_LANGUAGE_SHOW = languageId => `${ADMIN_LANGUAGE}/${languageId}`;
export const API_MAKE_ADMIN_LANGUAGE_UPDATE = languageId => `${ADMIN_LANGUAGE}/${languageId}`;

const ADMIN_CURRENCY = `${ADMIN}/currencies`;
export const API_ADMIN_CURRENCY_LIST = `${ADMIN_CURRENCY}`;
export const API_ADMIN_CURRENCY_CREATE = `${ADMIN_CURRENCY}`;
export const API_MAKE_ADMIN_CITY_CURRENCY_DELETE = currencyId => `${ADMIN_CURRENCY}/${currencyId}`;
export const API_MAKE_ADMIN_CURRENCY_SHOW = currencyId => `${ADMIN_CURRENCY}/${currencyId}`;
export const API_MAKE_ADMIN_CURRENCY_UPDATE = currencyId => `${ADMIN_CURRENCY}/${currencyId}`;

//DICTIONARY
const DICTIONARY = `${ADMIN}/dictionary`;
export const API_DICTIONARY_COUNTRIES_URL = `${DICTIONARY}/countries`;
export const API_DICTIONARY_CITIES_URL = `${DICTIONARY}/cities`;
export const API_DICTIONARY_LANGUAGES_URL = `${DICTIONARY}/languages`;
export const API_DICTIONARY_CURRENCIES_URL = `${DICTIONARY}/currencies`;
export const API_DICTIONARY_STATES_URL = `${DICTIONARY}/states`;
export const API_DICTIONARY_SIGHT_URL = `${DICTIONARY}/sights`;

//DICTIONARY
const USER = `${ADMIN}/users`;
export const API_ADMIN_USER_LIST = `${USER}`;
export const API_MAKE_ADMIN_USER_GET = userId =>  `${USER}/${userId}`;
