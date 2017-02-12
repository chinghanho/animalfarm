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
            let c    = character
            let grid = this.game.renderingGrid

            // Estimate of the movement distance for one update
            let tileSize = grid.tileSize
            let tick     = Math.round(tileSize / c.moveSpeed * Math.round(1000 / this.game.renderer.FPS))

            if (c.isMoving() && !c.movement.inProgress) {
                if (c.orientation === Types.Orientations.UP) {
                    c.movement.start(this.game.currentTime,
                                             (y) => { c.y = y },
                                             ()  => {
                                                 let gridY = Math.floor(c.movement.endValue / grid.height  * grid.tilesY)
                                                 c.setGridPosition(c.gridX, gridY)
                                                 c.nextStep()
                                             },
                                             c.y - tick,
                                             c.y - tileSize,
                                             c.moveSpeed)
                }

                if (c.orientation === Types.Orientations.RIGHT) {
                    c.movement.start(this.game.currentTime,
                                             (x) => { c.x =  x },
                                             ()  => {
                                                 let gridX = Math.floor(c.movement.endValue / grid.width  * grid.tilesX)
                                                 c.setGridPosition(gridX, c.gridY)
                                                 c.nextStep()
                                             },
                                             c.x + tick,
                                             c.x + tileSize,
                                             c.moveSpeed)
                }

                if (c.orientation === Types.Orientations.DOWN) {
                    c.movement.start(this.game.currentTime,
                                             (y) => { c.y =  y },
                                             ()  => {
                                                 let gridY = Math.floor(c.movement.endValue / grid.height  * grid.tilesY)
                                                 c.setGridPosition(c.gridX, gridY)
                                                 c.nextStep()
                                             },
                                             c.y + tick,
                                             c.y + tileSize,
                                             c.moveSpeed)
                }

                if (c.orientation === Types.Orientations.LEFT) {
                    c.movement.start(this.game.currentTime,
                                             (x) => { c.x =  x },
                                             ()  => {
                                                 let gridX = Math.floor(c.movement.endValue / grid.width  * grid.tilesX)
                                                 c.setGridPosition(gridX, c.gridY)
                                                 c.nextStep()
                                             },
                                             c.x - tick,
                                             c.x - tileSize,
                                             c.moveSpeed)
                }
            }
        }

    }

    root.Updater = Updater

})(this)
