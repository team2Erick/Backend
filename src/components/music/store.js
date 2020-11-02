const Model = require("../../store/models/playedSongs")

module.exports = {
    async addPlay(play) { return await new Model({ ...play, timeStamp: Date.now() }).save() },
    async getHistory(user) {
        return await Model.find({
            user
        })
    }
}

