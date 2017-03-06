(function (root) {

    'use strict'

    class ItemLogic {

        constructor(game) {
            this.game = game
        }

        ready() {
            this._onReady()
        }

        _onReady() {
            this.game.createItem([12, 26])
        }

    }

    root.ItemLogic = ItemLogic

})(this)
