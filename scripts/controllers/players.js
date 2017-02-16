(function (root) {

    'use strict'

    class PlayersController {

        constructor(game, username) {
            this.game = game
            this.player = new Player(username)
            this.player.setGridPosition(13, 8)

            this.game.entitiesGrid.register(this.player)
            this.game.pathingGrid.register(this.player)
            this.game.entities.push(this.player)

            // Callbacks
            this.player.onRequestPath = this.onRequestPath.bind(this)
            this.player.onHasMoved    = this.onHasMoved.bind(this)
            this.player.onAfterStep   = this.onAfterStep.bind(this)
            this.player.onMoveTo      = this.onMoveTo.bind(this)
            this.player.onStopPathing = this.onStopPathing.bind(this)

            // properties
            this.player.color = 'hsla(107, 68%, 55%, 1)'

            this.player.setSprite(this.game.sprites['players'], 'idle_down')
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

        onMoveTo(destination) {
            let entity = this.game.entitiesGrid.get(destination)
            if (isObjectBlank(entity)) {
                log.debug('no entity')
                return
            }
            this.player.following(entity)
        }

        onStopPathing() {
            let target = this.player.target

            if (!target) {
                return
            }

            if (target.talk) {
                log.debug(target.talk())
            }

            this.player.target = null
            this.player.isFollowing = false
        }

    }

    root.PlayersController = PlayersController

})(this)
