(() => {

    'use strict'

    class Item extends Entity {

        constructor() {
            super()
        }

        animate(key) {
            let anime = this.sprite.animations[key]

            if (!anime) {
                return
            }

            this.animation.extends({
                length: anime.length,
                row:    anime.row,
                speed:  800
            })
        }

    }

    this.Item = Item

})()
