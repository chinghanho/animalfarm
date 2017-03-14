class Orientation {

    constructor(defaultOrientation) {
        this._orientation = defaultOrientation || 'down'
    }

    toString() {
        return this._orientation
    }

    get isRight() {
        return this._orientation === 'right'
    }

    get isLeft() {
        return this._orientation === 'left'
    }

    get isUp() {
        return this._orientation === 'up'
    }

    get isDown() {
        return this._orientation === 'down'
    }

    goUp() {
        return this._orientation = 'up'
    }

    goDown() {
        return this._orientation = 'down'
    }

    goRight() {
        return this._orientation = 'right'
    }

    goLeft() {
        return this._orientation = 'left'
    }

}

module.exports = Orientation
