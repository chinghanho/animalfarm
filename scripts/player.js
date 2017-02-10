(function (root) {

    'use strict'

    class Player extends Character {

        constructor(username) {
            super()
            this.username = username
            this.color = 'hsla(107, 68%, 55%, 1)'
        }

    }

    root.Player = Player

})(this)
