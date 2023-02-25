import LanguageModel from "../language.model";

export default class CountryFieldsModel {
    constructor(data = {}) {
        this.name = data.name;
        this.description = data.description;
    }
};
