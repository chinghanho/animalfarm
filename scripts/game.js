(function (root) {

    'use strict'

    class Game {

        constructor(username, canvases, callbacks) {

            callbacks.onBeforeStarted(this)

            this.$background = canvases[0]
            this.$entities   = canvases[1]
            this.$foreground = canvases[2]

            this.cursorGridPosition = []
            this.cursorPosition = []
            this.entities = []
            this.renderingGrid = null
            this.pathingGrid   = null
            this.entitiesGrid  = null

            // assigned from app.js file
            this.images
            this.sprites

            this.initControllers()

            this.pathFinder = new PathFinder(this)
            this.renderer   = new Renderer(this, this.$background, this.$entities, this.$foreground)
            this.updater    = new Updater(this)

            this.start()
            log.info('Game initialized')
            callbacks.onAfterStarted(this)
        }

        initControllers() {

            this.controllers = {
                stack: [],
                ready: function() {
                    this.stack.forEach(function (controller) {
                        controller.ready()
                    })
                },
                add: function (controller) {
                    this.stack.push(controller)
                }
            }

            this.initMap()
            this.initSprites()
            this.initPlayer(username)
            this.initItems()
            this.initNPCs()
        }

        initMap() {
            let controller = new MapsController(this)
            this.controllers.add(controller)
            this.map = controller.map
        }

        initSprites() {
            for (let key in this.sprites) {
                this.sprites[key] = new Sprite(this.sprites[key], this.map.tileSize)
            }
        }

        initPlayer(username) {
            let controller = new PlayersController(this, username)
            this.controllers.add(controller)
            this.player = controller.player
        }

        initItems() {
            let controller = new ItemsController(this)
            this.controllers.add(controller)
        }

        initNPCs() {
            let controller = new NpcsController(this)
            this.controllers.add(controller)
        }

        targetCellChanged(gridX, gridY) {
            return !this.cursorGridPosition
                || (this.cursorGridPosition[0] !== gridX || this.cursorGridPosition[1] !== gridY)
        }

        mousemove(event) {
            var gridX, gridY

            this.setMousePosition(event.offsetX, event.offsetY)

            gridX = Math.floor(this.cursorPosition[0] / this.renderingGrid.width  * this.renderingGrid.tilesX)
            gridY = Math.floor(this.cursorPosition[1] / this.renderingGrid.height * this.renderingGrid.tilesY)

            if (this.targetCellChanged(gridX, gridY)) {
                this.setMouseGridPosition(gridX, gridY)
                this.cursor = (this.entitiesGrid.get([gridX, gridY]) instanceof Npc) ? this.images['talk'].image : this.images['lipstick'].image
            }
        }

        setMousePosition(x, y) {
            this.cursorPosition = [event.offsetX, event.offsetY]
        }

        setMouseGridPosition(gridX, gridY) {
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
            this.cursor = this.images['lipstick'].image
            this.controllers.ready()
            this.started = true
            log.info('Game Started')
        }

    }

    root.Game = Game

})(this)
