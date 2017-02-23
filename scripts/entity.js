(function (root) {

    'use strict'

    class Entity {

        constructor() {
            this.x     = null
            this.y     = null
            this.gridX = null
            this.gridY = null

            // Callbacks
            this.onSetGridPosition = null
        }

        setPosition(x, y) {
            this.x = x
            this.y = y
        }

        setGridPosition(n, m) {
            this.gridX = n
            this.gridY = m
            if (this.onSetGridPosition) {
                this.onSetGridPosition(n, m)
            }
        }

        setSprite(sprite, defaultKey) {
            this.sprite = sprite
            this.animation = this.sprite.setAnimation(defaultKey)
        }

        animate(key, speed) {
            let anime = this.sprite.animations[key]

            if (!anime) {
                return
            }

            this.animation.extends({
                length: anime.length,
                row:    anime.row,
                speed:  speed
            })
        }

    }

    root.Entity = Entity

})(this)
