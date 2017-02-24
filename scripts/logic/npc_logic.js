(function (root) {

    class NpcLogic {

        constructor(game) {
            this.game = game
        }

        ready() {
            this._onReady()
        }

        _onReady() {
            let npc = new Npc('oldman', {
                gridPoint: [14, 28],
                sprite: this.game.sprites['oldman'],
                defaultSprite: 'idle_down'
            })
            npc.x = (npc.gridX - this.game.camera.gridX) * this.game.map.tileSize
            npc.y = (npc.gridY - this.game.camera.gridY) * this.game.map.tileSize
            npc.idleSpeed = 1000
            npc.idle()
            this.game.pathingGrid.register(npc)
            this.game.entitiesGrid.register(npc)
            this.game.entities.push(npc)
        }

    }

    root.NpcLogic = NpcLogic

})(this)
