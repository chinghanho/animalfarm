(function (root) {

    'use strict'

    class PlayerLogic {

        constructor(game, username) {
            this.game = game
            this.player = new Player(username)

            // Callbacks
            this.player.onRequestPath = this.onRequestPath.bind(this)
            this.player.onHasMoved    = this.onHasMoved.bind(this)
            this.player.onAfterStep   = this.onAfterStep.bind(this)
            this.player.onMoveTo      = this.onMoveTo.bind(this)
            this.player.onFollowing   = this.onFollowing.bind(this)
            this.player.onStopPathing = this.onStopPathing.bind(this)
            this.player.onSetGridPosition = this.onSetGridPosition.bind(this)
        }

        ready() {
            this.player.setGridPosition(13, 28)
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

            this.player.following(entity)
        }

        onFollowing() {
            if (this.player.target instanceof Npc) {
                this.player.path.pop()
            }
        }

        onStopPathing() {
            let self = this
            let target = self.player.target

            if (target && target instanceof Npc) {
                target.talk && target.talk(function (bubble) {
                    self.game.$bubbles.appendChild(this.bubble.element)
                    bubble.element.style.left = target.x - (bubble.element.offsetWidth / 2) + (self.game.map.tileSize / 2) + 'px'
                    bubble.element.style.top  = target.y - (bubble.element.offsetHeight) - 8 + 'px'
                })
            }

            let door
            if (door = self.game.map.isDoor(self.player.gridX, self.player.gridY)) {
                self.game.camera.setGridPosition(door.cameraX, door.cameraY)
                self.game.renderer.drawTerrain()
                self.game.entitiesGrid.unregister(self.player)
                self.game.pathingGrid.unregister(self.player)
                self.player.setGridPosition(door.destX, door.destY)
                self.game.entitiesGrid.register(self.player)
                self.game.pathingGrid.register(self.player)
            }

            self.player.target = null
            self.player.isFollowing = false
        }

        onSetGridPosition(gridX, gridY) {
            this.player.x = (this.player.gridX - this.game.camera.gridX) * this.game.map.tileSize
            this.player.y = (this.player.gridY - this.game.camera.gridY) * this.game.map.tileSize
        }

    }

    root.PlayerLogic = PlayerLogic

})(this)
