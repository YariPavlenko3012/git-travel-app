import StateLanguageModel from "./language.model";
import CountryModel from "../Country/country.model";

export default class StateModel {
    constructor(data = {}) {
        this.id = data.id;
        this.name = data.translation?.name || "";
        this.original_name = data.original_name;
        this.country = new CountryModel(data.country || {});
        this.languages = (data.languages || []).map( language => new StateLanguageModel(language));
    }
};
