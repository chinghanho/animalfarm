(function (root) {

    'use strict'

    class Renderer {

        constructor(game, $background, $entities, $foreground) {
            this.game   = game
            this.map    = this.game.map

            this.$background = $background
            this.$entities   = $entities
            this.$foreground = $foreground

            this.backgroundCtx  = this.$background.getContext('2d')
            this.entitiesCtx    = this.$entities.getContext('2d')
            this.foregroundCtx  = this.$foreground.getContext('2d')

            this.$background.width  = this.map.width
            this.$entities.width    = this.map.width
            this.$foreground.width  = this.map.width
            this.$background.height = this.map.height
            this.$entities.height   = this.map.height
            this.$foreground.height = this.map.height

            this.initBackground()
            this.initForeground()
        }

        initBackground() {
            this.backgroundCtx.fillStyle = 'black'
            this.backgroundCtx.rect(0, 0, this.$background.width, this.$background.height)
            this.backgroundCtx.fill()
        }

        initForeground() {
            //
        }

        drawCell(x, y, color) {
            x = x * this.map.tileSize
            y = y * this.map.tileSize

            this.foregroundCtx.clearRect(0, 0, this.$foreground.width, this.$foreground.height)
            this.foregroundCtx.beginPath()
            this.foregroundCtx.rect(x, y, this.map.tileSize, this.map.tileSize)
            this.foregroundCtx.lineWidth = 2
            this.foregroundCtx.strokeStyle = color
            this.foregroundCtx.stroke()
        }

        drawEntityAt(x, y, color) {
            let radius = this.map.tileSize / 2
            x = x * this.map.tileSize + (this.map.tileSize / 2)
            y = y * this.map.tileSize + (this.map.tileSize / 2)

            this.entitiesCtx.beginPath()
            this.entitiesCtx.arc(x, y, radius, 0, Math.PI * 2)
            this.entitiesCtx.fillStyle = color
            this.entitiesCtx.fill()
        }

    }

    root.Renderer = Renderer

})(this)
