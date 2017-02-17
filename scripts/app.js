(function (root) {

    'use strict'

    class App {

        constructor($app) {
            this.$elem = $app
            this.triedStartingGame = false
            this.spritesReady = false
            this.imagesReady  = false
            this.mapDataReady = false
            this.tmp = null
            this.mapData = null
            this.preload()
        }

        tryingStartGame(name, elements, next) {
            this.triedStartingGame = true
            if (this.spritesReady && this.imagesReady && this.mapDataReady) {
                this.startGame(name, elements, next)
            }
            else {
                this.tmp = {
                    name: name,
                    elements: elements,
                    next: next
                }
            }
        }

        startGame(name, elements, next) {
            let self = this
            self.game = new Game(name, elements, {
                onBeforeStarted: function (game) {
                    game.images = self.images
                    game.sprites = self.sprites
                    game.mapData = self.mapData
                },
                onAfterStarted: next
            })

            if (self.tmp) {
                self.tmp = null
            }
        }

        preload() {
            let self, promises

            self = this

            promises = [
                self.loadImages(),
                self.loadSprites(),
                self.loadMapData()
            ].reduce(function (arr, p) {
                arr.push(p)
                return arr
            }, [])

            Promise.all(promises).then(function (values) {
                let response
                self.images   = values[0]
                self.sprites  = values[1]
                response = values[2]
                return response
            })
            .then((res) => res.json())
            .then((data) => {
                self.mapData = data
                if (self.triedStartingGame) {
                    self.startGame(self.tmp.name, self.tmp.elements, self.tmp.next)
                }
            })
        }

        loadImages() {

            let self, imageObjects, promise

            self = this

            imageObjects = [
                { id: 'ground',   path: '../images/ground.png' },
                { id: 'lipstick', path: '../images/lipstick.png' },
                { id: 'talk',     path: '../images/talk.png' },
                { id: 'stone',    path: '../images/vendors/stone.png' },
                { id: 'rock-ground',    path: '../images/vendors/rock-ground.png' },
            ]
            promise = new Promise(function (resolve, reject) {

                self.imagesParser(imageObjects, resolve, reject, function (object, image) {
                    return {
                        id: object.id,
                        image: image
                    }
                })

            })

            return promise
        }

        loadSprites() {

            let self, spriteObjects, promise

            self = this

            spriteObjects = [
                { id: 'players', path: '../images/vendors/players.png', sprite: {
                    width: 64,
                    height: 110,
                    animations: {
                        walk_left: {
                            length: 4,
                            row: 1
                        },
                        walk_right: {
                            length: 4,
                            row: 2
                        },
                        walk_up: {
                            length: 4,
                            row: 3
                        },
                        walk_down: {
                            length: 4,
                            row: 4
                        },
                        idle_up: {
                            length: 1,
                            row: 5
                        },
                        idle_down: {
                            length: 1,
                            row: 6
                        },
                        idle_left: {
                            length: 1,
                            row: 7
                        },
                        idle_right: {
                            length: 1,
                            row: 8
                        }
                    }
                }},
                { id: "oldman", path: "../images/oldman.png", sprite: {
                    width: 64,
                    height: 60,
                    animations: {
                        idle_down: {
                            length: 2,
                            row: 1
                        }
                    }
                }}
            ]

            promise = new Promise(function (resolve, reject) {

                self.imagesParser(spriteObjects, resolve, reject, function (object, image) {
                    return {
                        id: object.id,
                        image: image,
                        width: object.sprite.width,
                        height: object.sprite.height,
                        animations: object.sprite.animations,
                    }
                })

            })

            return promise
        }

        loadMapData() {
            return fetch('/map/world.json')
        }

        imagesParser(collection, resolve, reject, callback) {

            let counter, images

            counter = 0
            images  = {}

            collection.forEach(function (object) {

                let image = new Image()
                image.onload = function () {

                    counter++

                    let result = callback(object, image)
                    images[object.id] = result

                    if (collection.length === counter) {
                        resolve(images)
                    }

                }
                image.src = object.path

            })


        }

    }

    root.App = App

})(this)
