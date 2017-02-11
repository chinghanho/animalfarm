(function (root) {

    'use strict'

    class Entity {

        constructor() {
            this.x     = null
            this.y     = null
            this.gridX = null
            this.gridY = null
        }

        setPosition(x, y) {
            this.x = x
            this.y = y
        }

        setGridPosition(n, m) {
            this.gridX = n
            this.gridY = m

            this.setPosition(n * 32, m * 32)
        }

    }

    root.Entity = Entity

})(this)
