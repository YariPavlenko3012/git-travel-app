import SightModel from "../Sight/sight.model";
import RouteModel from "../route.model";

export default class ExcursionItemModel {
    constructor(data = {}) {
        this.day = data.day;
        this.id = data.id;
        this.place = data.place;
        this.place_id = data.place_id;
        this.priority = data.priority;
        this.routes = data.routes;
    }
}
