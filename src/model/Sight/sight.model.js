import MediaModel from "../media.model";
import CityModel from "../City/city.model";
import SightLanguageModel from "./language.model";

export default class SightModel {
    constructor(data = {}) {
        this.id = data.id;
        this.name = data.name;
        this.description = data.description;
        this.number_of_views = data.number_of_views || 0;
        this.latitude = data.latitude;
        this.longitude = data.longitude;
        this.city = data.city;
        this.languages = (data.languages || []).map( language => new SightLanguageModel(language));
        this.images = (data.images || []).map( image => new MediaModel(image));
    }
};
