(function (root) {

    'use strict'

    class Grid extends _Map {

        constructor(type) {
            super()
            this.type = type
            this.grid = []
            this.validateType()
            this.init()

            return this
        }

        get(coordinate) {
            let x = coordinate[0]
            let y = coordinate[1]
            return this.grid[y][x]
        }

        set(coordinate, value) {
            let x = coordinate[0]
            let y = coordinate[1]
            this.grid[y][x] = value
            return this
        }

        validateType() {
            if (!this.type) {
                log.error('not given the type of grid')
            }
        }

        init() {

            let value

            switch (this.type) {
                case 'number':
                    value = 0
                    break;
                case 'object':
                    value = {}
                    break;
            }

            for (var i = 0; i < this.tilesY; i++) {
                this.grid[i] = []
                for (var j = 0; j < this.tilesX; j++) {
                    this.grid[i][j] = value
                }
            }

            return this.grid
        }

        register(entity) {
            if (!entity) { return }
            let value = this.type === 'number' ? 1 : entity
            this.grid[entity.gridY][entity.gridX] = value
        }

        unregister(entity) {
            if (!entity) { return }
            let value = this.type === 'number' ? 0 : {}
            this.grid[entity.gridY][entity.gridX] = value
        }

    }

    root.Grid = Grid

})(this)
