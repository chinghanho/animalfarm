window.isObjectBlank = function (obj) {
    return Object.keys(obj).length === 0 && obj.constructor === Object
}

// alias
Array.prototype.inject = Array.prototype.reduce

// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          window.oRequestAnimationFrame      ||
          window.msRequestAnimationFrame     ||
          function(/* function */ callback, /* DOMElement */ element){
            window.setTimeout(callback, 1000 / 60);
          };
})();

window.includes = function (self, module) {
    Object.assign(self, module)
}
