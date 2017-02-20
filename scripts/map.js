(function (root) {

    'use strict'

    class Map {

        constructor(game) {

            let self = this

            this.game = game
            this.data = game.mapData

            this.width  = 960
            this.height = 640
            this.tileSize = 32
            this.tilewidth = this.data.tilewidth
            this.tilesX = this.width  / this.tileSize // 30
            this.tilesY = this.height / this.tileSize // 20

            this.doors = []

            this.renderingGrid = new Grid('number', this)
            this.pathingGrid   = new Grid('number', this)
            this.entitiesGrid  = new Grid('object', this)

            this.initRenderingGrid()
            this.initBlockings()
            this.initDoors()
        }

        initRenderingGrid() {
            let self = this
            self.data.data.forEach(function (id, index) {
                let gridX = index % 100
                let gridY = Math.floor(index / 100)

                if (Array.isArray(id)) {
                    self.renderingGrid.set([gridX, gridY], id)
                }

                self.renderingGrid.set([gridX, gridY], id)
            })
        }

        initBlockings() {
            let self = this
            self.data.blockings.forEach(function (blocking, index) {
                let gridX = index % 100
                let gridY = Math.floor(index / 100)

                if (blocking !== 0) {
                    self.pathingGrid.set([gridX, gridY], 1)
                }
            })
        }

        initDoors() {
            let self = this
            self.data.doors.forEach(function (door) {
                self.doors.push(door)
            })
        }

    }

    root._Map = Map

})(this)
