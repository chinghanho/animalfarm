(function (root) {

    'use strict'

    class App {

        constructor($app) {
            this.$elem = $app
            this.images = {
                stack: [],
                ready: false,
                counter: 0,
                loaded: {}
            }
            this.loadImages()
        }

        tryingStartGame(name, canvases, next) {
            this.gameStated = true
            if (this.images.ready) {
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
            self.game = new Game(name, canvases, {
                onBeforeStarted: (game) => game.images = self.images.loaded,
                onAfterStarted: next
            })
        }

        loadImages() {
            let self = this

            self.images.stack = [
                { id: 'ground',   path: '../images/ground.png' },
                { id: 'lipstick', path: '../images/lipstick.png' }
            ]

            self.images.loaded = self.images.stack.reduce(function (result, object) {
                let image

                object.id

                image = new Image()
                image.onload = function () {
                    self.images.counter++
                    if (self.images.stack.length === self.images.counter) {
                        self.images.ready = true
                        if (self.gameStated) {
                            self.startGame(self.tmp.name, self.tmp.canvases, self.tmp.next)
                            self.tmp = null
                        }
                    }
                }
                image.src = object.path
                result[object.id] = {
                    bitmap: image
                }

                return result
            }, {})
        }

    }

    root.App = App

})(this)
