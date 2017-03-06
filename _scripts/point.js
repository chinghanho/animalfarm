/**
 * Represents a point with x and y coordinates in pixels
 */
class Point {

    /**
     * @param  {Number} x The x coordinate
     * @param  {Number} y The y coordinate
     */
    constructor(x, y) {
        this.x = x
        this.y = y
    }

    add(x, y) {
        this.x += x
        this.y += y
        return this
    }

    addX(x) {
        this.x += x
        return this
    }

    addY(y) {
        this.y += y
        return this
    }

}

/**
 * Create a point object with the given coordinate arguments.
 * @param  {Point|Array|Number} a
 * @param  {Number} [b]
 * @return {Point}
 *
 * @example
 *
 * G.point(13, 7)
 * G.point([13, 7])
 * G.point(G.point(13, 7))
 */
function toPoint(a, b) {
    if (a instanceof Point) {
        return a
    }

    if (Array.isArray(a)) {
        return new Point(a[0], a[1])
    }

    return new Point(a, b)
}

module.exports = toPoint
