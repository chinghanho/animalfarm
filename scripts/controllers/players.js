(function (root) {

    'use strict'

    class PlayersController {

        constructor(game, username) {
            this.game = game
            this.player = new Player(username)

            // Callbacks
            this.player.onRequestPath = this.onRequestPath.bind(this)
            this.player.onHasMoved    = this.onHasMoved.bind(this)
            this.player.onAfterStep   = this.onAfterStep.bind(this)
            this.player.onMoveTo      = this.onMoveTo.bind(this)
            this.player.onStopPathing = this.onStopPathing.bind(this)

            // properties
            this.player.color = 'hsla(107, 68%, 55%, 1)'
        }

        ready() {
            this._onReady()
        }

        _onReady() {
            this.game.player = this.player
            this.player.setGridPosition(13, 8)
            this.game.entitiesGrid.register(this.player)
            this.game.pathingGrid.register(this.player)
            this.game.entities.push(this.player)
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
                return
            }

            if (entity instanceof Npc) {
                this.player.following(entity)
            }
        }

        onStopPathing() {
            let self = this
            let target = self.player.target

            if (target) {
                target.talk && target.talk(function (bubble) {
                    self.game.$bubbles.appendChild(this.bubble.element)
                    bubble.element.style.left = target.x - (bubble.element.offsetWidth / 2) + (self.game.map.tileSize / 2) + 'px'
                    bubble.element.style.top  = target.y - (bubble.element.offsetHeight) - 8 + 'px'
                })
            }

            self.player.target = null
            self.player.isFollowing = false
        }

    }

    root.PlayersController = PlayersController

})(this)
