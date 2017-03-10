class Util {

    static stamp(object) {
        object.__id__ = object.__id__ || Symbol(object)
        return object.__id__
    }

    /**
     * Interface validator.
     * @param  {Array} callbackNames - Names of callback should be implemented.
     * @param  {Object} controller   - The instance of the controller.
     * @return {Object}
     */
    static defineInterface(callbackNames, controller) {
        var notImplemented = callbackNames.reduce(function (errors, callbackName) {
            if (typeof controller[callbackName] !== 'function') {
                errors.push(callbackName)
            }
            return errors
        }, [])

        if (notImplemented.length > 0) {
            throw new Error(notImplemented.join(', ') + ' method not implement yet.')
        }

        return this
    }

}

module.exports = Util

// window.isObjectBlank = function (obj) {
//     return Object.keys(obj).length === 0 && obj.constructor === Object
// }

// // alias
// Array.prototype.inject = Array.prototype.reduce

// // http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// window.requestAnimFrame = (function(){
//   return  window.requestAnimationFrame       ||
//           window.webkitRequestAnimationFrame ||
//           window.mozRequestAnimationFrame    ||
//           window.oRequestAnimationFrame      ||
//           window.msRequestAnimationFrame     ||
//           function(/* function */ callback, /* DOMElement */ element){
//             window.setTimeout(callback, 1000 / 60);
//           };
// })();

// window.includes = function (self, module) {
//     Object.assign(self, module)
// }
