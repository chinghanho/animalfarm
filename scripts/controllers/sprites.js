(function (root) {

    'use strict'

    class SpritesController {

        constructor(game) {
            this.game = game
            this.game.cursor = this.game.images['lipstick'].image
        }

        ready() {
            this._onReady()
        }

        _onReady() {
            for (let key in this.game.sprites) {
                this.game.sprites[key] = new Sprite(this.game.sprites[key], this.game.map.tileSize)
            }
        }

    }

    root.SpritesController = SpritesController

})(this)
