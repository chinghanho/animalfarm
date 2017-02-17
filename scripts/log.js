(function (root) {

    'use strict'

    class Log {

        constructor(env) {
            this.env = env || 'development'

            this.info  = console.info
            this.debug = console.log
            this.error = console.error
            this.count = console.count
        }

    }

    root.log = new Log('development')

})(this)
