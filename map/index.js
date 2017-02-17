'use strict'

let fs   = require('fs')
let data = require('./tiled.json')
let _    = require('lodash')

let layersData = getLayerData()
let json = combineLayers(layersData)
output(json)


function getLayerData() {

    return data['layers'].reduce((result, layer) => {

        if (layer['type'] === 'tilelayer') {
            result.push(layer.data)
        }

        return result
    }, [])

}

function combineLayers(layersData) {

    return _.zipWith(...layersData, function () {

        let result = _.compact(arguments)

        if (result.length === 0) {
            return 0
        }
        else if (result.length === 1) {
            return result[0]
        }
        else {
            return result
        }
    })

}

function output(json) {

    fs.writeFile('world.json', JSON.stringify(json), function (err) {

        if (err) {
            return console.error(err)
        }

        console.log('success write JSON file: world.json')

    })

}
