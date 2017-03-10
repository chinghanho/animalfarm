const Renderer = require('./core/renderer')
const Map = require('./core/map')
const Layer = require('./geometries/layer')
const Grid = require('./geometries/grid')
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
     *     layer // the current layer being processed in the `layer.getLayer()` array.
     *     index // the index of the current layer.
     * })
     */
    forEachLayers(iterator) {
        return this.layer.getLayer().forEach(iterator)
    }

    load(module) {
        return module.addTo(this)
    }

    start() {
        this.layer = this.load(Layer)
        this.map = this.load(Map)
        this.grid = this.load(Grid)
        this.renderer = this.load(Renderer)
        // .init(Control)
    }

}

var game = new Game({})
game.start()
