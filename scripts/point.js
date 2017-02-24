(function (root) {

    'use strict'

    class Point {

        /**
         * Represents a point with x and y coordinates in pixels
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

    root.Point = Point

})(this)
