(function (root) {

    'use strict'

    class PlayersController {

        constructor(game) {
            this.game = game
            this.player = new Player(username)
            this.player.setGridPosition(13, 8)

            this.game.entitiesGrid.register(this.player)
            this.game.pathingGrid.register(this.player)
            this.game.entities.push(this.player)

            // Callbacks
            this.player.onRequestPath = this.onRequestPath.bind(this)
            this.player.onHasMoved = this.onHasMoved.bind(this)
            this.player.onAfterStep = this.onAfterStep.bind(this)
        }

        onRequestPath(start, end) {
            return this.game.pathFinder.findPath(start, end)
        }

        onHasMoved() {
            this.game.entitiesGrid.unregister(this.player)
            this.game.pathingGrid.unregister(this.player)
        }

        onAfterStep() {
            this.game.entitiesGrid.register(this.player)
            this.game.pathingGrid.register(this.player)
        }

    }

    root.PlayersController = PlayersController

})(this)
