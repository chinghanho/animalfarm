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
            log.debug('set map: %s', this.key)

            if (this.game.renderingGrid && this.game.pathingGrid && this.game.entitiesGrid) {
                this.game.renderingGrid.reload()
                this.game.pathingGrid.reload()
                this.game.entitiesGrid.reload()
            }
            else {
                this.game.renderingGrid = new Grid('number', this)
                this.game.pathingGrid   = new Grid('number', this)
                this.game.entitiesGrid  = new Grid('object', this)
            }

            this.game.renderer.drawMap()
        }

    }

    root.MapsController = MapsController

})(this)
