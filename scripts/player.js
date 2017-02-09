(function (root) {

    'use strict'

    class Player extends Entity {

        constructor(username, x, y) {
            super(x, y)
            this.username = username
        }

    }

    root.Player = Player

})(this)
