import LanguageModel from "../language.model";

export default class CityLanguageModel {
    constructor(data = {}) {
        this.city_name = data.city_name;
        this.id = data.id;
        this.language = new LanguageModel(data.language);
    }
}
