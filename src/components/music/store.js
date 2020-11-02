const Model = require("../../store/models/playedSongs")

module.exports = {
    async addPlay(play) { return await new Model({ ...play, timeStamp: Date.now() }).save() },
    async getHistory(id) {
        return await Model.find({
            user:id
        })
    }
}

