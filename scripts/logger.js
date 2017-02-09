(function (root) {

    'use strict'

    class Logger {

        constructor(env) {
            this.env = env || 'development'

            this.info  = console.info
            this.log   = console.log
            this.error = console.error
        }

    }

    root.logger = new Logger('development')

})(this)
