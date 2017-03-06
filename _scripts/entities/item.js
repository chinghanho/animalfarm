const Entity = require('./entity')

class Item extends Entity {

    constructor(options) {
        super(options)
    }

    animate(key, speed) {
        super.animate(key, speed)
    }

}

module.exports = Item
