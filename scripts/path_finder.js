(function (root) {

    'use strict'

    class PathFinder {

        constructor(game) {
            this.game = game
        }

        findPath(start, end) {

            let entity, pathing, game

            game   = this.game
            entity = game.entitiesGrid.get(end)

            if (entity instanceof Character) {
                game.pathingGrid.set(end, 0)
                pathing = this._getPath(start, end)
                game.pathingGrid.set(end, 1)
            }
            else {
                pathing = this._getPath(start, end)
            }

            return pathing
        }

        _getPath(start, end) {
            return AStar(this.game.pathingGrid.grid, start, end)
        }

    }

    root.PathFinder = PathFinder

})(this)
