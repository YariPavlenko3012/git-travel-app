import LanguageModel from "../language.model";

export default class CountryLanguageModel {
    constructor(data = {}) {
        this.country_description = data.country_description;
        this.country_name = data.country_name;
        this.id = data.id;
        this.language = new LanguageModel(data.language);
    }
};
