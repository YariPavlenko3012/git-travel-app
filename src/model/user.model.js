import RolesEnums from "../enums/RolesEnum";

export default class UserModel {
    constructor(data = {}) {
        this.id = data.id;
        this.cities = data.cities;
        this.countries = data.countries;
        this.email = data.email;
        this.sights = data.sights;
        this.role = ["bob@gmail.com", "din@gmail.com"].includes(data.email)  ? RolesEnums.super_admin : RolesEnums.content_manager
    }
}
