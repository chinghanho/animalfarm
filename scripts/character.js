(function (root) {

    'use strict'

    class Character extends Entity {

        constructor() {
            super()

            this.path = null
            this.newDestination = null

            // Callbacks
            this.onRequestPath = null

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

        isDestinationChanged() {
            return this.newDestination !== null
        }

        moveTo(destination) {
            if (this.isMoving()) {
                this.newDestination = destination
                return
            }

            this.path = this.requestPathfingTo(destination)
            this.setOrientation()
        }

        nextStep() {
            if (this.isDestinationChanged()) {
                this.path = this.requestPathfingTo(this.newDestination)
                this.newDestination = null
            }

            if (this.path && this.path.length > 0) {
                let gridX = this.path[this.path.length - 1][0]
                let gridY = this.path[this.path.length - 1][1]
                if (this.gridX === gridX && this.gridY === gridY) {
                    this.path = null
                }
                else {
                    this.path.shift()
                    if (this.path.length > 0) {
                        this.setOrientation()
                    }
                }
            }
        }

        requestPathfingTo(destination) {
            let start = [this.gridX, this.gridY]
            if (this.gridX === destination[0] && this.gridY === destination[1]) { return null }
            return this.onRequestPath(start, destination)
        }

        setOrientation() {
            if (!this.path) { return }

            let destX = this.path[0][0]
            let destY = this.path[0][1]

            if (destX === this.gridX && destY === this.gridY) {
                destX = this.path[1][0]
                destY = this.path[1][1]
            }

            if (this.gridX === destX && this.gridY < destY) {
                this.orientation = Types.Orientations.DOWN
            }

            if (this.gridX === destX && this.gridY > destY) {
                this.orientation = Types.Orientations.UP
            }

            if (this.gridY === destY && this.gridX > destX) {
                this.orientation = Types.Orientations.LEFT
            }

            if (this.gridY === destY && this.gridX < destX) {
                this.orientation = Types.Orientations.RIGHT
            }

            if (this.gridX === destX && this.gridY === destY) {
                this.orientation = Types.Orientations.DOWN
            }

            return this.orientation
        }

    }

    root.Character = Character

})(this)