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

            // Speeds
            this.atkSpeed  = 50
            this.moveSpeed = 200

            this.orientation = orientations.DOWN
            this.moving = false

            this.movement = new Transition()
        }

        moveTo(gridX, gridY, path) {
            this.moving      = true
            this._path       = path
            this._moveToGrid = [gridX, gridY]
        }

        moveEnd() {
            this.moving      = false
            this._path       = null
            this._moveToGrid = null
        }

        setOrientation(orientation) {
            if (orientation) { this.orientation = orientation }
            return this
        }

    }

    root.Character = Character

})(this)
