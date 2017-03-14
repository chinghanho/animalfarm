const Character = require('./character')

class Player extends Character {

    constructor(username, options) {
        super(options)
        this.username = username
    }

    spawn(gridPoint) {
        this.gridPoint = gridPoint
    }

}

module.exports = Player
