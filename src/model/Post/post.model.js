export default class PostModel {
    constructor(data = {}) {
        this.id = data.id;
        this.description = data.description;
        this.place = data.place;
        this.images = data.images;
        this.show_comments = data.show_comments;
        this.is_liked = data.is_liked;
        this.is_in_favorites = data.is_in_favorites;
        this.count_of_comments = data.count_of_comments;
        this.count_of_likes = data.count_of_likes;
    }
}
