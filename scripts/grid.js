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

            let value = 1
            if (this.type === 'number') {
                value = 1
            }

            this.grid[entity.gridY][entity.gridX] = value
        }

    }

    root.Grid = Grid

})(this)
