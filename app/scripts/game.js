const Util = require('./utils')

class Game {

    constructor(options) {
        this.container = document.getElementById('app')
        this.entity = require('./entities')
        this.camera = require('./camera')
        this.grid = require('./geometries/grid')
        this.layer = require('./geometries/layer')
        this.control = require('./controls')

        this._layers = {}
    }

    pointToGrid(point) {
        //
    }

    gridToPoint(grid) {
        //
    }

    initLayers() {
        // this.layer('div', { id: 'bubbles' })
        //     .appendTo(this.container).addTo(this)
        //     .addControl(this.control.by('bubbles'))

        // this.layer('canvas', { id: 'background' })
        //     .appendTo(this.container).addTo(this)
        //     .addControl(this.control.by('background'))

        this.layer('canvas', { id: 'entities' })
            .appendTo(this.container).addTo(this)
            .addControl(this.control.by('entities'))

        // this.layer('canvas', { id: 'foreground' })
        //     .appendTo(this.container).addTo(this)
        //     .addControl(this.control.by('foreground'))
    }

    addLayer(layer) {
        var id = Util.stamp(layer)
        this._layers[id] = layer
        return this
    }

    start() {
        this.initLayers()
    }

}

var game = new Game({})
game.start()
