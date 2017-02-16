(function (root) {

    'use strict'

    class Renderer {

        constructor(game, $background, $entities, $foreground) {
            this.game = game
            this.FPS = 60

            this.$background = $background
            this.$entities   = $entities
            this.$foreground = $foreground

            this.backgroundCtx  = this.$background.getContext('2d')
            this.entitiesCtx    = this.$entities.getContext('2d')
            this.foregroundCtx  = this.$foreground.getContext('2d')
        }

        ready() {
            this.$background.width  = this.game.map.width
            this.$entities.width    = this.game.map.width
            this.$foreground.width  = this.game.map.width
            this.$background.height = this.game.map.height
            this.$entities.height   = this.game.map.height
            this.$foreground.height = this.game.map.height
            this.drawCursor()
        }

        drawMap() {
            let self = this
            let map  = self.game.map
            for (let key in map.tileset) {
                let tiles = map.tileset[key]
                tiles.forEach(function (tile) {
                    self.backgroundCtx.drawImage(tile.image, tile.gridX * map.tileSize, tile.gridY * map.tileSize, map.tileSize, map.tileSize)
                })
            }
        }

        drawMouseTargetCell() {
            let gridX = this.game.cursorGridPosition[0]
            let gridY = this.game.cursorGridPosition[1]
            this.drawGridCell(gridX, gridY, 'hsla(3, 71%, 56%, 1)')
        }

        drawCursor() {
            if (this.game.cursor && this.game.cursorPosition.length > 0) {
                this.foregroundCtx.drawImage(this.game.cursor, this.game.cursorPosition[0], this.game.cursorPosition[1], 24, 24)
            }
        }

        drawGridCell(gridX, gridY, color) {
            gridX = gridX * this.game.map.tileSize
            gridY = gridY * this.game.map.tileSize

            this.foregroundCtx.beginPath()
            this.foregroundCtx.rect(gridX, gridY, this.game.map.tileSize, this.game.map.tileSize)
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
            let frame = entity.animation && entity.animation.currentFrame
            if (!frame) {
                return
            }

            let sx      = frame.x
              , sy      = frame.y
              , image   = entity.sprite.image
              , sWidth  = entity.sprite.width
              , sHeight = entity.sprite.height
              , dWidth  = entity.sprite.width / 2
              , dHeight = entity.sprite.height / 2
              , offsetX = (dWidth  - 32) / 2
              , offsetY = (dHeight - 32)
              , dx      = entity.x - offsetX
              , dy      = entity.y - offsetY

            // if (entity instanceof Player) {
            //     log.debug([sx, sy])
            // }

            this.entitiesCtx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
        }

        clearScreen(ctx) {
            ctx.clearRect(0, 0, this.game.map.width, this.game.map.height);
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
