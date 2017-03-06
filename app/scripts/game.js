class Game {

    constructor(options) {
        this.container = document.getElementById('app')
        this.entity = require('./entities')
        this.camera = require('./camera')
        this.grid = require('./geometries/grid')
        this.layer = require('./geometries/layer')

        this.container.appendChild(this.layer.create('div',    { id: 'bubbles' }))
        this.container.appendChild(this.layer.create('canvas', { id: 'background' }))
        this.container.appendChild(this.layer.create('canvas', { id: 'entities' }))
        this.container.appendChild(this.layer.create('canvas', { id: 'foreground' }))
    }

    pointToGrid() {
        //
    }

    gridToPoint() {
        //
    }

}

new Game({})
