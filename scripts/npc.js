(function (root) {

    'use strict'

    var talks = {
        "oldman": [
            "愚蠢的遊戲",
            "Stupid Game!"
        ]
    }

    class Npc extends Character {

        constructor(id) {
            super()
            this.id = id
            this.talkCount = talks[this.id].length
            this.talkIndex = 0
        }

        talk(callback) {
            if ((this.talkIndex + 1) > this.talkCount) {
                this.talkIndex = 0
                this.bubble && this.bubble.destroy()

                if (!this.bubble.isOver) {
                    return
                }
            }

            let msg = talks[this.id][this.talkIndex]

            if (this.bubble) {
                this.bubble && this.bubble.destroy()
                this.bubble.update(msg)
            }
            else {
                this.bubble = new Bubble(msg)
            }

            this.talkIndex++

            callback.call(this, this.bubble)
        }

    }

    root.Npc = Npc

})(this)
