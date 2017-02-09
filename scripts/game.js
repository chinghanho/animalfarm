(function (root) {

    'use strict'

    class Game {

        constructor(username, canvases, next) {
            logger.log('Player "%s" starting the game...', username)

            this.$background = canvases[0]
            this.$entities   = canvases[1]
            this.$foreground = canvases[2]

            this.currentTargetCellCoordinate = []

            this.initRenderer()
            this.initPlayer(username)

            // TODO: move this line to others class
            this.renderer.drawEntityAt(this.player.x, this.player.y, 'hsla(107, 68%, 55%, 1)')

            this.started = true
            logger.log('Game initialized')
            next.call(this)
        }

        initRenderer() {
            this.renderer = new Renderer(this, this.$background, this.$entities, this.$foreground)
        }

        initPlayer(username) {
            return this.player = new Player(username, 14, 9)
        }

        targetCellChanged(x, y) {
            return !this.currentTargetCellCoordinate || (this.currentTargetCellCoordinate[0] !== x || this.currentTargetCellCoordinate[1] !== y)
        }

        updateCoordinate(event) {
            let x = Math.floor(event.offsetX / this.$foreground.width * 30)
            let y = Math.floor(event.offsetY / this.$foreground.height * 20)

            if (this.targetCellChanged(x, y)) {
                this.currentTargetCellCoordinate = [x, y]
                this.renderer.drawCell(x, y, 'hsla(3, 71%, 56%, 1)')
            }
        }

    }

    root.Game = Game

})(this)
