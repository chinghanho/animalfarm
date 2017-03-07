class Renderer {

    // constructor(game, $background, $entities, $foreground) {
    //     this.game = game
    //     this.FPS = 60

    //     this.$background = $background
    //     this.$entities   = $entities
    //     this.$foreground = $foreground

    //     this.backgroundCtx  = this.$background.getContext('2d')
    //     this.entitiesCtx    = this.$entities.getContext('2d')
    //     this.foregroundCtx  = this.$foreground.getContext('2d')
    // }

    // ready() {
    //     this.$background.width  = this.game.map.width
    //     this.$entities.width    = this.game.map.width
    //     this.$foreground.width  = this.game.map.width
    //     this.$background.height = this.game.map.height
    //     this.$entities.height   = this.game.map.height
    //     this.$foreground.height = this.game.map.height
    //     this.drawCursor()
    //     this.drawBackground()
    //     this.tilesheet = this.game.images['tilesheet'].image
    // }

    // drawBackground() {
    //     log.debug('draw background')
    //     this.backgroundCtx.fillStyle = 'black'
    //     this.backgroundCtx.rect(0, 0, this.game.map.width, this.game.map.height)
    //     this.backgroundCtx.fill()
    // }

    // drawTerrain() {
    //     let self = this
    //     let map  = self.game.map
    //     self.game.forEachVisibleRenderingGrid(function (id, index) {

    //         if (id === 0) {
    //             return
    //         }

    //         if (Array.isArray(id)) {
    //             id.forEach(function (_id) {
    //                 self.drawTile(self.backgroundCtx, _id, self.tilesheet, index)
    //             })
    //         }

    //         self.drawTile(self.backgroundCtx, id, self.tilesheet, index)
    //     })
    // }

    // drawTile(ctx, id, tilesheet, index) {
    //     let tilewidth, n , sCol , sRow , dGridX , dGridY , sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight

    //     tilewidth = this.game.map.data.tilewidth
    //     n         = tilesheet.width / tilewidth
    //     sCol      = (id - 1) % n
    //     sRow      = Math.floor((id - 1) / n)
    //     dGridX    = index % this.game.map.tilesX
    //     dGridY    = Math.floor(index / this.game.map.tilesX)
    //     sx        = sCol * tilewidth
    //     sy        = sRow * tilewidth
    //     sWidth    = tilewidth
    //     sHeight   = tilewidth
    //     dx        = dGridX * this.game.map.tileSize
    //     dy        = dGridY * this.game.map.tileSize
    //     dWidth    = this.game.map.tileSize
    //     dHeight   = this.game.map.tileSize

    //     ctx.drawImage(tilesheet, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
    // }

    // drawMouseTargetCell() {
    //     let gridX = this.game.cursorGridPosition[0] - this.game.camera.gridX
    //     let gridY = this.game.cursorGridPosition[1] - this.game.camera.gridY
    //     this.drawGridCell(gridX, gridY, 'hsla(3, 71%, 56%, 1)')
    // }

    // drawCursor() {
    //     if (this.game.cursor && this.game.cursorPosition.length > 0) {
    //         this.foregroundCtx.drawImage(this.game.cursor, this.game.cursorPosition[0], this.game.cursorPosition[1], 24, 24)
    //     }
    // }

    // drawGridCell(gridX, gridY, color) {
    //     gridX = gridX * this.game.map.tileSize
    //     gridY = gridY * this.game.map.tileSize

    //     this.foregroundCtx.beginPath()
    //     this.foregroundCtx.rect(gridX, gridY, this.game.map.tileSize, this.game.map.tileSize)
    //     this.foregroundCtx.lineWidth = 2
    //     this.foregroundCtx.strokeStyle = color
    //     this.foregroundCtx.stroke()
    // }

    // drawEntities() {
    //     let self = this
    //     self.game.entitiesGrid.grid.forEach(function (row) {
    //         row.forEach(function (entity) {
    //             if (!isObjectBlank(entity)) {
    //                 self.drawEntitySprite(entity)
    //             }
    //         })
    //     })
    // }

    // drawEntitySprite(entity) {
    //     let frame = entity.animation && entity.animation.currentFrame
    //     if (!frame) {
    //         return
    //     }

    //     if (this.isOutOfCameraBounds(entity.gridX, entity.gridY)) {
    //         return
    //     }

    //     let sx      = frame.x
    //       , sy      = frame.y
    //       , image   = entity.sprite.image
    //       , sWidth  = entity.sprite.width
    //       , sHeight = entity.sprite.height
    //       , dWidth  = entity.sprite.width / 2
    //       , dHeight = entity.sprite.height / 2
    //       , offsetX = (dWidth  - 32) / 2
    //       , offsetY = (dHeight - 32)
    //       , dx      = entity.x - offsetX
    //       , dy      = entity.y - offsetY

    //     this.entitiesCtx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
    // }

    // isOutOfCameraBounds(gridX, gridY) {
    //     let minX = this.game.camera.gridX
    //     let maxX = this.game.camera.gridX + 30
    //     let minY = this.game.camera.gridY
    //     let maxY = this.game.camera.gridY + 20

    //     return !((gridX >= minX && gridX <= maxX) && (gridY >= minY && gridY <= maxY))
    // }

    // clearScreen(ctx) {
    //     ctx.clearRect(0, 0, this.game.map.width, this.game.map.height);
    // }

    // renderFrame() {
    //     this.clearScreen(this.foregroundCtx)
    //     this.clearScreen(this.entitiesCtx)

    //     if (this.game && this.game.started) {
    //         this.drawMouseTargetCell()
    //         this.drawCursor()
    //         this.drawEntities()
    //     }
    // }

    static addTo(game) {
        game.renderer = new Renderer()
    }

}

module.exports = Renderer
