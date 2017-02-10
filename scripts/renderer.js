(function (root) {

    'use strict'

    class Renderer {

        constructor(game, $background, $entities, $foreground) {
            this.game   = game
            this.map    = this.game.map

            this.FPS = 60

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
        }

        initBackground() {
            this.backgroundCtx.fillStyle = 'black'
            this.backgroundCtx.rect(0, 0, this.$background.width, this.$background.height)
            this.backgroundCtx.fill()
        }

        drawMouseTargetCell() {
            let gridX = this.game.cursorGridPosition[0]
            let gridY = this.game.cursorGridPosition[1]
            this.drawGridCell(gridX, gridY, 'hsla(3, 71%, 56%, 1)')
        }

        drawGridCell(gridX, gridY, color) {
            gridX = gridX * this.map.tileSize
            gridY = gridY * this.map.tileSize

            this.foregroundCtx.beginPath()
            this.foregroundCtx.rect(gridX, gridY, this.map.tileSize, this.map.tileSize)
            this.foregroundCtx.lineWidth = 2
            this.foregroundCtx.strokeStyle = color
            this.foregroundCtx.stroke()
        }

        drawEntities() {
            let that = this

            that.game.entities.forEach(function (entity) {
                that.drawEntityAt(entity.x, entity.y, entity.color)
            })
        }

        drawEntityAt(x, y, color) {
            let radius = this.map.tileSize / 2
            x = x + (this.map.tileSize / 2)
            y = y + (this.map.tileSize / 2)

            this.entitiesCtx.beginPath()
            this.entitiesCtx.arc(x, y, radius, 0, Math.PI * 2)
            this.entitiesCtx.fillStyle = color
            this.entitiesCtx.fill()
        }

        clearScreen(ctx) {
            ctx.clearRect(0, 0, this.map.width, this.map.height);
        }

        renderFrame() {
            this.clearScreen(this.foregroundCtx)
            this.clearScreen(this.entitiesCtx)

            if (this.game && this.game.started) {
                this.drawMouseTargetCell()
                this.drawEntities()
            }
        }

    }

    root.Renderer = Renderer

})(this)
