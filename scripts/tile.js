(function (root) {

    'use strict'

    class Tile {

        constructor(index, image, object) {
            this.object   = object
            this.index    = index
            this.gridX        = null
            this.gridY        = null
            this.position = []
            this.image    = image
            this.toGrid()
        }

        toGrid() {
            this.gridX = (this.index - 1) % 30
            this.gridY = Math.floor((this.index - 1) / 30)
            this.position = [this.gridX, this.gridY]
        }

    }

    root.Tile = Tile

})(this)
