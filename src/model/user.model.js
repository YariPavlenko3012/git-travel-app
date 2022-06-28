export default class UserModel {
    constructor(data = {}) {
        this.id = data.id;
        this.name = data.name;
        this.email = data.email;
        this.email_is_verified = data.email_is_verified;
        this.about_me = data.about_me;
        this.login = data.login;
        this.my_website = data.my_website;
        this.need_to_change_password = data.need_to_change_password;
        this.telephone = data.telephone;
        this.avatar = data.avatar;
    }
}
