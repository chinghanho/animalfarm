(function (root) {

    'use strict'

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
                                             (y) => { c.y = y },
                                             ()  => {
                                                 c.hasMoved()
                                                 let gridY = Math.floor(c.movement.endValue / map.height  * map.tilesY)
                                                 c.setGridPosition(c.gridX, gridY)
                                                 c.nextStep()
                                             },
                                             c.y - tick,
                                             c.y - tileSize,
                                             c.walkSpeed)
                }

                if (c.orientation === 'right') {
                    c.movement.start(this.game.currentTime,
                                             (x) => { c.x =  x },
                                             ()  => {
                                                 c.hasMoved()
                                                 let gridX = Math.floor(c.movement.endValue / map.width  * map.tilesX)
                                                 c.setGridPosition(gridX, c.gridY)
                                                 c.nextStep()
                                             },
                                             c.x + tick,
                                             c.x + tileSize,
                                             c.walkSpeed)
                }

                if (c.orientation === 'down') {
                    c.movement.start(this.game.currentTime,
                                             (y) => { c.y =  y },
                                             ()  => {
                                                 c.hasMoved()
                                                 let gridY = Math.floor(c.movement.endValue / map.height  * map.tilesY)
                                                 c.setGridPosition(c.gridX, gridY)
                                                 c.nextStep()
                                             },
                                             c.y + tick,
                                             c.y + tileSize,
                                             c.walkSpeed)
                }

                if (c.orientation === 'left') {
                    c.movement.start(this.game.currentTime,
                                             (x) => { c.x =  x },
                                             ()  => {
                                                 c.hasMoved()
                                                 let gridX = Math.floor(c.movement.endValue / map.width  * map.tilesX)
                                                 c.setGridPosition(gridX, c.gridY)
                                                 c.nextStep()
                                             },
                                             c.x - tick,
                                             c.x - tileSize,
                                             c.walkSpeed)
                }
            }
        }

    }

    root.Updater = Updater

})(this)
