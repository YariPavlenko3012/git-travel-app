import MediaModel from '../media.model'
import CityLanguageModel from "./languageFields.model";
import TranslateModel from "../translate.model";
import StateModel from "../State/state.model";
import CountryModel from "../Country/country.model";

const portraitImage = {
    id: null,
    path: "https://images.unsplash.com/photo-1629809189194-8302d4345c8a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dWtyYWluZSUyMGZsYWd8ZW58MHx8MHx8&w=1000&q=80"
}

const landscapeImage = {
    id: null,
    path: "https://media.istockphoto.com/photos/close-up-ukranian-flag-picture-id163641275?b=1&k=20&m=163641275&s=170667a&w=0&h=CVdqTfh31VTDbr7hqcBTbyocEZLlWTC02Kip6niMXBw="
}

export default class CityModel {
    constructor(data = {}) {
        this.id = data.id;
        this.name = data.translation?.name || "";
        this.description = data.translation?.description || "";
        this.state = new StateModel(data.state || {});
        this.latitude = data.latitude;
        this.longitude = data.longitude;
        this.geometry = data.geometry;
        this.country = new CountryModel(data.country || {});
        this.work_status = data.work_status;
        this.generation_count_of_squares = data.generation_count_of_squares;
        this.original_name = data.original_name;
        this.translations = (data.translations || []).map( translate => new TranslateModel(translate, CityLanguageModel));
        this.population = data.population;
        this.landscape_image =  new MediaModel(data.landscape_image || landscapeImage);
        this.portrait_image =  new MediaModel(data.portrait_image || portraitImage)
    }
}
