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
        this.landscape_image =  new MediaModel(data.landscape_image || {
            path: "https://media.istockphoto.com/photos/close-up-ukranian-flag-picture-id163641275?b=1&k=20&m=163641275&s=170667a&w=0&h=CVdqTfh31VTDbr7hqcBTbyocEZLlWTC02Kip6niMXBw=",
            id: new Date().getTime(),
        });
        this.portrait_image =  new MediaModel(data.portrait_image || {
            path: "https://images.unsplash.com/photo-1629809189194-8302d4345c8a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dWtyYWluZSUyMGZsYWd8ZW58MHx8MHx8&w=1000&q=80",
            id: new Date().getTime(),
        });
        this.has_mountains = data.has_mountains;
        this.happiness_rating = data.happiness_rating;
        this.highest_point = data.highest_point;
        this.country_area = data.country_area;
        this.safety_index = data.safety_index;
        this.images = (data.images || []).map( image => new MediaModel(image));
    }
};
