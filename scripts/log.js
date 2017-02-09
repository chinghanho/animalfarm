(function (root) {

    'use strict'

    class Log {

        constructor(env) {
            this.env = env || 'development'

            this.info  = console.info
            this.debug   = console.log
            this.error = console.error
        }

    }

    root.log = new Log('development')

})(this)
