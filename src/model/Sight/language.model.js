import LanguageModel from "../language.model";

export default class SightLanguageModel {
    constructor(data = {}) {
        this.id = data.id;
        this.language = new LanguageModel(data.language);
        this.sight_description = data.sight_description;
        this.sight_name = data.sight_name;
    }
};
