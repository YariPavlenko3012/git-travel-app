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
        this.landscape_image =  new MediaModel(data.landscape_image || {
            path: "https://media.istockphoto.com/photos/close-up-ukranian-flag-picture-id163641275?b=1&k=20&m=163641275&s=170667a&w=0&h=CVdqTfh31VTDbr7hqcBTbyocEZLlWTC02Kip6niMXBw=",
            id: new Date().getTime(),
        });
        this.portrait_image =  new MediaModel(data.portrait_image || {
            path: "https://images.unsplash.com/photo-1645810163864-744308caf5ed?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
            id: new Date().getTime(),
        });
        this.cabs = (data.cabs || []).map( cab => new CabModel(cab));
    }
}
