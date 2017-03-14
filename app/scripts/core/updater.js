class Updater {

    constructor(game) {
        this.game = game
    }

    update() {
        let self = this
        self.game.entities.forEach(function (entity) {
            self.updateCharacters(entity)
            self.updateTransitions(entity)
            self.updateAnimations(entity)
        })
    }

    updateCharacters(entity) {
        if (entity instanceof Character) {
            this.updateCharacter(entity)
        }
    }

    updateTransitions(entity) {
        let self = this
        let m = entity.movement
        if (m) {
            if (m.inProgress) {
                m.step(self.game.currentTime)
            }
        }
    }

    updateAnimations(entity) {
        let a = entity.animation
        if (a) {
            if (a.update(this.game.currentTime)) {
                // entity
            }
        }
    }

    updateCharacter(character) {
        let c    = character
        let map = this.game.map

        // Estimate of the movement distance for one update
        let tileSize = map.tileSize
        let tick     = Math.round(tileSize / c.walkSpeed * Math.round(1000 / this.game.renderer.FPS))

        if (c.isMoving() && !c.movement.inProgress) {
            if (c.orientation === 'up') {
                c.movement.start(this.game.currentTime,
                                 this._onMoveY.bind(c), this._onMoveYEnd.bind(c, map),
                                 c.y - tick, c.y - tileSize, c.walkSpeed)
            }

            if (c.orientation === 'right') {
                c.movement.start(this.game.currentTime,
                                 this._onMoveX.bind(c), this._onMoveXEnd.bind(c, map),
                                 c.x + tick, c.x + tileSize, c.walkSpeed)
            }

            if (c.orientation === 'down') {
                c.movement.start(this.game.currentTime,
                                 this._onMoveY.bind(c), this._onMoveYEnd.bind(c, map),
                                 c.y + tick, c.y + tileSize, c.walkSpeed)
            }

            if (c.orientation === 'left') {
                c.movement.start(this.game.currentTime,
                                 this._onMoveX.bind(c), this._onMoveXEnd.bind(c, map),
                                 c.x - tick, c.x - tileSize, c.walkSpeed)
            }
        }
    }

    _onMoveX(x) { this.x = x }
    _onMoveY(y) { this.y = y }

    _onMoveXEnd(map) {
        this.hasMoved()
        let gridX = Math.floor(this.movement.endValue / map.width  * map.tilesX) + map.game.camera.gridX
        this.setGridPoint(gridX, this.gridY)
        this.nextStep()
    }

    _onMoveYEnd(map) {
        this.hasMoved()
        let gridY = Math.floor(this.movement.endValue / map.height  * map.tilesY) + map.game.camera.gridY
        this.setGridPoint(this.gridX, gridY)
        this.nextStep()
    }

}

module.exports = Updater
