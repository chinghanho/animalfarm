(function (root) {

    'use strict'

    class Game {

        constructor(username, canvases, next) {
            log.debug('Player "%s" starting the game...', username)

            this.$background = canvases[0]
            this.$entities   = canvases[1]
            this.$foreground = canvases[2]

            this.cursorGridPosition = []
            this.entities = []

            this.map        = new _Map()
            this.pathFinder = new PathFinder()
            this.renderer   = new Renderer(this, this.$background, this.$entities, this.$foreground)
            this.updater    = new Updater(this)

            this.initPlayer(username)
            this.initEntities()

            this.start()
            log.info('Game initialized')
            next.call(this)
        }

        initPlayer(username) {
            let self = this

            self.player = new Player(username)
            self.player.setGridPosition(13, 8)
            self.player.setPosition(self.player.gridX * self.map.tileSize, self.player.gridY * self.map.tileSize)
            self.entities.push(self.player)

            self.player.onRequestPath = function (start, end) {
                return self.pathFinder.findPath(self.map.grid, start, end)
            }

            log.info('Player initialized')
        }

        initEntities() {
            let item = new Item()
            item.setGridPosition(29, 0)
            item.setPosition(item.gridX * this.map.tileSize, item.gridY * this.map.tileSize)
            this.entities.push(item)
        }

        targetCellChanged(gridX, gridY) {
            return !this.cursorGridPosition
                || (this.cursorGridPosition[0] !== gridX || this.cursorGridPosition[1] !== gridY)
        }

        mousemove(event) {
            let gridX = Math.floor(event.offsetX / this.map.width  * this.map.tilesX)
            let gridY = Math.floor(event.offsetY / this.map.height * this.map.tilesY)

            if (this.targetCellChanged(gridX, gridY)) {
                this.setMouseCoordinate(gridX, gridY)
            }
        }

        setMouseCoordinate(gridX, gridY) {
            this.cursorGridPosition = [gridX, gridY]
            log.debug(this.cursorGridPosition)
        }

        /**
         * Process game logic when the player triggers a click event during the game.
         */
        click() {
            let destination = [this.cursorGridPosition[0], this.cursorGridPosition[1]]
            this.player.moveTo(destination)
        }

        tick() {
            this.currentTime = new Date().getTime()

            this.renderer.renderFrame()
            this.updater.update()
            requestAnimFrame(this.tick.bind(this))
        }

        start() {
            this.tick()
            this.started = true
            log.info('Game Started')
        }

    }

    root.Game = Game

})(this)
