(function (root) {

    'use strict'

    class Map {

        constructor() {
            this.width  = 960
            this.height = 640
            this.tileSize = 32

            this.tilesX = this.width  / this.tileSize // 30
            this.tilesY = this.height / this.tileSize // 20
        }

    }

    root._Map = Map

})(this)
