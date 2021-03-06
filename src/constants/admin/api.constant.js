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

const ADMIN_SIGHT = `${ADMIN}/sights`;
export const API_ADMIN_SIGHT_LIST = `${ADMIN_SIGHT}`;
export const API_ADMIN_SIGHT_CREATE = `${ADMIN_SIGHT}`;
export const API_MAKE_ADMIN_SIGHT_UPDATE = sightId => `${ADMIN_SIGHT}/${sightId}`;
export const API_MAKE_ADMIN_SIGHT_DELETE = sightId => `${ADMIN_SIGHT}/${sightId}`;
export const API_MAKE_ADMIN_SIGHT_SHOW = sightId => `${ADMIN_SIGHT}/${sightId}`;
export const API_MAKE_ADMIN_SIGHT_TRANSLATE_CREATE = sightId => `${ADMIN_SIGHT}/${sightId}/languages`;
export const API_MAKE_ADMIN_SIGHT_TRANSLATE_EDIT = (sightId, translateId) => `${ADMIN_SIGHT}/${sightId}/languages/${translateId}`;

const ADMIN_CITY = `${ADMIN}/cities`;
export const API_ADMIN_CITY_LIST = `${ADMIN_CITY}`;
export const API_ADMIN_CITY_CREATE = `${ADMIN_CITY}`;
export const API_MAKE_ADMIN_CITY_EDIT = cityId => `${ADMIN_CITY}/${cityId}`;
export const API_MAKE_ADMIN_CITY_SHOW = cityId => `${ADMIN_CITY}/${cityId}`;
export const API_MAKE_ADMIN_CITY_CHANGE_STATUS = cityId => `${ADMIN_CITY}/${cityId}/change-status`;
export const API_MAKE_ADMIN_CITY_TRANSLATE_CREATE = cityId =>`${ADMIN_CITY}/${cityId}/languages`;
export const API_MAKE_ADMIN_CITY_TRANSLATE_EDIT = (cityId, translateId) => `${ADMIN_CITY}/${cityId}/languages/${translateId}`;
export const API_MAKE_ADMIN_CITY_TAXI_CREATE = cityId => `${ADMIN_CITY}/${cityId}/cabs`;
export const API_MAKE_ADMIN_CITY_TAXI_EDIT = (cityId, cabId) => `${ADMIN_CITY}/${cityId}/cabs/${cabId}`;


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
