var _instance

class Map {

    constructor() {

        // this.game = game
        // this.data = game.mapData

        this.width  = 960
        this.height = 640
        this.tileSize = 32
        // this.tilewidth = this.data.tilewidth
        this.xTiles = this.width  / this.tileSize // 30
        this.yTiles = this.height / this.tileSize // 20

        // this.doors = []

        // this.renderingGrid = new Grid('number', this)
        // this.pathingGrid   = new Grid('number', this)
        // this.entitiesGrid  = new Grid('object', this)

        // this.initRenderingGrid()
        // this.initBlockings()
        // this.initDoors()
    }

    // initRenderingGrid() {
    //     let self = this
    //     self.data.data.forEach(function (id, index) {
    //         let gridX = index % 100
    //         let gridY = Math.floor(index / 100)

    //         if (Array.isArray(id)) {
    //             self.renderingGrid.set([gridX, gridY], id)
    //         }

    //         self.renderingGrid.set([gridX, gridY], id)
    //     })
    // }

    // initBlockings() {
    //     let self = this
    //     self.data.blockings.forEach(function (blocking, index) {
    //         let gridX = index % 100
    //         let gridY = Math.floor(index / 100)

    //         if (blocking !== 0) {
    //             self.pathingGrid.set([gridX, gridY], 1)
    //         }
    //     })
    // }

    // initDoors() {
    //     let self = this
    //     self.data.doors.forEach(function (door) {

    //         let doorObject = {
    //             x: door.x,
    //             y: door.y,
    //             gridX: Math.floor(door.x / (self.data.width * self.tileSize)  * self.data.width) / 2,
    //             gridY: Math.floor(door.y / (self.data.height * self.tileSize) * self.data.height) / 2,
    //             destX: door.dx,
    //             destY: door.dy,
    //             cameraX: door.cx,
    //             cameraY: door.cy,
    //         }

    //         self.doors.push(doorObject)
    //     })
    // }

    // isDoor(gridX, gridY) {
    //     return this.doors.find((door) => door.gridX === gridX && door.gridY === gridY)
    // }

    static get instance() {
        return _instance
    }

    static addTo(game) {
        _instance = _instance || new Map()
        return _instance
    }

}

module.exports = Map
