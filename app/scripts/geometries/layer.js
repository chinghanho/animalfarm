var layers = [
    { tagName: 'div', id: 'bubbles' },
    { tagName: 'canvas', id: 'background' },
    { tagName: 'canvas', id: 'entities' },
    { tagName: 'canvas', id: 'foreground' },
]

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

    static addTo(game) {
        this.createLayers(function (layer) {
            layer.appendTo(game.container)
            game.addLayer(layer)
        })

        return this
    }

    static createLayers(callback) {
        layers.forEach(function ({ tagName, id }) {
            callback(new Layer(tagName, id))
        })
    }

}

module.exports = Layer
