const GridPoint = require('../grid_point')

class Entity {

    constructor() {
        // Callbacks
        // this.onSetGridPosition = null

        // if (options.gridPoint) {
        //     this.setGridPoint(options.gridPoint)
        // }

        // if (options.sprite && options.defaultSprite) {
        //     this.setSprite(options.sprite, options.defaultSprite)
        // }
    }

    setPoint(point) {
        return this._point = point
    }

    set point(point) {
        return this._point = Point(point)
    }

    get point() {
        return this_point
    }

    get x() {
        return this._point.x
    }

    get y() {
        return this._point.y
    }

    setGridPoint(gridPoint) {
        return this.gridPoint = gridPoint
    }

    set gridPoint(gridPoint) {
        return this._gridPoint = GridPoint(gridPoint)
    }

    get gridPoint() {
        return this._gridPoint
    }

    get gridX() {
        return this._gridPoint.gridX
    }

    get gridY() {
        return this._gridPoint.gridY
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
