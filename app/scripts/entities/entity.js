const GridPoint = require('../grid_point')

class Entity {

    constructor() {

        // includes(this, Gridable)

        this.x     = 0
        this.y     = 0

        // Callbacks
        // this.onSetGridPosition = null

        // if (options.gridPoint) {
        //     this.setGridPoint(options.gridPoint)
        // }

        // if (options.sprite && options.defaultSprite) {
        //     this.setSprite(options.sprite, options.defaultSprite)
        // }
    }

    setGridPoint(gridPoint) {
        return this.gridPoint = GridPoint(gridPoint)
    }

    get gridX() {
        return this.gridPoint.gridX
    }

    get gridY() {
        return this.gridPoint.gridY
    }

    // setPosition(x, y) {
    //     this.x = x
    //     this.y = y
    // }

    // setSprite(sprite, defaultKey) {
    //     this.sprite = sprite
    //     this.animation = this.sprite.setAnimation(defaultKey)
    // }

    // animate(key, speed) {
    //     let anime = this.sprite.animations[key]

    //     if (!anime) {
    //         return
    //     }

    //     this.animation.extends({
    //         length: anime.length,
    //         row:    anime.row,
    //         speed:  speed
    //     })
    // }

}

module.exports = Entity
