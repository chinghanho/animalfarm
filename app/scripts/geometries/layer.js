class Layer {

    constructor(tagName, id) {
        this.elem = this.create(tagName, id)
    }

    create(tagName, id) {
        var elem = document.createElement(tagName)
        elem.id = id
        return elem
    }

    appendTo(container) {
        container.appendChild(this.elem)
        return this
    }

    addTo(game) {
        game.addLayer(this)
        return this
    }

    addControl(controller) {
        controller.addLayer(this)
        return this
    }

}

/**
 * Create the HTML layer.
 * @example
 *
 * Layer('canvas', { id: 'entities' })
 */
function toLayer(tagName, {id}) {
    return new Layer(tagName, id)
}

module.exports = toLayer
