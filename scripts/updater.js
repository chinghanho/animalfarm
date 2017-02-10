(function (root) {

    'use strict'

    class Updater {

        constructor(game) {
            this.game = game
        }

        update() {
            this.updateCharacters()
        }

        updateCharacters() {
            let that = this
            that.game.entities.forEach(function (entity) {
                if (entity instanceof Character) {
                    that.updateCharacter(entity)
                }
            })
        }

        updateCharacter(character) {

            // Estimate of the movement distance for one update
            var tick = Math.round(this.game.map.tileSize / Math.round((character.moveSpeed / (1000 / this.game.renderer.FPS))));

            if (character.moving && !character.movement.isProgressing()) {
                // console.count('yo')
                // character.movement.start()
                // character.x += tick

                if (character.gridX === character._moveToGrid[0] && character.gridY === character._moveToGrid[1]) {
                    character.moveEnd()
                }
            }
        }

    }

    root.Updater = Updater

})(this)
