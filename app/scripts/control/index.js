const PlayerControl = require('./player_control')

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

var _controllers = {}

class Controller {

    static addTo(game) {
        this.game = game
        this.bindEvents()
        this.register('player', PlayerControl)
        return this
    }

    static bindEvents() {
        window.addEventListener('keydown', this._onKeyDown.bind(this))
    }

    static register(id, type) {
        if (_controllers[id]) {
            throw new Error('%s already registered.', id)
        }
        _controllers[id] = new type()
    }

    static by(id) {
        return _controllers[id]
    }

    static _onKeyDown(event) {
        let code, action
        code = event.keyCode || event.which
        action = keyMap[code]
        if (action) {
            this.game.action(action)
        }
    }

}

module.exports = Controller
