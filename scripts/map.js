(function (root) {

    'use strict'

    class Map {

        constructor() {
            this.width  = 960
            this.height = 640
            this.tileSize = 32

            this.tilesX = this.width  / this.tileSize // 30
            this.tilesY = this.height / this.tileSize // 20

            this.generateGrid()
        }

        generateGrid() {
            this.grid = []
            for (var i = 0; i < this.tilesY; i++) {
                this.grid[i] = []
                for (var j = 0; j < this.tilesX; j++) {
                    this.grid[i][j] = 0
                }
            }
        }

    }

    root._Map = Map

})(this)
