const Player = require('./player')
const Npc = require('./npc')
const Item = require('./item')

var _instance

/**
 * @singleton
 */
class EntityMaker {

    constructor() {
        if (!_instance) {
            _instance = this
        }

        this.types = {}

        return _instance
    }

    register(className, type) {
        this.types[className] = type
        return this
    }

    create(className, custom) {
        var type = this.types[className]
        return type ? new type(custom) : null
    }

    static addTo(game) {
        _instance = _instance || new EntityMaker()
        this.init()
        return _instance
    }

    static init() {
        _instance.register('player', Player)
        _instance.register('npc', Npc)
        _instance.register('item', Item)
    }

}

module.exports = EntityMaker
