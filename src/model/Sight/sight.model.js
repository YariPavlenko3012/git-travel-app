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
        this.original_name = data.original_name;
        this.city = data.city;
        this.need_review = data.need_review;
        this.work_status = data.work_status;
        this.place_type = data.place_type || [];
        this.opening_hours = data.opening_hours || null;
        this.formatted_address = data.formatted_address;
        this.website = data.website;
        this.international_phone_number = data.international_phone_number;
        this.languages = (data.languages || []).map( language => new SightLanguageModel(language));
        this.images = (data.images || []).map( image => new MediaModel(image));
    }
};
