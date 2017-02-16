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

        talk() {
            if ((this.talkIndex + 1) > this.talkCount) {
                this.talkIndex = 0
            }

            let msg = talks[this.id][this.talkIndex]
            this.talkIndex++
            return msg
        }

    }

    root.Npc = Npc

})(this)
