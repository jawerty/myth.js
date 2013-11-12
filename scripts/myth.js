var _canvas = null;
var _buffer = null;
var canvas = null;
var buffer = null;

keycodes = {
  "backspace": 8,
  "tab": 9,
  "enter": 13,
  "shift": 16,
  "ctrl": 17,
  "alt": 18,
  "pause": 19,
  "caps_lock": 20,
  "escape": 27,
  "space": 32,
  "page_up": 33,
  "page_down": 34,
  "end": 35,
  "home": 36,
  "left_arrow": 37,
  "up_arrow": 38,
  "right_arrow": 39,
  "down_arrow": 40,
  "insert": 45,
  "delete": 46,
  "0": 48,
  "1": 49,
  "2": 50,
  "3": 51,
  "4": 52,
  "5": 53,
  "6": 54,
  "7": 55,
  "8": 56,
  "9": 57,
  ";": 59,
  "=": 61,
  "a": 65,
  "b": 66,
  "c": 67,
  "d": 68,
  "e": 69,
  "f": 70,
  "g": 71,
  "h": 72,
  "i": 73,
  "j": 74,
  "k": 75,
  "l": 76,
  "m": 77,
  "n": 78,
  "o": 79,
  "p": 80,
  "q": 81,
  "r": 82,
  "s": 83,
  "t": 84,
  "u": 85,
  "v": 86,
  "w": 87,
  "x": 88,
  "y": 89,
  "z": 90,
  "left_windows_key": 91,
  "right_windows_key": 92,
  "context_menu_key": 93,
  "forward_slash": 111,
  "f1": 112,
  "f2": 113,
  "f3": 114,
  "f4": 115,
  "f5": 116,
  "f6": 117,
  "f7": 118,
  "f8": 119,
  "f9": 120,
  "f10": 121,
  "f11": 122,
  "f12": 123,
  "num_lock": 114,
  "scroll_lock": 145,
  "<": 188,
  ">": 190,
  "back_slash": 220,
  "[": 219,
  "]": 221
}

function Myth(_canvas) {
  this.gameLoop = null;
  var self = this;

  this.init = function() {
    if (_canvas && _canvas.getContext) {
      canvas = _canvas.getContext('2d');

      _buffer = document.createElement('canvas');
      _buffer.width = _canvas.width;
      _buffer.height = _canvas.height;

      buffer = _buffer.getContext('2d');

      buffer.strokeStyle = 'rgb(255, 255, 255)';
      buffer.fillStyle = 'rgb(255, 255, 255)';
      buffer.font = "bold 25px sans-serif";

    }

  }

  self.init();

  this.run = function() {
    self.load();
    if (canvas != null) {
      self.gameLoop = setInterval(self.loop, 12)
    }

  }

  this.loop = function() {
    var loops = 0,
      skipTicks = 128,
      maxFrameSkip = 128,
      nextGameTick = (new Date)
        .getTime();

    function tick() {
      loops = 0;

      while ((new Date)
        .getTime() > nextGameTick && loops < maxFrameSkip) {
        self.update();
        nextGameTick += skipTicks;
        loops++;
      }
      buffer.clearRect(0, 0, _buffer.width, _buffer.height);
      canvas.clearRect(0, 0, _canvas.width, _canvas.height);
      self.draw();
    }
    return tick();

  }

  /*Image handling*/
  this.graphics = {
    newSprite: function(src, height, width) {
      base_image = new Image();
      base_image.src = src;
      if (height) base_image.height = height;
      if (width) base_image.width = width;
      return base_image;
    },

    drawSprite: function(img, x, y) {
      canvas.drawImage(img, x, y, img.width, img.height);
    },

    setBackgroundColor: function(color) {
      if (typeof color === 'undefined') {
        color = '#bbbbbb';
      } else {
        null
      }
      canvas.save();
      canvas.fillStyle = color;
      canvas.fillRect(0, 0, _canvas.width, _canvas.height);
      canvas.restore();
    },

    setBackgroundImage: function(src) {
      bgImg = new Image();
      bgImg.src = src;
      canvas.drawImage(bgImg, 0, 0, _canvas.width, _canvas.height);
    },

    rect: function(x, y, height, width, color) {
      if (typeof color === 'undefined') color = '#bbbbbb';

      canvas.save();
      canvas.fillStyle = color;
      canvas.fillRect(x, y, height, width);
      canvas.restore();
    },

    circle: function(x, y, radius, lw, lc, type, color) {
      canvas.save()
      canvas.beginPath();
      canvas.arc(x, y, radius, 0, 2 * Math.PI, false);
      canvas.fillStyle = color || '#bbbbbb';
      if (type == 'fill') canvas.fill();

      canvas.lineWidth = lw || null;
      canvas.strokeStyle = lc || null;
      canvas.stroke();
      canvas.closePath();
      canvas.restore()
    },

    line: function(x1, y1, x2, y2, color) {
      canvas.save()
      canvas.beginPath();
      canvas.fillStyle = color || '#bbbbbb';
      canvas.moveTo(x1, y1);
      canvas.lineTo(x2, y2);
      canvas.stroke();
      canvas.closePath();
      canvas.restore()
    },

    fontStyle: function(type, size, family, color) {
      canvas.save();
      canvas.fillStyle = color;
      canvas.font = type + ' ' + size + ' ' + family;

    },

    fontText: function(text, x, y) {
      canvas.fillText(text, x, y);
      canvas.restore();
    }

  };

  /*Input handling*/
  this.input = {
    keyDown: function(key, callback) {
      document.addEventListener('keydown', function(event) {
        if (typeof key !== "number" && typeof keycodes[key] != "undefined") key = keycodes[key.toLowerCase()]
        if (event.keyCode == key) {
          return callback();
        }
      });

    },

    keyUp: function(key, callback) {
      document.addEventListener('keyup', function(event) {
        if (typeof key !== "number" && typeof keycodes[key] != "undefined") key = keycodes[key.toLowerCase()]
        if (event.keyCode == key) {
          return callback();
        }
      });
    }

  };
  /*Animation*/
  this.animation = {

  }

};