(function (root) {

    'use strict'

    class Renderer {

        constructor(game, $background, $entities, $foreground) {
            this.game = game
            this.map = this.game.map

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

            this.drawMap()
            this.drawCursor()
        }

        drawMap() {
            let self  = this
            for (let key in self.map.tileset) {
                let tiles = self.map.tileset[key]
                tiles.forEach(function (tile) {
                    self.backgroundCtx.drawImage(tile.image, tile.x * self.map.tileSize, tile.y * self.map.tileSize, self.map.tileSize, self.map.tileSize)
                })
            }
        }

        drawMouseTargetCell() {
            let gridX = this.game.cursorGridPosition[0]
            let gridY = this.game.cursorGridPosition[1]
            this.drawGridCell(gridX, gridY, 'hsla(3, 71%, 56%, 1)')
        }

        drawCursor() {
            this.game.cursor = this.game.images['lipstick'].image
            if (this.game.cursor && this.game.cursorPosition.length > 0) {
                this.foregroundCtx.drawImage(this.game.cursor, this.game.cursorPosition[0], this.game.cursorPosition[1], 24, 24)
            }
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
            let self = this
            self.game.entitiesGrid.grid.forEach(function (row) {
                row.forEach(function (entity) {
                    if (!isObjectBlank(entity)) {
                        self.drawEntitySprite(entity)
                    }
                })
            })
        }

        drawEntitySprite(entity) {
            // NOTE: draw this for test
            if (!entity.sprite) {
                let radius = this.map.tileSize / 2
                let x = entity.x + (this.map.tileSize / 2)
                let y = entity.y + (this.map.tileSize / 2)

                this.entitiesCtx.beginPath()
                this.entitiesCtx.arc(x, y, radius, 0, Math.PI * 2)
                this.entitiesCtx.fillStyle = entity.color
                this.entitiesCtx.fill()
                return
            }

            let currentFrame = entity.animation && entity.animation.currentFrame
            if (!currentFrame) {
                return
            }

            let sx      = currentFrame.x
              , sy      = currentFrame.y
              , image   = entity.sprite.image
              , sWidth  = entity.sprite.width
              , sHeight = entity.sprite.height
              , dWidth  = entity.sprite.width / 2
              , dHeight = entity.sprite.height / 2
              , offsetX = (dWidth  - 32) / 2
              , offsetY = (dHeight - 32)
              , dx      = entity.x - offsetX
              , dy      = entity.y - offsetY

            this.entitiesCtx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
        }

        clearScreen(ctx) {
            ctx.clearRect(0, 0, this.map.width, this.map.height);
        }

        renderFrame() {
            this.clearScreen(this.foregroundCtx)
            this.clearScreen(this.entitiesCtx)

            if (this.game && this.game.started) {
                this.drawMouseTargetCell()
                this.drawCursor()
                this.drawEntities()
            }
        }

    }

    root.Renderer = Renderer

})(this)
