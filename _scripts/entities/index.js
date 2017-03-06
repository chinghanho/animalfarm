const Player = require('./player')
const Npc = require('./npc')
const Item = require('./item')

var maker, instance

/**
 * @singleton
 */
class EntityMaker {

    constructor() {
        if (!instance) {
            instance = this
        }

        this.types = {}

        return instance
    }

    register(className, type) {
        this.types[className] = type
        return this
    }

    create(className, custom) {
        var type = this.types[className]
        return type ? new type(custom) : null
    }

}

maker = new EntityMaker()

maker.register('player', Player)
maker.register('npc', Npc)
maker.register('item', Item)

module.exports = maker
