(function (root) {

    'use strict'

    class Camera {

        constructor(game) {
            this.game = game
            this.x = 0
            this.y = 0
            this.gridX = 0
            this.gridY = 0
            this.getVisibleTiles = this.getVisibleTiles
        }

        setPosition(position) {
            this.x = position[0]
            this.y = position[1]
        }

        setGridPosition(n, m) {
            this.gridX = n
            this.gridY = m
            this.setPosition(n * 32, m * 32)
        }

        forEachVisiblePositions(callback) {
            let index = 0
            for(let y = this.gridY, maxY = y + 20; y < maxY; y++) {
                for(let x = this.gridX, maxX = x + 30; x < maxX ; x++) {
                    callback.call(this, x, y, index)
                    index++
                }
            }
        }

    }

    root.Camera = Camera

})(this)
