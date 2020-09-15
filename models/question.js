class Question {
    constructor(id, title, catId, date, upvotes, yesVotes, noVotes) { //userId
        this.id = id;
        this.title = title;
        this.catId = catId;
        this.date = date;
        //this.userId = userId;
        this.upvotes = upvotes;
        this.yesVotes = yesVotes;
        this.noVotes = noVotes;
    }
}

export default Question;