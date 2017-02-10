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
                character.movement.start(this.game.currentTime,
                                         function (x) {
                                             character.x = x
                                         },
                                         function () {
                                             character.x = character.movement.endValue
                                         },
                                         character.x + tick,
                                         character.x + tileSize,
                                         character.moveSpeed)
            }
        }

    }

    root.Updater = Updater

})(this)
