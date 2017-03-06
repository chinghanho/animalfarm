const Point = require('./point')

class Camera {

    constructor(game, options) {

        // includes(this, Gridable)

        this.game = game
        this.point = Point(0, 0)
        this.gridX = 0
        this.gridY = 0
        // this.getVisibleTiles = this.getVisibleTiles

        // if (options.gridPoint) {
        //     this.setGridPoint(options.gridPoint)
        // }
    }

    get x() {
        return this.point.x
    }

    get y() {
        return this.point.y
    }

    setPosition(position) {
        this.x = position[0]
        this.y = position[1]
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

module.exports = Camera
