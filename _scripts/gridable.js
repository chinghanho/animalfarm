(function (root) {

    'use strict'

    var Gridable

    Gridable = {
        setGridPoint(...args) {
            if (args.length > 2 || args.length < 1) {
                throw new Error('Expected 1 or 2 arguments, got ' + args.length + '.')
            }

            var gridX, gridY

            if (args.length === 2) {
                gridX = args[0]
                gridY = args[1]
                this.gridX = gridX
                this.gridY = gridY
            }
            else { // args.length === 1
                gridX = args[0][0]
                gridY = args[0][1]
                this.gridX = gridX
                this.gridY = gridY
            }

            if (this.onSetGridPosition) {
                this.onSetGridPosition(gridX, gridY)
            }
        },

        /*
            deprecate soon...
         */
        setGridPosition(n, m) {
            log.debug('deprecate soon...')
            this.gridX = n
            this.gridY = m
            if (this.onSetGridPosition) {
                this.onSetGridPosition(n, m)
            }
        }
    }

    root.Gridable = Gridable

})(this)
