(function (root) {

    'use strict'

    class Character extends Entity {

        constructor(options) {
            super(options)

            this.path = null
            this.newDestination = null
            this.isFollowing = null
            this.target = null

            // Callbacks
            this.onRequestPath = null
            this.onAfterStep   = null
            this.onHasMoved    = null
            this.onMoveTo      = null
            this.onStopPathing = null
            this.onFollowing   = null

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
            this.onMoveTo(destination)

            if (this.isMoving()) {
                return this.continueTo(destination)
            }

            let path = this.requestPathfingTo(destination)
            this.followPath(path)
        }

        continueTo(destination) {
            this.newDestination = destination
        }

        followPath(path) {
            // length 0: can't get the pathing arrival there
            // length 1: that means player click on him self
            if (path && (path.length < 2)) {
                return this.idle()
            }

            this.path = path

            if (this.isFollowing) {
                this.onFollowing()
            }

            this.setOrientation()
            this.nextStep()
        }

        hasMoved() {
            this.onHasMoved()
        }

        nextStep() {
            if (this.isDestinationChanged()) {
                let path = this.requestPathfingTo(this.newDestination)
                this.newDestination = null
                this.followPath(path)
                return this.onAfterStep()
            }

            if (this.path.length > 0) {
                let gridX = this.path[this.path.length - 1][0]
                let gridY = this.path[this.path.length - 1][1]
                if (this.gridX === gridX && this.gridY === gridY) {
                    this.onStopPathing()
                    this.idle()
                }
                else {
                    this.path.shift()
                    if (this.path.length > 0) {
                        this.walk()
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
            super.animate(key, speed)
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

        following(target) {
            this.target = target
            this.isFollowing = true
        }

    }

    root.Character = Character

})(this)
