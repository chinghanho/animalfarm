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
                    character.movement.start(this.game.currentTime,
                                             (y) => { character.y = y },
                                             ()  => {
                                                 let gridY = Math.floor(character.movement.endValue / this.game.map.height  * this.game.map.tilesY)
                                                 character.setGridPosition(character.gridX, gridY)
                                                 character.nextStep()
                                             },
                                             character.y - tick,
                                             character.y - tileSize,
                                             character.moveSpeed)
                }

                if (character.orientation === Types.Orientations.RIGHT) {
                    character.movement.start(this.game.currentTime,
                                             (x) => { character.x =  x },
                                             ()  => {
                                                 let gridX = Math.floor(character.movement.endValue / this.game.map.width  * this.game.map.tilesX)
                                                 character.setGridPosition(gridX, character.gridY)
                                                 character.nextStep()
                                             },
                                             character.x + tick,
                                             character.x + tileSize,
                                             character.moveSpeed)
                }

                if (character.orientation === Types.Orientations.DOWN) {
                    character.movement.start(this.game.currentTime,
                                             (y) => { character.y =  y },
                                             ()  => {
                                                 let gridY = Math.floor(character.movement.endValue / this.game.map.height  * this.game.map.tilesY)
                                                 character.setGridPosition(character.gridX, gridY)
                                                 character.nextStep()
                                             },
                                             character.y + tick,
                                             character.y + tileSize,
                                             character.moveSpeed)
                }

                if (character.orientation === Types.Orientations.LEFT) {
                    character.movement.start(this.game.currentTime,
                                             (x) => { character.x =  x },
                                             ()  => {
                                                 let gridX = Math.floor(character.movement.endValue / this.game.map.width  * this.game.map.tilesX)
                                                 character.setGridPosition(gridX, character.gridY)
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
