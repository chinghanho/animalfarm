(function (root) {

    'use strict'

    class App {

        constructor($app) {
            this.$elem = $app
            this.triedStartingGame = false
            this.gameStarted = false
            this.tmp = null
            this.images = {
                stack: [],
                ready: false,
                counter: 0,
                loaded: {}
            }
            this.sprites = {
                stack: [],
                ready: false,
                counter: 0,
                loaded: {}
            }
            this.preload()
        }

        tryingStartGame(name, canvases, next) {
            this.triedStartingGame = true
            if (this.images.ready && this.sprites.ready) {
                this.startGame(name, canvases, next)
            }
            else {
                this.tmp = {
                    name: name,
                    canvases: canvases,
                    next: next
                }
            }
        }

        startGame(name, canvases, next) {
            let self = this
            this.gameStarted = true
            self.game = new Game(name, canvases, {
                onBeforeStarted: function (game) {
                    game.images = self.images.loaded
                    game.sprites = self.sprites.loaded
                },
                onAfterStarted: next
            })

            if (self.tmp) {
                self.tmp = null
            }
        }

        preload() {
            this.loadImages()
            this.loadSprites()
        }

        loadImages() {
            let self = this

            self.images.stack = [
                { id: 'ground',   path: '../images/ground.png' },
                { id: 'lipstick', path: '../images/lipstick.png' },
            ]

            self.images.loaded = self._diet(self.images, function (image, object) {
                return {
                    id: object.id,
                    image: image,
                }
            })
        }

        loadSprites() {
            let self = this

            self.sprites.stack = [
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
                { id: 'stone', path: '../images/vendors/stone.png', sprite: {
                    width: 64,
                    height: 64,
                    animations: {
                        idle: {
                            length: 1,
                            row: 1
                        }
                    }
                }},
                { id: "oldman", path: "../images/oldman.png", sprite: {
                    width: 64,
                    height: 60,
                    animations: {
                        idle: {
                            length: 2,
                            row: 1
                        }
                    }
                }}
            ]

            self.sprites.loaded = self._diet(self.sprites, function (image, object) {
                return {
                    id: object.id,
                    image: image,
                    width: object.sprite.width,
                    height: object.sprite.height,
                    animations: object.sprite.animations,
                }
            })
        }

        _diet(qq, callback) {
            let self = this
            return qq.stack.inject(function (result, mm) {
                let image = new Image()
                image.onload = function () {
                    qq.counter++
                    if (qq.stack.length === qq.counter) {
                        qq.ready = true
                        if (!self.gameStarted && self.triedStartingGame) {
                            self.startGame(self.tmp.name, self.tmp.canvases, self.tmp.next)
                        }
                    }
                }
                image.src = mm.path
                result[mm.id] = callback(image, mm)

                return result
            }, {})
        }

    }

    root.App = App

})(this)
