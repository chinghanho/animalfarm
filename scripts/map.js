(function (root) {

    'use strict'

    class Map {

        constructor() {
            this.width  = 960
            this.height = 640
            this.tileSize = 32

            this.tilesX = this.width  / this.tileSize // 30
            this.tilesY = this.height / this.tileSize // 20

            this.pathingGrid  = this.generateGrid('number')
            this.entitiesGrid = this.generateGrid('object')
        }

        generateGrid(type) {
            if (!type) {
                log.error('not given the type of grid')
            }

            let grid = []

            let value
            switch (type) {
                case 'number':
                    value = 0
                    break;
                case 'object':
                    value = {}
                    break;
            }

            for (var i = 0; i < this.tilesY; i++) {
                grid[i] = []
                for (var j = 0; j < this.tilesX; j++) {
                    grid[i][j] = value
                }
            }
            return grid
        }

        registerEnityPosition(entity) {
            if (!entity) { return }

            this.pathingGrid[entity.gridY][entity.gridX] = 1
        }

    }

    root._Map = Map

})(this)
