(function (root) {

    'use strict'

    class ItemsController {

        constructor(game) {
            this.game = game
        }

        ready() {
            // let item = new Item()
            // item.setGridPosition(12, 5)
            // this.game.entitiesGrid.register(item)
            // this.game.entities.push(item)
        }

    }

    root.ItemsController = ItemsController

})(this)
