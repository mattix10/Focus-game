// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"js/model.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reduceTime = exports.reduceLives = exports.addScore = exports.startGame = exports.resetGame = exports.state = exports.TIME = void 0;
var TIME = 30;
exports.TIME = TIME;
var state = {
  lives: 3,
  scores: 0,
  play: false,
  time: TIME,
  clicked: false
};
exports.state = state;

var resetGame = function resetGame() {
  this.state = {
    lives: 3,
    scores: 0,
    play: false,
    time: TIME,
    clicked: false
  };
};

exports.resetGame = resetGame;

var startGame = function startGame() {
  this.state.play = true;
};

exports.startGame = startGame;

var addScore = function addScore() {
  this.state.scores++;
};

exports.addScore = addScore;

var reduceLives = function reduceLives() {
  this.state.lives--;
};

exports.reduceLives = reduceLives;

var reduceTime = function reduceTime() {
  this.state.time--;
};

exports.reduceTime = reduceTime;
},{}],"js/views/gameView.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var gameView = /*#__PURE__*/function () {
  function gameView() {
    _classCallCheck(this, gameView);

    _defineProperty(this, "_btnStart", document.querySelector(".btn--start"));

    _defineProperty(this, "_btnReset", document.querySelector(".btn--reset"));

    _defineProperty(this, "_squareContainer", document.querySelector(".square__container"));

    _defineProperty(this, "_squares", this._squareContainer.children);

    _defineProperty(this, "_infoDiv", document.querySelector("#info"));

    _defineProperty(this, "_activeClassName", "active--square");

    _defineProperty(this, "removeActiveClass", function (param) {
      if (!param) return;
      if (_typeof(param) === "object") param.classList.remove(this._activeClassName);
      if (typeof param === "number") this._squareContainer.children[param].classList.remove(this._activeClassName);
    });

    _defineProperty(this, "createSquare", function () {
      var square = document.createElement("div");
      square.classList.add("square");
      return square;
    });

    _defineProperty(this, "showSquares", function (number) {
      for (var i = 0; i < number; i++) {
        var square = this.createSquare();

        this._squareContainer.appendChild(square);
      }

      return this._squareContainer;
    });
  }

  _createClass(gameView, [{
    key: "addHandlerStartClick",
    value: function addHandlerStartClick(handler) {
      this._btnStart.addEventListener("click", handler);
    }
  }, {
    key: "addHandlerResetClick",
    value: function addHandlerResetClick(handler) {
      this._btnReset.addEventListener("click", handler);
    }
  }, {
    key: "addHandlerSquareClick",
    value: function addHandlerSquareClick(handler) {
      this._squareContainer.addEventListener("click", handler.bind(this));
    }
  }, {
    key: "deactivateStartButton",
    value: function deactivateStartButton() {
      this._btnStart.setAttribute("disabled", "");

      this._btnStart.classList.remove("btn--start");

      this._btnStart.classList.add("btn--disabled");
    }
  }, {
    key: "activateStartButton",
    value: function activateStartButton() {
      this._btnStart.removeAttribute("disabled");

      this._btnStart.classList.remove("btn--disabled");

      this._btnStart.classList.add("btn--start");
    }
  }, {
    key: "checkDisabled",
    value: function checkDisabled() {
      return this._btnStart.hasAttribute("disabled") ? true : false;
    }
  }, {
    key: "addActiveClass",
    value: function addActiveClass(number) {
      if (!number) return;

      this._squareContainer.children[number].classList.add(this._activeClassName);
    }
  }, {
    key: "showEndMessage",
    value: function showEndMessage() {
      this._infoDiv.innerHTML = "<p class=\"info--end\">Koniec gry!</p> <p class=\"info\">Kliknij przycisk <span class=\"info--reset\">\"Reset\"</span>, a nast\u0119pnie <span class=\"info--start\">Start\"</span>, aby ponownie rozpocz\u0105\u0107.</p>";
    }
  }, {
    key: "showWelcomeMessage",
    value: function showWelcomeMessage() {
      this._infoDiv.innerHTML = "<p class=\"start--message\">Kliknij w <span class=\"info--green\">zielony </span>kwadrat, aby zdoby\u0107 punkt.</p>";
    }
  }]);

  return gameView;
}();

var _default = new gameView();

exports.default = _default;
},{}],"js/views/headerView.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var HeaderView = /*#__PURE__*/function () {
  function HeaderView() {
    _classCallCheck(this, HeaderView);

    _defineProperty(this, "_lives", document.querySelector(".lives"));

    _defineProperty(this, "_scores", document.querySelector(".scores"));

    _defineProperty(this, "_time", document.querySelector(".timer"));
  }

  _createClass(HeaderView, [{
    key: "render",
    value: function render(data) {
      var lives = data.lives,
          scores = data.scores,
          time = data.time;
      this._lives.textContent = lives;
      this._scores.textContent = scores;
      this._time.textContent = time;
    }
  }, {
    key: "updateLives",
    value: function updateLives(data) {
      this._lives.textContent = data;
    }
  }, {
    key: "updateScores",
    value: function updateScores(data) {
      this._scores.textContent = data;
    }
  }, {
    key: "updateTime",
    value: function updateTime(data) {
      this._time.textContent = data;
    }
  }]);

  return HeaderView;
}();

var _default = new HeaderView();

exports.default = _default;
},{}],"js/helpers.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.drawNumber = void 0;

var drawNumber = function drawNumber(value) {
  var min = 1;
  var max = value;
  return Math.floor(Math.random() * (max - min) + min);
};

exports.drawNumber = drawNumber;
},{}],"js/config.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DRAW_INTERVAL = exports.DELAY = exports.HOW_MANY_SQUARES = void 0;
var HOW_MANY_SQUARES = 48;
exports.HOW_MANY_SQUARES = HOW_MANY_SQUARES;
var DELAY = 1000;
exports.DELAY = DELAY;
var DRAW_INTERVAL = 1500;
exports.DRAW_INTERVAL = DRAW_INTERVAL;
},{}],"js/controller.js":[function(require,module,exports) {
"use strict";

var model = _interopRequireWildcard(require("./model.js"));

var _gameView = _interopRequireDefault(require("./views/gameView"));

var _headerView = _interopRequireDefault(require("./views/headerView.js"));

var _helpers = require("./helpers");

var _config = require("./config.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var drawIntervalId;

var startTimer = function startTimer() {
  var tick = function tick() {
    if (isEndOfGame()) {
      clearInterval(drawIntervalId);
      clearInterval(timer);
      return;
    } else {
      _headerView.default.updateTime(model.state.time);

      model.reduceTime();
    }
  };

  tick();
  var timer = setInterval(tick, 1000);
};

var drawGreenSquare = function drawGreenSquare() {
  if (isEndOfGame()) return;
  model.state.clicked = false;
  var greenNumber = (0, _helpers.drawNumber)(_config.HOW_MANY_SQUARES);
  setTimeout(removeActiveClass, _config.DELAY, greenNumber);

  _gameView.default.addActiveClass(greenNumber);
};

var removeActiveClass = function removeActiveClass(el) {
  if (!model.state.clicked) decreaseLives();

  _gameView.default.removeActiveClass(el);
};

var checkSquare = function checkSquare(el) {
  if (isEndOfGame()) return;
  model.state.clicked = true;

  if (el.target.classList.contains("active--square")) {
    _gameView.default.removeActiveClass(el.target);

    model.addScore();

    _headerView.default.updateScores(model.state.scores);
  } else {
    decreaseLives();
  }
};

var decreaseLives = function decreaseLives() {
  model.reduceLives();

  _headerView.default.render(model.state);
};

var isEndOfGame = function isEndOfGame() {
  var _model$state = model.state,
      play = _model$state.play,
      lives = _model$state.lives,
      time = _model$state.time;

  if (lives == 0 || play == false || time == 0) {
    if (_gameView.default.checkDisabled()) _gameView.default.showEndMessage();
    return true;
  } else return false;
};

var startGame = function startGame() {
  _gameView.default.deactivateStartButton();

  _gameView.default.showWelcomeMessage();

  model.startGame();
  startTimer();
  drawIntervalId = setInterval(drawGreenSquare, _config.DRAW_INTERVAL);
};

var init = function init() {
  model.resetGame();
  clearInterval(drawIntervalId);

  _gameView.default.addHandlerStartClick(startGame);

  _gameView.default.addHandlerResetClick(init);

  _gameView.default.activateStartButton();

  _headerView.default.render(model.state);
};

init();

_gameView.default.addHandlerSquareClick(checkSquare);

_gameView.default.showSquares(_config.HOW_MANY_SQUARES);
},{"./model.js":"js/model.js","./views/gameView":"js/views/gameView.js","./views/headerView.js":"js/views/headerView.js","./helpers":"js/helpers.js","./config.js":"js/config.js"}],"node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "55803" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel/src/builtins/hmr-runtime.js","js/controller.js"], null)
//# sourceMappingURL=/controller.f22f2928.js.map