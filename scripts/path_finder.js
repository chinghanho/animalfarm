(function (root) {

    'use strict'

    class PathFinder {

        constructor(game) {
            this.game = game
        }

        findPath(grid, start, end) {
            if (grid instanceof Grid) { grid = grid.grid }

            return AStar(grid, start, end)
        }

    }

    root.PathFinder = PathFinder

})(this)
