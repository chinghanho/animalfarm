(function (root) {

    'use strict'

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

    }

    function toGridPoint(a, b) {

    }

    root.GridPoint = toGridPoint

})(this)
