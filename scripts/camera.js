(function (root) {

    'use strict'

    class Camera {

        constructor(game, options) {
            this.game = game
            this.x = 0
            this.y = 0
            this.gridX = 0
            this.gridY = 0
            this.getVisibleTiles = this.getVisibleTiles

            if (options.gridPoint) {
                this.setGridPoint(options.gridPoint)
            }
        }

        setPosition(position) {
            this.x = position[0]
            this.y = position[1]
        }

        setGridPoint(...args) {
            if (args.length > 2 || args.length < 1) {
                throw new Error('Expected 1 or 2 arguments, got ' + args.length + '.')
            }

            if (args.length === 2) {
                this.gridX = args[0]
                this.gridY = args[1]
            }
            else { // args.length === 1
                this.gridX = args[0][0]
                this.gridY = args[0][1]
            }
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
