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

            this.renderingGrid = new Grid('number')
            this.pathingGrid   = new Grid('number')
            this.entitiesGrid  = new Grid('object')

            this.pathFinder = new PathFinder()
            this.renderer   = new Renderer(this, this.$background, this.$entities, this.$foreground)
            this.updater    = new Updater(this)

            this.initPlayer(username)
            this.initItems()
            this.initNPCs()

            this.start()
            log.info('Game initialized')
            next.call(this)
        }

        initPlayer(username) {
            let self = this
            self.player = new Player(username)
            self.player.setGridPosition(13, 8)
            self.entities.push(self.player)
            self.player.onRequestPath = function (start, end) {
                return self.pathFinder.findPath(self.pathingGrid, start, end)
            }
            log.info('Player initialized')
        }

        initItems() {
            let item = new Item()
            item.setGridPosition(12, 5)
            this.pathingGrid.register(item)
            this.entities.push(item)
        }

        initNPCs() {
            let npc = new Npc()
            npc.setGridPosition(14, 8)
            this.pathingGrid.register(npc)
            this.entities.push(npc)
        }

        targetCellChanged(gridX, gridY) {
            return !this.cursorGridPosition
                || (this.cursorGridPosition[0] !== gridX || this.cursorGridPosition[1] !== gridY)
        }

        mousemove(event) {
            let gridX = Math.floor(event.offsetX / this.renderingGrid.width  * this.renderingGrid.tilesX)
            let gridY = Math.floor(event.offsetY / this.renderingGrid.height * this.renderingGrid.tilesY)

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
