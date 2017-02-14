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
            this.idleSpeed = 200
            this.atkSpeed  = 50
            this.walkSpeed = 200

            // Default
            this.orientation = 'down'

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

            // length 0: can't get the pathing arrival there
            // length 1: that means player click on him self
            if (this.path && (this.path.length < 2)) {
                return this.idle()
            }

            this.setOrientation()
            this.walk()
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
                            this.walk()
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
                this.orientation = 'down'
            }

            if (this.gridX === destX && this.gridY > destY) {
                this.orientation = 'up'
            }

            if (this.gridY === destY && this.gridX > destX) {
                this.orientation = 'left'
            }

            if (this.gridY === destY && this.gridX < destX) {
                this.orientation = 'right'
            }

            if (this.gridX === destX && this.gridY === destY) {
                this.orientation = 'down'
            }

            return this.orientation
        }

        animate(key, speed) {
            key += '_' + this.orientation
            let anime = this.sprite.animations[key]

            if (!anime) {
                return
            }

            this.animation.extends({
                length: anime.length,
                row:    anime.row,
                speed:  speed
            })
        }

        walk() {
            this.setOrientation()
            this.animate('walk', this.walkSpeed)
        }

        idle() {
            this.path = null
            this.setOrientation()
            this.animate('idle', this.idleSpeed)
        }

    }

    root.Character = Character

})(this)
