const Model = require("../../store/models/playedSongs")

module.exports = {
    async addPlay(play) { return new Model(play).save() }

}