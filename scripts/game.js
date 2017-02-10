(function (root) {

    'use strict'

    class Game {

        constructor(username, canvases, next) {
            log.debug('Player "%s" starting the game...', username)

            this.$background = canvases[0]
            this.$entities   = canvases[1]
            this.$foreground = canvases[2]

            this.cursorGridPosition = []

            this.initMap()
            this.initPathFinder()
            this.initRenderer()
            this.initUpdater()
            this.initPlayer(username)

            // TODO: move this line to others class
            let item = new Item()
            item.setPosition(29 * this.map.tileSize, 0 * this.map.tileSize)
            item.setGridPosition(30, 1)
            this.entities = []
            this.entities.push(this.player)
            this.entities.push(item)

            this.start()
            log.info('Game initialized')
            next.call(this)
        }

        initMap() {
            this.map = new Map()
            log.info('Map initialized')
        }

        initPathFinder() {
            this.pathFinder = new PathFinder()
            log.info('PathFinder initialized')
        }

        initRenderer() {
            this.renderer = new Renderer(this, this.$background, this.$entities, this.$foreground)
            log.info('Renderer initialized')
        }

        initUpdater() {
            this.updater = new Updater(this)
            log.info('Updater initialized')
        }

        initPlayer(username) {
            this.player = new Player(username)
            this.player.setPosition(13 * this.map.tileSize, 8 * this.map.tileSize)
            this.player.setGridPosition(14, 9)
            log.info('Player initialized')
        }

        targetCellChanged(gridX, gridY) {
            return !this.cursorGridPosition
                || (this.cursorGridPosition[0] !== gridX || this.cursorGridPosition[1] !== gridY)
        }

        mousemove(event) {
            let gridX = Math.floor(event.offsetX / this.$foreground.width  * this.map.tilesX)
            let gridY = Math.floor(event.offsetY / this.$foreground.height * this.map.tilesY)

            if (this.targetCellChanged(gridX, gridY)) {
                this.setMouseCoordinate(gridX, gridY)
            }
        }

        setMouseCoordinate(gridX, gridY) {
            this.cursorGridPosition = [gridX, gridY]
            log.debug(this.cursorGridPosition)
        }

        mouseclick() {
            let gridX = this.cursorGridPosition[0]
            let gridY = this.cursorGridPosition[1]
            let start = [this.player.gridX, this.player.gridY]
            let end   = [gridX, gridY]
            let path  = this.pathFinder.findPath(this.map.grid, start, end)

            this.player.moveTo(gridX, gridY, path)
        }



        tick() {
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
