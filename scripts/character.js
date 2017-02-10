(function (root) {

    'use strict'

    var orientations = {
        'UP': 1,
        'RIGHT': 2,
        'DOWN': 3,
        'LEFT': 4
    }

    class Character extends Entity {

        constructor() {
            super()

            this.path = null

            // Speeds
            this.atkSpeed  = 50
            this.moveSpeed = 200

            // Default
            this.orientation = orientations.DOWN

            this.movement = new Transition()
        }

        isMoving() {
            return !(this.path === null)
        }

        moveTo(gridX, gridY, path) {
            if (this.isMoving()) { this.moveEnd() }

            this.path       = path
            this._moveToGrid = [gridX, gridY]

            this.setOrientation()
        }

        moveEnd() {
            this.path       = null
            this._moveToGrid = null
        }

        nextStep() {
            //
        }

        setOrientation() {
            let destX = this.path[1][0]
            let destY = this.path[1][1]

            log.debug(this.gridX, this.gridY)
            log.debug(destX, destY)

            if (this.gridX === destX && this.gridY < destY) {
                this.orientation = orientations.DOWN
            }

            if (this.gridX === destX && this.gridY > destY) {
                this.orientation = orientations.UP
            }

            if (this.gridY === destY && this.gridX > destX) {
                this.orientation = orientations.LEFT
            }

            if (this.gridY === destY && this.gridX < destX) {
                this.orientation = orientations.RIGHT
            }

            return this.orientation
        }

    }

    root.Character = Character

})(this)
