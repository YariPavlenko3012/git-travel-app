export default class AccountInfoModel {
    constructor(data = {}) {
        this.count_of_posts = data.count_of_posts;
        this.followers = data.followers;
        this.followings = data.followings;
        this.intersected_followers = data.intersected_followers;
        this.is_followed = data.is_followed;
        this.login = data.login;
        this.avatar = data.avatar;
        this.id = data.id;
    }
}
