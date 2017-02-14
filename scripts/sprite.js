(function (root) {

    'use strict'

    class Sprite {

        constructor(sprite, tileSize) {
            this.id          = sprite.id
            this.image      = sprite.image
            this.width      = sprite.width
            this.height     = sprite.height
            this.animations = sprite.animations
            this._sprite = sprite
            this.tileSize = tileSize
            this.keys = Object.keys(this.animations)
        }

        setAnimation(defaultKey) {
            let anime = this.animations[defaultKey]
            return new Animation(
                this.width,
                this.height,
                anime.row,
                anime.length
            )
        }

    }

    root.Sprite = Sprite

})(this)
