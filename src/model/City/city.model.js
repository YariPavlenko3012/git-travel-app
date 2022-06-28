import MediaModel from '../media.model'
import CabModel from "./cabs.model";
import CityLanguageModel from "./language.model";
import CountryModel from "../Country/country.model";

export default class CityModel {
    constructor(data = {}) {
        this.id = data.id;
        this.name = data.name;
        this.description = data.description;
        this.country = new CountryModel(data.country);
        this.languages = (data.languages || []).map( language => new CityLanguageModel(language));
        this.images = (data.images || []).map( image => new MediaModel(image));
        this.population = data.population;
        this.cabs = (data.cabs || []).map( cab => new CabModel(cab));
    }
}
