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
            this.player = new Player(username)
            this.player.setPosition(13 * this.map.tileSize, 8 * this.map.tileSize)
            this.player.setGridPosition(14, 9)
            this.entities.push(this.player)
            log.info('Player initialized')
        }

        initEntities() {
            let item = new Item()
            item.setPosition(29 * this.map.tileSize, 0 * this.map.tileSize)
            item.setGridPosition(30, 1)
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
            let gridX = this.cursorGridPosition[0]
              , gridY = this.cursorGridPosition[1]
              , start = [this.player.gridX, this.player.gridY]
              , end   = [gridX, gridY]
              , path  = this.pathFinder.findPath(this.map.grid, start, end)

            this.player.moveTo(gridX, gridY, path)
            console.log(this.player.orientation)
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
