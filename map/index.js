'use strict'

let fs   = require('fs')
let data = require('./tiled.json')
let _    = require('lodash')

let layersData = data['layers'].map((layer) => layer.data)

let result = _.zipWith(...layersData, function () {

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

fs.writeFile('world.json', JSON.stringify(result), function (err) {

    if (err) {
        return console.error(err)
    }

    console.log('success write JSON file: world.json')

})
