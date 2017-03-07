var instance, maker

/**
 * @singleton
 * @example
 *
 * Layer.create('canvas', { id: 'background' })
 * Layer.create('canvas', { id: 'entities'   })
 * Layer.create('canvas', { id: 'foreground' })
 */
class Layer {

    constructor() {
    }

    create(tagName, {id}) {
        var elem = document.createElement(tagName)
        elem.id = id
        return elem
    }

}

maker = new Layer()

module.exports = maker
