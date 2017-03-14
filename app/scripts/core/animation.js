class Animation {

    constructor(width, height, row, length) {
        this.sprite = {
            width:  width,
            height: height,
            row:    row,
            length: length
        }
        this._counter = 0
        this._animated = false
        this.reset()
        // show the first frame, prevent started with x:0, y:0
        if (!this._animated) {
            this.nextFrame()
        }
    }

    extends(params) {
        Object.assign(this.sprite, params)
        return this
    }

    setSpeed(speed) {
        this.sprite.speed = speed
    }

    nextFrame() {
        let index = this.currentFrame.index
        index = (index < this.sprite.length - 1) ? index + 1 : 0

        this.currentFrame.x = this.sprite.width * index
        this.currentFrame.y = this.sprite.height * (this.sprite.row - 1)
        this.currentFrame.index = index
    }

    isTimeToNextFrame(time) {
        this._counter++
        let times = 60 / (1000 / this.sprite.speed)
        let result = (this._counter % (times / this.sprite.length)) < 1
        return result
    }

    update(time) {
        if (this.isTimeToNextFrame(time)) {
            if (!this._animated) {
                this._animated = true
            }
            this.nextFrame()
            return true
        }
        else {
            return false
        }
    }

    reset() {
        this.currentFrame = {
            index: 0,
            x: 0,
            y: 0
        }
        this._counter = 0
    }

}

module.exports = Animation
