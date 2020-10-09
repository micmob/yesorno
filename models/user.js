class User {
    constructor(id, email, username, profilePicture, createdQuestions, upvotedQuestions) {
        this.id = id;
        this.email = email;
        this.username = username;
        this.profilePicture = profilePicture;
        this.createdQuestions = createdQuestions;
        this.upvotedQuestions = upvotedQuestions;
    }
}

export default User;