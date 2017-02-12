(function (root) {

    'use strict'

    class Npc extends Character {

        constructor(kind) {
            super()
            this.color = 'hsla(360, 79%, 64%, 1)'
            this.kind = kind
        }

    }

    root.Npc = Npc

})(this)
