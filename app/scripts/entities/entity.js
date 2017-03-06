class Entity {

    constructor(options) {

        includes(this, Gridable)

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

module.exports = Entity
