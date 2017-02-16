(function (root) {

    class NpcsController {

        constructor(game) {
            this.game = game
        }

        ready() {
            let npc = new Npc('oldman')
            npc.setGridPosition(14, 8)
            npc.setSprite(this.game.sprites['oldman'], 'idle_down')
            npc.idleSpeed = 1000
            npc.idle()
            this.game.pathingGrid.register(npc)
            this.game.entitiesGrid.register(npc)
            this.game.entities.push(npc)
        }

    }

    root.NpcsController = NpcsController

})(this)