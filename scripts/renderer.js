(function (root) {

    'use strict'

    class Renderer {

        constructor(game, $background, $entities, $foreground) {
            this.game   = game
            this.WIDTH  = 960
            this.HEIGHT = 640
            this.TILE_SIZE = 32

            this.$background = $background
            this.$entities   = $entities
            this.$foreground = $foreground

            this.backgroundCtx  = this.$background.getContext('2d')
            this.entitiesCtx    = this.$entities.getContext('2d')
            this.foregroundCtx  = this.$foreground.getContext('2d')

            this.$background.width  = this.WIDTH
            this.$entities.width    = this.WIDTH
            this.$foreground.width  = this.WIDTH
            this.$background.height = this.HEIGHT
            this.$entities.height   = this.HEIGHT
            this.$foreground.height = this.HEIGHT

            this.initBackground()
            this.initForeground()

            logger.log('Renderer initialized')
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
            x = x * this.TILE_SIZE
            y = y * this.TILE_SIZE

            this.foregroundCtx.clearRect(0, 0, this.$foreground.width, this.$foreground.height)
            this.foregroundCtx.beginPath()
            this.foregroundCtx.rect(x, y, this.TILE_SIZE, this.TILE_SIZE)
            this.foregroundCtx.lineWidth = 2
            this.foregroundCtx.strokeStyle = color
            this.foregroundCtx.stroke()
        }

        drawEntityAt(x, y, color) {
            let radius = this.TILE_SIZE / 2
            x = x * this.TILE_SIZE + (this.TILE_SIZE / 2)
            y = y * this.TILE_SIZE + (this.TILE_SIZE / 2)

            this.entitiesCtx.arc(x, y, radius, 0, Math.PI * 2)
            this.entitiesCtx.fillStyle = color
            this.entitiesCtx.fill()
        }

    }

    root.Renderer = Renderer

})(this)
