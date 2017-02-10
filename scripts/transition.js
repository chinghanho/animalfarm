(function (root) {

    'use strict'

    class Transition {

        constructor() {
            this.progressing = false
        }

        isProgressing() {
            return this.progressing
        }

        start() {
            this.progressing = true
        }

        stop() {
            this.progressing = false
        }

    }

    root.Transition = Transition

})(this)
