(function (root) {

    'use strict'

    class Renderer {

        constructor(game, $background, $entities, $foreground) {
            this.game = game
            this.grid = this.game.renderingGrid

            this.FPS = 60

            this.$background = $background
            this.$entities   = $entities
            this.$foreground = $foreground

            this.backgroundCtx  = this.$background.getContext('2d')
            this.entitiesCtx    = this.$entities.getContext('2d')
            this.foregroundCtx  = this.$foreground.getContext('2d')

            this.$background.width  = this.grid.width
            this.$entities.width    = this.grid.width
            this.$foreground.width  = this.grid.width
            this.$background.height = this.grid.height
            this.$entities.height   = this.grid.height
            this.$foreground.height = this.grid.height

            this.initBackground()
            this.initCursor()
        }

        initBackground() {
            let self  = this
            let image = self.game.images['ground'].bitmap
            for (let i = 0; i < self.grid.tilesX; i++) {
                self.backgroundCtx.drawImage(image, i * self.grid.tileSize, 0, self.grid.tileSize, self.grid.tileSize)
                for (let j = 0; j < self.grid.tilesY; j++) {
                    self.backgroundCtx.drawImage(image, i * self.grid.tileSize, j * self.grid.tileSize, self.grid.tileSize, self.grid.tileSize)
                }
            }
        }

        initCursor() {
            this.cursor = this.game.images['lipstick'].bitmap
        }

        drawMouseTargetCell() {
            let gridX = this.game.cursorGridPosition[0]
            let gridY = this.game.cursorGridPosition[1]
            this.drawGridCell(gridX, gridY, 'hsla(3, 71%, 56%, 1)')
        }

        drawCursor() {
            if (this.cursor && this.game.cursorPosition.length > 0) {
                this.foregroundCtx.drawImage(this.cursor, this.game.cursorPosition[0], this.game.cursorPosition[1], 24, 24)
            }
        }

        drawGridCell(gridX, gridY, color) {
            gridX = gridX * this.grid.tileSize
            gridY = gridY * this.grid.tileSize

            this.foregroundCtx.beginPath()
            this.foregroundCtx.rect(gridX, gridY, this.grid.tileSize, this.grid.tileSize)
            this.foregroundCtx.lineWidth = 2
            this.foregroundCtx.strokeStyle = color
            this.foregroundCtx.stroke()
        }

        drawEntities() {
            let that = this

            that.game.entitiesGrid.grid.forEach(function (row) {
                row.forEach(function (entity) {
                    if (!isObjectBlank(entity)) {
                        that.drawEntityAt(entity.x, entity.y, entity.color)
                    }
                })
            })
        }

        drawEntityAt(x, y, color) {
            let radius = this.grid.tileSize / 2
            x = x + (this.grid.tileSize / 2)
            y = y + (this.grid.tileSize / 2)

            this.entitiesCtx.beginPath()
            this.entitiesCtx.arc(x, y, radius, 0, Math.PI * 2)
            this.entitiesCtx.fillStyle = color
            this.entitiesCtx.fill()
        }

        clearScreen(ctx) {
            ctx.clearRect(0, 0, this.grid.width, this.grid.height);
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
