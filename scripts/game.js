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
                    this.stack.forEach((controller) => controller.ready())
                },
                add: function (controller) {
                    this.stack.push(controller)
                }
            }

            let mapController     = new MapsController(this)
            let spritesController = new SpritesController(this)
            let playersController = new PlayersController(this, username)
            let itemsController   = new ItemsController(this)
            let npcsController    = new NpcsController(this)

            this.controllers.add(mapController)
            this.controllers.add(spritesController)
            this.controllers.add(playersController)
            this.controllers.add(itemsController)
            this.controllers.add(npcsController)
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
            this.renderer.ready()
            this.controllers.ready()
            this.tick()
            this.started = true
            log.info('Game Started')
        }

    }

    root.Game = Game

})(this)
