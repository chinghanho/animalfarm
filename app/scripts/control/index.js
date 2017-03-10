const keyMap = {
    37: 'toLeft', // left arrow key
    65: 'toLeft', // a key
    39: 'toRight', // right arrow key
    68: 'toRight', // d key
    38: 'toUp', // up arrow key
    87: 'toUp', // w
    40: 'toDown', // down arrow key
    83: 'toDown', // s
}

class Controller {

    static addTo(game) {
        this.game = game
        this.bindEvents()
    }

    static bindEvents() {
        window.addEventListener('keydown', onKeyDown.bind(this))
    }

}

function onKeyDown(event) {
    let code, action
    code = event.keyCode || event.which
    action = keyMap[code]
    if (action) {
        this.game.action(action)
    }
}

module.exports = Controller
