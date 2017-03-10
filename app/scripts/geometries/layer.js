var _layerTypes, _layers

_layerTypes = [
    { tagName: 'div', id: 'bubbles' },
    { tagName: 'canvas', id: 'background' },
    { tagName: 'canvas', id: 'entities' },
    { tagName: 'canvas', id: 'foreground' },
]

_layers = {}

class Layer {

    constructor(tagName, id) {
        this.id = id
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

    /**
     * Get the layer with the given identifier.
     * @param  {String} id - Get the available identifiers through `Layer.keys`.
     * @return {Layer}
     */
    static getLayer(id) {
        return id ? _layers[id] : _layers
    }

    static get keys() {
        return Object.keys(_layers)
    }

    static addTo(game) {
        this.createLayers(function (layer) {
            layer.appendTo(game.container)
            _layers[layer.id] = layer
        })

        return this
    }

    static createLayers(callback) {
        _layerTypes.forEach(function ({ tagName, id }) {
            callback(new Layer(tagName, id))
        })
    }

}

module.exports = Layer
