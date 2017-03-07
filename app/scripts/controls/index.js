const Entities = require('./entities_controller')

var instance, maker

class ControlMaker {

    constructor() {
        if (!instance) {
            instance = this
        }

        this.controllers = {}

        return instance
    }

    by(className) {
        return this.controllers[className]
    }

    register(className, controller) {
        if (!this.controllers[className]) {
            this.controllers[className] = controller
        }

        return this
    }

}

maker = new ControlMaker()

// maker.register('bubbles')
// maker.register('background')
maker.register('entities', Entities)
// maker.register('foreground')

module.exports = maker
