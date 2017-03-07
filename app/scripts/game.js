class Game {

    constructor(options) {
        this.container = document.getElementById('app')
        this.entity = require('./entities')
        this.camera = require('./camera')
        this.grid = require('./geometries/grid')
        this.layer = require('./geometries/layer')
    }

    pointToGrid() {
        //
    }

    gridToPoint() {
        //
    }

    initLayers() {
        this.layer('div',    { id: 'bubbles' }).appendTo(this.container)
        this.layer('canvas', { id: 'background' }).appendTo(this.container)
        this.layer('canvas', { id: 'entities' }).appendTo(this.container)
        this.layer('canvas', { id: 'foreground' }).appendTo(this.container)
    }

    start() {
        this.initLayers()
    }

}

var game = new Game({})
game.start()
