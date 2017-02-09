(function (root) {

    'use strict'

    class Entity {

        constructor(x, y) {
            this.x = x || 0
            this.y = y || 0
        }

    }

    root.Entity = Entity

})(this)
