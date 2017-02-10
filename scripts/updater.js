(function (root) {

    'use strict'

    class Updater {

        constructor(game) {
            this.game = game
        }

        update() {
            this.updateCharacters()
            this.updateTransitions()
        }

        updateCharacters() {
            let that = this
            that.game.entities.forEach(function (entity) {
                if (entity instanceof Character) {
                    that.updateCharacter(entity)
                }
            })
        }

        updateTransitions() {
            let that = this
            that.game.entities.forEach(function (entity) {
                let m = entity.movement
                if (m) {
                    if (m.inProgress) {
                        m.step(that.game.currentTime)
                    }
                }
            })
        }

        updateCharacter(character) {
            // Estimate of the movement distance for one update
            let tileSize = this.game.map.tileSize
            let tick     = Math.round(tileSize / character.moveSpeed * Math.round(1000 / this.game.renderer.FPS))

            if (character.isMoving() && !character.movement.inProgress) {
                if (character.orientation === Types.Orientations.UP) {
                    log.debug('update up')
                    character.movement.start(this.game.currentTime,
                                             (y) => {
                                                let gridY = Math.floor(y / this.game.map.height  * this.game.map.tilesY)
                                                character.y = y
                                                character.gridY = gridY
                                             },
                                             () => {
                                                 character.y = character.movement.endValue
                                                 character.nextStep()
                                             },
                                             character.y - tick,
                                             character.y - tileSize,
                                             character.moveSpeed)
                }

                if (character.orientation === Types.Orientations.RIGHT) {
                    log.debug('update right')
                    character.movement.start(this.game.currentTime,
                                             (x) => {
                                                let gridX = Math.floor(x / this.game.map.width  * this.game.map.tilesX)
                                                character.x =  x
                                                character.gridX = gridX
                                             },
                                             () => {
                                                 character.x = character.movement.endValue
                                                 character.nextStep()
                                             },
                                             character.x + tick,
                                             character.x + tileSize,
                                             character.moveSpeed)
                }

                if (character.orientation === Types.Orientations.DOWN) {
                    log.debug('update down')
                    character.movement.start(this.game.currentTime,
                                             (y) => {
                                                let gridY = Math.floor(y / this.game.map.height  * this.game.map.tilesY)
                                                character.y =  y
                                                character.gridY = gridY
                                             },
                                             () => {
                                                 character.y = character.movement.endValue
                                                 character.nextStep()
                                             },
                                             character.y + tick,
                                             character.y + tileSize,
                                             character.moveSpeed)
                }

                if (character.orientation === Types.Orientations.LEFT) {
                    log.debug('update left')
                    character.movement.start(this.game.currentTime,
                                             (x) => {
                                                let gridX = Math.floor(x / this.game.map.width  * this.game.map.tilesX)
                                                character.x =  x
                                                character.gridX = gridX
                                             },
                                             () => {
                                                 character.x = character.movement.endValue
                                                 character.nextStep()
                                             },
                                             character.x - tick,
                                             character.x - tileSize,
                                             character.moveSpeed)
                }
            }
        }

    }

    root.Updater = Updater

})(this)
