const Renderer = require('./core/renderer')
const Layer = require('./geometries/layer')
const Util = require('./utils')

class Game {

    constructor(options) {
        this.container = document.getElementById('app')
        // this.entity = require('./entities')
        // this.camera = require('./camera')
        // this.grid = require('./geometries/grid')
        // this.control = require('./controls')
    }

    pointToGrid(point) {
        //
    }

    gridToPoint(grid) {
        //
    }

    /**
     * Executed a provided iterator once for each layers.
     *
     * @example
     *
     * game.forEachLayers(function(layer, index) {
     *     layer // the current layer being processed in the `layer.getList` array.
     *     index // the index of the current layer.
     * })
     */
    forEachLayers(iterator) {
        return this.layer.getList.forEach(iterator)
    }

    init(module) {
        module.addTo(this)
        return this
    }

    start() {
        // this.init(Map)
        //     .init(Layer)
        //     .init(Renderer)
        //     .init(Control)
        this.init(Layer)
            .init(Renderer)
    }

}

var game = new Game({})
game.start()
