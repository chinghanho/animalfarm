'use strict'

let fs   = require('fs')
let data = require('./tiled.json')
let _    = require('lodash')

let json = {}

let layersData, doorsData, blockingsDoor, width, height

layersData = getLayerData(data)
layersData = combineLayers(layersData)

doorsData = getDoorsData(data)
doorsData = parseDoorsData(doorsData)

blockingsDoor = getBlockings(data)

json['width']  = data['width']
json['height'] = data['height']
json['tilewidth'] = data['tilewidth']
json['data'] = layersData
json['doors'] = doorsData
json['blockings'] = blockingsDoor

output(json)


function getLayerData(data) {

    return data['layers'].reduce((result, layer) => {

        if (layer['type'] === 'tilelayer' && !(layer['name'] === 'blocking')) {
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

function getBlockings(data) {
    return data['layers'].find(function (layer) {
        return (layer['type'] === 'tilelayer') && (layer['name'] === 'blocking')
    }).data
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
            dy: object.properties.y,
            cx: object.properties.cx,
            cy: object.properties.cy,
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
