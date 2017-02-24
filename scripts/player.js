(function (root) {

    'use strict'

    class Player extends Character {

        constructor(username, options) {
            super(options)
            this.username = username
        }

    }

    root.Player = Player

})(this)
