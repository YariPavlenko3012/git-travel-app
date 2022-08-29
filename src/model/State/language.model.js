import LanguageModel from "../language.model";

export default class StateLanguageModel {
    constructor(data = {}) {
        this.state_name = data.state_name;
        this.id = data.id;
        this.language = new LanguageModel(data.language);
    }
};
