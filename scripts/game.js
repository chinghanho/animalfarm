(function (root) {

    'use strict'

    class Game {

        constructor(username, elements, callbacks) {

            callbacks.onBeforeStarted(this)

            this.$background = elements[0]
            this.$entities   = elements[1]
            this.$foreground = elements[2]
            this.$bubbles    = elements[3]

            this.cursorGridPosition = []
            this.cursorPosition = []
            this.entities = []
            this.renderingGrid = null
            this.pathingGrid   = null
            this.entitiesGrid  = null

            // assigned from app.js file
            this.images
            this.sprites
            this.mapData

            this.initMap()
            this.initPlayer(username)
            this.init()

            this.pathFinder = new PathFinder(this)
            this.renderer   = new Renderer(this, this.$background, this.$entities, this.$foreground)
            this.updater    = new Updater(this)
            this.camera     = new Camera(this)

            this.start()
            log.info('Game initialized')
            callbacks.onAfterStarted(this)
        }

        initMap() {
            let self = this
            self.map = new _Map(self)
            self.renderingGrid = new Grid('number', self.map)
            self.pathingGrid   = new Grid('number', self.map)
            self.entitiesGrid  = new Grid('object', self.map)

            // filling rendering grid
            self.map.data.data.forEach(function (id, index) {
                let gridX = index % 100
                let gridY = Math.floor(index / 100)

                if (Array.isArray(id)) {
                    self.renderingGrid.set([gridX, gridY], id)
                }

                self.renderingGrid.set([gridX, gridY], id)
            })

            // blockings
            self.map.data.blockings.forEach(function (blocking, index) {
                let gridX = index % 100
                let gridY = Math.floor(index / 100)

                if (blocking !== 0) {
                    self.pathingGrid.set([gridX, gridY], 1)
                }
            })
        }

        forEachVisibleRenderingGrid(callback) {
            let self = this
            self.camera.forEachVisiblePositions(function (x, y, index) {
                callback.call(self, self.renderingGrid.get([x, y]), index)
            })
        }

        initPlayer(username) {
            this.playerLogic = new PlayerLogic(this, username)
            this.player      = this.playerLogic.player
        }

        init() {

            this.cursor = this.images['lipstick'].image
            for (let key in this.sprites) {
                this.sprites[key] = new Sprite(this.sprites[key], this.map.tileSize)
            }

            this.controllers = {
                stack: [],
                ready: () => this.controllers.stack.forEach((controller) => controller.ready()),
                add: (controller) => this.controllers.stack.push(controller)
            }

            let itemLogic   = new ItemLogic(this)
            let npcLogic    = new NpcLogic(this)

            this.controllers.add(itemLogic)
            this.controllers.add(npcLogic)
        }

        targetCellChanged(gridX, gridY) {
            return !this.cursorGridPosition
                || (this.cursorGridPosition[0] !== gridX || this.cursorGridPosition[1] !== gridY)
        }

        mousemove(event) {
            var gridX, gridY

            this.setMousePosition(event.offsetX, event.offsetY)

            gridX = Math.floor(this.cursorPosition[0] / this.map.width  * this.map.tilesX)
            gridY = Math.floor(this.cursorPosition[1] / this.map.height * this.map.tilesY)

            if (this.targetCellChanged(gridX, gridY)) {
                this.setMouseGridPosition(gridX, gridY)
                this.cursor = (this.entitiesGrid.get([gridX, gridY]) instanceof Npc) ? this.images['talk'].image : this.images['lipstick'].image
            }
        }

        setMousePosition(x, y) {
            this.cursorPosition = [event.offsetX, event.offsetY]
        }

        setMouseGridPosition(gridX, gridY) {
            this.cursorGridPosition = [gridX + this.camera.gridX, gridY + this.camera.gridY]
            log.debug(this.cursorGridPosition)
        }

        /**
         * Process game logic when the player triggers a click event during the game.
         */
        click() {
            this.player.moveTo(this.cursorGridPosition)
        }

        tick() {
            this.currentTime = new Date().getTime()
            this.renderer.renderFrame()
            this.updater.update()
            requestAnimFrame(this.tick.bind(this))
        }

        start() {
            this.renderer.ready()
            this.camera.setGridPosition(0, 20)
            this.playerLogic.ready()
            this.controllers.ready()
            this.renderer.drawTerrain()
            this.tick()
            this.started = true
            log.info('Game Started')
        }

    }

    root.Game = Game

})(this)
