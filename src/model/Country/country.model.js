import CityModel from '../City/city.model'
import MediaModel from "../media.model";
import CurrencyModel from "../currency.model";
import LanguageModel from "../language.model";
import CountryLanguageModel from "./language.model";

export default class CountryModel {
    constructor(data = {}) {
        this.id = data.id;
        this.country_code_in_iso_3166_1_format = data.country_code_in_iso_3166_1_format;
        this.population = data.population;
        this.official_language = new LanguageModel(data.official_language);
        this.capital = data.capital ? new CityModel(data.capital) : null;
        this.currency = new CurrencyModel(data.currency);
        this.name = data.name;
        this.languages = (data.languages || []).map( language => new CountryLanguageModel(language));
        this.description = data.description;
        this.ambulance_number = data.ambulance_number;
        this.has_seas = data.has_seas;
        this.has_mountains = data.has_mountains;
        this.landscape_image =  data.landscape_image && new MediaModel(data.landscape_image);
        this.portrait_image =  data.portrait_image && new MediaModel(data.portrait_image);
        this.has_mountains = data.has_mountains;
        this.happiness_rating = data.happiness_rating;
        this.highest_point = data.highest_point;
        this.country_area = data.country_area;
        this.safety_index = data.safety_index;
        this.images = (data.images || []).map( image => new MediaModel(image));
    }
};
