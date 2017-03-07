var layersData, layers

layersData = [
    { tagName: 'div', id: 'bubbles' },
    { tagName: 'canvas', id: 'background' },
    { tagName: 'canvas', id: 'entities' },
    { tagName: 'canvas', id: 'foreground' },
]

layers = []

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

    static get getList() {
        return layers
    }

    static addTo(game) {
        game.layer = this
        this.createLayers(function (layer) {
            layer.appendTo(game.container)
            layers.push(layer)
        })

        return this
    }

    static createLayers(callback) {
        layersData.forEach(function ({ tagName, id }) {
            callback(new Layer(tagName, id))
        })
    }

}

module.exports = Layer
