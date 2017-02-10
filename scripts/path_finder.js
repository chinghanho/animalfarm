(function (root) {

    'use strict'

    class PathFinder {

        constructor() {}

        findPath(grid, start, end) {
            return AStar(grid, start, end)
        }

    }

    root.PathFinder = PathFinder

})(this)
