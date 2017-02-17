(function (root) {

    'use strict'

    class MapsController {

        constructor(game) {
            this.game = game
            this.map = new _Map(this.game)
            this.map.onSet = this.onSet
            this.game.map = this.map
        }

        ready() {
            this._onReady()
        }

        _onReady() {
            this.map.set('room')
        }

        onSet() {
            let self = this
            log.debug('set map: %s', this.key)

            if (self.game.renderingGrid && self.game.pathingGrid && self.game.entitiesGrid) {
                self.game.renderingGrid.reload()
                self.game.pathingGrid.reload()
                self.game.entitiesGrid.reload()
            }
            else {
                self.game.renderingGrid = new Grid('number', self)
                self.game.pathingGrid   = new Grid('number', self)
                self.game.entitiesGrid  = new Grid('object', self)
            }

            self.blockings.forEach(function (tileIndex) {
                let tile = new Tile(tileIndex)
                self.game.pathingGrid.register(tile)
            })

            self.game.renderer.drawMap()
        }

    }

    root.MapsController = MapsController

})(this)
