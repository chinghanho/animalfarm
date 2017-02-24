(function (root) {

    'use strict'

    class Entity {

        constructor(options) {
            this.x     = 0
            this.y     = 0
            this.gridX = 0
            this.gridY = 0

            // Callbacks
            this.onSetGridPosition = null

            if (options.gridPoint) {
                this.setGridPoint(options.gridPoint)
            }

            if (options.sprite && options.defaultSprite) {
                this.setSprite(options.sprite, options.defaultSprite)
            }
        }

        setPosition(x, y) {
            this.x = x
            this.y = y
        }

        /*
            deprecate soon...
         */
        setGridPosition(n, m) {
            this.gridX = n
            this.gridY = m
            if (this.onSetGridPosition) {
                this.onSetGridPosition(n, m)
            }
        }

        setGridPoint(...args) {
            if (args.length > 2 || args.length < 1) {
                throw new Error('Expected 1 or 2 arguments, got ' + args.length + '.')
            }

            if (args.length === 2) {
                this.gridX = args[0]
                this.gridY = args[1]
            }
            else { // args.length === 1
                this.gridX = args[0][0]
                this.gridY = args[0][1]
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
