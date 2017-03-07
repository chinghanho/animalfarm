class BaseController {

    addLayer(layer) {
        this.layer = layer
        this.onLayerAdded(this.layer)
    }

}

module.exports = BaseController
