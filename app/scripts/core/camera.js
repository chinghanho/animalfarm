const Point = require('../geometries/point')
const GridPoint = require('../grid_point')

var _instance

class Camera {

    constructor(options) {
        //
    }

    setPoint(point) {
        return this._point = point
    }

    set point(point) {
        return this._point = Point(point)
    }

    get point() {
        return this_point
    }

    get x() {
        return this._point.x
    }

    get y() {
        return this._point.y
    }

    setGridPoint(gridPoint) {
        return this.gridPoint = gridPoint
    }

    set gridPoint(gridPoint) {
        return this._gridPoint = GridPoint(gridPoint)
    }

    get gridPoint() {
        return this._gridPoint
    }

    get gridX() {
        return this._gridPoint.gridX
    }

    get gridY() {
        return this._gridPoint.gridY
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

    static addTo(game) {
        _instance = _instance || new Camera()
        return _instance
    }

}

module.exports = Camera
