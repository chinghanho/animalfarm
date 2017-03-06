var instance, maker

/**
 * @singleton
 * @example
 *
 * LayerMaker.create('canvas', { id: 'background' })
 * LayerMaker.create('canvas', { id: 'entities'   })
 * LayerMaker.create('canvas', { id: 'foreground' })
 */
class Layer {

    constructor() {
    }

    create(tagName, {id}) {
        var elem
        elem = document.createElement(tagName)
        elem.id = id
        return elem
    }

}

maker = new Layer()

module.exports = maker
