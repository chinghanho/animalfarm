(function (root) {

    'use strict'

    class Sprite {

        constructor(sprite) {
            this.id          = sprite.id
            this._image      = sprite.image
            this._width      = sprite.width
            this._height     = sprite.height
            this._animations = sprite.animations
            this._sprite = sprite

            this.keys = Object.keys(this._animations)
        }

    }

    root.Sprite = Sprite

})(this)
