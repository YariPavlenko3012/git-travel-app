export default class UserModel {
    constructor(data = {}) {
        this.id = data.id;
        this.cities = data.cities;
        this.countries = data.countries;
        this.email = data.email;
        this.sights = data.sights;
        this.role = "super_admin"
    }
}
