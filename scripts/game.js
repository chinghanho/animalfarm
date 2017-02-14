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

            // assigned from app.js file
            this.images
            this.sprites

            this.map = new _Map()
            this.renderingGrid = new Grid('number', this.map)
            this.pathingGrid   = new Grid('number', this.map)
            this.entitiesGrid  = new Grid('object', this.map)

            this.pathFinder = new PathFinder(this)
            this.renderer   = new Renderer(this, this.$background, this.$entities, this.$foreground)
            this.updater    = new Updater(this)

            this.initSprites()
            this.initPlayer(username)
            this.initItems()
            this.initNPCs()

            this.start()
            log.info('Game initialized')
            callbacks.onAfterStarted(this)
        }

        initSprites() {
            for (let key in this.sprites) {
                this.sprites[key] = new Sprite(this.sprites[key], this.map.tileSize)
            }
        }

        initPlayer(username) {
            this.player = (new PlayersController(this, username)).player
        }

        initItems() {
            let item = new Item()
            item.setGridPosition(12, 5)
            this.entitiesGrid.register(item)
            this.entities.push(item)
        }

        initNPCs() {
            let npc = new Npc()
            npc.setGridPosition(14, 8)
            npc.setSprite(this.sprites['stone'], 'idle')
            this.pathingGrid.register(npc)
            this.entitiesGrid.register(npc)
            this.entities.push(npc)
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
            this.started = true
            log.info('Game Started')
        }

    }

    root.Game = Game

})(this)
