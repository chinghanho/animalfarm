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
        this.container.appendChild(this.layer.create('div',    { id: 'bubbles' }))
        this.container.appendChild(this.layer.create('canvas', { id: 'background' }))
        this.container.appendChild(this.layer.create('canvas', { id: 'entities' }))
        this.container.appendChild(this.layer.create('canvas', { id: 'foreground' }))
    }

    start() {
        this.initLayers()
    }

}

new Game({})
