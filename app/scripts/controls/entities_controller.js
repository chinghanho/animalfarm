const BaseController = require('./base_controller')

var instance

class EntitiesController extends BaseController {

    constructor() {
        super()

        if (!instance) {
            instance = this
        }

        return instance
    }

    onLayerAdded(layer) {
        this.layer.elem.addEventListener('click', this._onClick.bind(this))
    }

    _onClick(event) {
        console.log('clicked')
    }

}

module.exports = new EntitiesController()
