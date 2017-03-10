class GridPoint {

    /**
     * Represents a point on the 2D grid
     * @param  {Number} x grid X
     * @param  {Number} y grid Y
     */
    constructor(gridX, gridY) {
        if (isNaN(gridX) || isNaN(gridY)) {
            throw new Error(`Invalid GridPoint object: (${gridX}, ${gridY}).`)
        }

        if (!Number.isInteger(gridX) || !Number.isInteger(gridY)) {
            throw new Error('gridX, gridY must be Integer.')
        }

        // @property gridX: Number
        // GridX in integer
        this.gridX = gridX

        // @property gridY: Number
        // GridY in integer
        this.gridY = gridY
    }

    add(x, y) {
        this.gridX += x
        this.gridY += y
        return this
    }

    addX(x) {
        this.gridX += x
        return this
    }

    addY(y) {
        this.gridY += y
        return this
    }

    static toGridPoint(a, b) {
        if (a instanceof GridPoint) {
            return a
        }

        if (Array.isArray(a)) {
            return new GridPoint(a[0], a[1])
        }

        return new GridPoint(a, b)
    }

}

module.exports = GridPoint.toGridPoint
