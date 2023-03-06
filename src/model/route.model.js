export default class RouteModel {
    constructor(data = {}) {
        this.distance = +data.distance || 0;
        this.duration = +data.duration || 0;
        this.id = data.id;
        this.path = data.path || [];
        this.route_type = data.route_type;
    }
}
