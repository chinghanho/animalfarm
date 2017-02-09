(function (root) {

    'use strict'

    var initApp = function () {

        var app
        var $welcome    = document.querySelector('#welcome')
        var $app        = document.querySelector('#app')
        var $username   = document.querySelector('#username')
        var $play       = document.querySelector('#play')
        var $background = document.querySelector('#background')
        var $entities   = document.querySelector('#entities')
        var $foreground = document.querySelector('#foreground')

        root.app = app = new App($app)

        $play.addEventListener('click', onPlay)
        $username.addEventListener('keyup', onPlay)

        document.addEventListener('mousemove', function (event) {

            if (event.target !== $foreground) { return }

            if (app.game && app.game.started) {
                app.game.updateCoordinate(event)
            }
        })

        function onPlay() {
            let keyupNotEnter = event.type === 'keyup' && event.keyCode !== 13
            if (keyupNotEnter) {
                return
            }

            let username = $username.value
            let invalidUsername = !username.match(/^[a-z]+$/)
            if (invalidUsername) {
                return logger.error('Username format invalid')
            }

            app.startGame(username, [$background, $entities, $foreground], function () {
                $app.classList.add('initialized')
                $welcome.remove()
            })

        }

    }

    initApp()

})(this)
