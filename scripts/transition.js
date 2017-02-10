(function (root) {

    'use strict'

    class Transition {

        constructor() {
            this.inProgress = false
        }

        start(currentTime, updateFunction, stopFunction, startValue, endValue, duration) {
            this.startTime      = currentTime
            this.updateFunction = updateFunction
            this.stopFunction   = stopFunction
            this.startValue     = startValue
            this.endValue       = endValue
            this.duration       = duration
            this.inProgress     = true
            this.count          = 0
        }

        step(currentTime) {
            if (this.count > 0) {
                this.count -= 1;
                log.debug(currentTime + ": jumped frame");
            }
            else {
                var elapsed = currentTime - this.startTime;

                if (elapsed > this.duration) {
                    elapsed = this.duration
                }

                var diff = this.endValue - this.startValue;
                var i = this.startValue + ((diff / this.duration) * elapsed);

                i = Math.round(i);

                if (elapsed === this.duration || i === this.endValue) {
                    this.stop();
                    if (this.stopFunction) {
                        this.stopFunction();
                    }
                }
                else if (this.updateFunction) {
                    this.updateFunction(i);
                }
            }
        }

        stop() {
            this.inProgress = false
        }

    }

    root.Transition = Transition

})(this)
