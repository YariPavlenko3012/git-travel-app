import MediaModel from '../media.model'
import CabModel from "./cabs.model";
import CityLanguageModel from "./language.model";

export default class CityModel {
    constructor(data = {}) {
        this.id = data.id;
        this.name = data.name;
        this.description = data.description;
        this.state = data.state;
        this.languages = (data.languages || []).map( language => new CityLanguageModel(language));
        this.images = (data.images || []).map( image => new MediaModel(image));
        this.population = data.population;
        this.landscape_image =  data.landscape_image && new MediaModel(data.landscape_image);
        this.portrait_image =  data.portrait_image && new MediaModel(data.portrait_image);
        this.cabs = (data.cabs || []).map( cab => new CabModel(cab));
    }
}
