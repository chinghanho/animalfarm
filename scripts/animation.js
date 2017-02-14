(function (root) {

    'use strict'

    class Animation {

        constructor(speed, width, height, row, length) {
            this.speed  = speed
            this.width  = width
            this.height = height
            this.row    = row
            this.length = length
            this.counter = 0
            this.animated = false
            this.reset()
            // show the first frame, prevent started with x:0, y:0
            if (!this.animated) {
                this.nextFrame()
            }
        }

        nextFrame() {
            let index = this.currentFrame.index
            index = (index < this.length - 1) ? index + 1 : 0

            this.currentFrame.x = this.width * index
            this.currentFrame.y = this.height * (this.row - 1)
            this.currentFrame.index = index
        }

        isTimeToNextFrame() {
            this.counter++
            let times = 60 / (1000 / this.speed)
            let result = (this.counter % (times / this.length)) < 1
            return result
        }

        update(currentTime) {
            if (this.isTimeToNextFrame()) {
                if (!this.animated) {
                    this.animated = true
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
            this.counter = 0
        }

    }

    root.Animation = Animation

})(this)
