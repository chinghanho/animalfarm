const Tile = require('./tile')

var gridTypes = [
    { id: "entities", tile: true },
    { id: "pathing", tile: false },
    { id: "rendering", tile: true },
]

var _grids = {}

class Grid extends Array {

    constructor(id, xAxisCount, yAxisCount, { tile: tile } = { tile: true }) {
        super()

        this.id = id

        for (var i = 0; i < yAxisCount; i++) {
            this[i] = []
            for (var j = 0; j < xAxisCount; j++) {
                this[i][j] = tile ? new Tile() : 0
            }
        }

        return this
    }

    static addTo(game) {
        this.game = game
        this.createGrids(game.map.xTiles, game.map.yTiles, function (grid) {
            _grids[grid.id] = grid
        })
    }

    static createGrids(xAxisCount, yAxisCount, callback) {
        gridTypes.forEach(function ({ id, tile }) {
            callback(new Grid(id, xAxisCount, yAxisCount, { tile: tile }))
        })
    }

    static getGrids(id) {
        return id ? _grids[id] : _grids
    }

    static get keys() {
        return Object.keys(_grids)
    }

}

module.exports = Grid
