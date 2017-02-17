'use strict'

let fs   = require('fs')
let data = require('./tiled.json')
let _    = require('lodash')

let json = {}

let layersData, doorsData

layersData = getLayerData(data)
layersData = combineLayers(layersData)

doorsData = getDoorsData(data)
doorsData = parseDoorsData(doorsData)

json['data'] = layersData
json['doors'] = doorsData

output(json)


function getLayerData(data) {

    return data['layers'].reduce((result, layer) => {

        if (layer['type'] === 'tilelayer') {
            result.push(layer.data)
        }

        return result
    }, [])

}

function combineLayers(data) {

    return _.zipWith(...data, function () {

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

function getDoorsData(data) {

    let result

    data['layers'].forEach(function (layer) {

        if (layer.name === 'doors') {
            result = layer.objects
        }

    })

    return result

}

function parseDoorsData(data) {

    return data.map(function (object) {

        return {
            x: object.x,
            y: object.y,
            dx: object.properties.x,
            dy: object.properties.y
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
