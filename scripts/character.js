(function (root) {

    'use strict'

    class Character extends Entity {

        constructor() {
            super()

            this.path = null

            // Speeds
            this.atkSpeed  = 50
            this.moveSpeed = 200

            // Default
            this.orientation = Types.Orientations.DOWN

            this.movement = new Transition()
        }

        isMoving() {
            return !(this.path === null)
        }

        moveTo(path) {
            this.path = path
            this.setOrientation()
        }

        nextStep() {
            if (this.path.length > 0) {
                let gridX = this.path[this.path.length - 1][0]
                let gridY = this.path[this.path.length - 1][1]
                if (this.gridX === gridX && this.gridY === gridY) {
                    this.path = null
                    log.debug('path null')
                }
                else {
                    this.path.shift()
                    if (this.path.length > 0) {
                        this.setOrientation()
                    }
                }
            }

        }

        setOrientation() {
            let destX = this.path[0][0]
            let destY = this.path[0][1]

            if (this.gridX === destX && this.gridY < destY) {
                this.orientation = Types.Orientations.DOWN
                log.debug('DOWN')
            }

            if (this.gridX === destX && this.gridY > destY) {
                this.orientation = Types.Orientations.UP
                log.debug('UP')
            }

            if (this.gridY === destY && this.gridX > destX) {
                this.orientation = Types.Orientations.LEFT
                log.debug('LEFT')
            }

            if (this.gridY === destY && this.gridX < destX) {
                this.orientation = Types.Orientations.RIGHT
                log.debug('RIGHT')
            }

            if (this.gridX === destX && this.gridY === destY) {
                this.orientation = Types.Orientations.DOWN
                log.debug('IDLE')
            }

            log.debug(this.orientation)
            return this.orientation
        }

    }

    root.Character = Character

})(this)
