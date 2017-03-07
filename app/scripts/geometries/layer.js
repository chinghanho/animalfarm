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

}

var layers = [
    { tagName: 'div', id: 'bubbles' },
    { tagName: 'div', id: 'background' },
    { tagName: 'div', id: 'entities' },
    { tagName: 'div', id: 'foreground' },
]

class LayerFactory {

    static addTo(game) {
        var self = this
        layers.forEach(function ({ tagName, id }) {
            var layer = new Layer(tagName, id)
            layer.appendTo(game.container)
            game.addLayer(layer)
        })
    }

}

module.exports = LayerFactory
