(function (root) {

    'use strict'

    class Bubble {

        constructor(msg, wait) {
            if (!msg) {
                log.error('must provide message for new Bubble')
            }
            this.init(msg, wait)
        }

        init(msg, wait) {
            this.msg = msg
            this.wait = wait || 5000 // ms
            this.isOver = false
            this.element = this.getElement()
            this.countdown()
        }

        countdown() {
            let self = this

            if (self.timer) {
                clearTimeout(self.timer)
            }

            self.timer = setTimeout(function () {
                self.element.remove()
                self.isOver = true
                clearTimeout(self.timer)
            }, self.wait)
        }

        update(msg, wait) {
            this.init(msg, wait)
        }

        destroy() {
            this.element.remove()
        }

        getElement() {
            let elementString = `<div class="bubble">${this.msg}</div>`
            let div = document.createElement('div')
            div.innerHTML = elementString
            return div.childNodes[0]
        }

    }

    root.Bubble = Bubble

})(this)
