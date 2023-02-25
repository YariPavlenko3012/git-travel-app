import LanguageModel from "./language.model";

export default class TranslateModel {
    constructor(data = {}, FieldsModel) {
        this.id = data.id;
        this.fields = new FieldsModel(data.fields);
        this.language = new LanguageModel(data.language);
    }
}
