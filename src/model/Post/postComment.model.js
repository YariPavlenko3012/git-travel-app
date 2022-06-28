import UserModel from "../user.model";

export default class PostCommentModel {
    constructor(data = {}) {
        this.id = data.id;
        this.post_id = data.post_id;
        this.parent_id = data.parent_id;
        this.text = data.text;
        this.replies = data.replies ? data.replies.map( repl => new PostCommentModel(repl)) : null;
        this.user = new UserModel(data.user);
    }
}
