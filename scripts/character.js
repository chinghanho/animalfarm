(function (root) {

    'use strict'

    class Character extends Entity {

        constructor() {
            super()

            this.path = null
            this.newDestination = null

            // Callbacks
            this.onRequestPath = null
            this.onAfterStep   = null
            this.onHasMoved    = null

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

        idle() {
            this.path = null
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

            // length 0: can't get the pathing arrival there
            // length 1: that means player click on him self
            if (this.path && (this.path.length < 2)) {
                return this.idle()
            }


            this.setOrientation()
        }

        hasMoved() {
            this.onHasMoved()
        }

        nextStep() {
            if (this.isDestinationChanged()) {
                let newPathing = this.requestPathfingTo(this.newDestination)
                if (newPathing.length > 1) {
                    this.path = newPathing
                }
                this.newDestination = null
            }

            if (this.path) {
                if (this.path.length > 0) {
                    let gridX = this.path[this.path.length - 1][0]
                    let gridY = this.path[this.path.length - 1][1]
                    if (this.gridX === gridX && this.gridY === gridY) {
                        this.idle()
                    }
                    else {
                        this.path.shift()
                        if (this.path.length > 0) {
                            this.setOrientation()
                        }
                    }
                }
            }

            this.onAfterStep()
        }

        requestPathfingTo(destination) {
            let start = [this.gridX, this.gridY]

            if (!this.onRequestPath) {
                return log.error('there is not onRequestPath callback')
            }

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
