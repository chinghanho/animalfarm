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
        var $bubbles    = document.querySelector('#bubbles')

        root.app = app = new App($app)

        $play.addEventListener('click', playReady)
        $username.addEventListener('keyup', playReady)

        playReady({}, true)

        document.addEventListener('mousemove', onPlaying)
        document.addEventListener('click', onPlaying)

        function onPlaying(event) {
            if (event.target !== $foreground) { return }

            let game = app.game

            if (game && !game.started) { return }

            if (event.type === 'mousemove') {
                game.mousemove(event)
            }

            if (event.type === 'click') {
                game.click()
            }
        }

        function playReady(event, pass) {
            let keyupNotEnter = event.type === 'keyup' && event.keyCode !== 13
            if (keyupNotEnter) {
                return
            }

            let username = $username.value
            let invalidUsername = !username.match(/^[a-z]+$/)
            if (invalidUsername && !pass) {
                return log.error('Username format invalid')
            }

            $app.classList.add('started')
            $welcome.remove()

            app.tryingStartGame(username, [$background, $entities, $foreground, $bubbles], function () {
            })
        }

    }

    initApp()

})(this)
