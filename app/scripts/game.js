const Layer = require('./geometries/layer')
const Map = require('./core/map')
const Grid = require('./geometries/grid')
const Renderer = require('./core/renderer')
const Control = require('./control')
const Util = require('./utils')

const Player = require('./entities/player')

class Game {

    constructor(options) {
        this.container = document.getElementById('app')
        // this.entity = require('./entities')
        // this.camera = require('./camera')
    }

    action(actionName) {
        console.log('action name: %s', actionName)
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
        this.map = this.load(Map).onLoaded(this._onMapLoaded.bind(this))
        this.grid = this.load(Grid)
        this.renderer = this.load(Renderer)
        this.control = this.load(Control)
        this.player = new Player()
        this.player.spawn([13, 28])
    }

    _onMapLoaded(map) {
        if (map.isValid) {
            return
        }
        throw new Error('Not Implement')
    }

}

// Let's play a game!
var game = new Game({})
game.start()
