(function (root) {

    'use strict'

    class App {

        constructor($app) {
            this.$elem = $app
        }

        startGame(name, canvases, next) {
            return this.game = new Game(name, canvases, next)
        }

    }

    root.App = App

})(this)
