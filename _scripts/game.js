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

        this.cursor = this.images['lipstick'].image

        this.initMap()

        this.camera     = new Camera(this, {
            gridPoint: [0, 20]
        })

        for (let key in this.sprites) {
            this.sprites[key] = new Sprite(this.sprites[key], this.map.tileSize)
        }

        this.initPlayer(username)
        this.init()

        this.pathFinder = new PathFinder(this)
        this.renderer   = new Renderer(this, this.$background, this.$entities, this.$foreground)
        this.updater    = new Updater(this)

        this.start()
        log.info('Game initialized')
        callbacks.onAfterStarted(this)
    }

    initMap() {
        let self = this
        self.map = new _Map(self)
        self.renderingGrid = self.map.renderingGrid
        self.pathingGrid   = self.map.pathingGrid
        self.entitiesGrid  = self.map.entitiesGrid
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
            this.cursor = (this.entitiesGrid.get(this.cursorGridPosition) instanceof Npc) ? this.images['talk'].image : this.images['lipstick'].image
        }
    }

    setMousePosition(x, y) {
        this.cursorPosition = [event.offsetX, event.offsetY]
    }

    setMouseGridPosition(gridX, gridY) {
        this.cursorGridPosition = [gridX + this.camera.gridX, gridY + this.camera.gridY]
        log.debug(this.cursorGridPosition)
    }

    createPlayer(username, options) {
        return new Player(username, options)
    }

    createItem(gridPoint) {
        let item = new Item({
            gridPoint: gridPoint
        })
        item.x = (item.gridX - this.camera.gridX) * this.map.tileSize
        item.y = (item.gridY - this.camera.gridY) * this.map.tileSize
        this.entitiesGrid.register(item)
        this.entities.push(item)
        item.setSprite(this.sprites['axe'], 'idle')
        item.animate('idle', 800)
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
        this.playerLogic.ready()
        this.controllers.ready()
        this.renderer.drawTerrain()
        this.tick()
        this.started = true
        log.info('Game Started')
    }

    gridPositionToTileIndex(gridX, gridY) {
        return (gridY * this.map.tilesX) + gridX + 1
    }

    positionToGridPosition(x, y) {
        let gridX = x / this.map.width * this.map.tilesX
        let gridY = y / this.map.height * this.map.tilesY
        return [gridX, gridY]
    }

}

module.exports = Game
