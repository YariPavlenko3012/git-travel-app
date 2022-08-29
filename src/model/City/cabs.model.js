export default class CabModel {
    constructor(data = {}) {
        this.id =  data.id;
        this.name = (data.name || "").trim();
        this.phone_number = (data.phone_number || "").trim();
    }
}
