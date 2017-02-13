(function (root) {

    'use strict'

    class Player extends Character {

        constructor(username) {
            super()
            this.username = username
        }

    }

    root.Player = Player

})(this)
