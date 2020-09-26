class Question {
    constructor(id, userId, catId, title, date, upvotes, yesVotes, noVotes) {
        this.id = id;
        this.title = title;
        this.catId = catId;
        this.date = date;
        this.userId = userId;
        this.upvotes = upvotes;
        this.yesVotes = yesVotes;
        this.noVotes = noVotes;
    }
}

export default Question;