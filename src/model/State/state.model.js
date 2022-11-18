import StateLanguageModel from "./language.model";

export default class StateModel {
    constructor(data = {}) {
        this.id = data.id;
        this.name = data.name;
        this.original_name = data.original_name;
        this.country = data.country;
        this.languages = (data.languages || []).map( language => new StateLanguageModel(language));
    }
};
