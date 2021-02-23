"use strict";

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Operation = /*#__PURE__*/function () {
  function Operation() {
    _classCallCheck(this, Operation);

    this.handlers = {};
    this.states = ['pending', 'successfully', 'failed'];
    this.state = this.states[0];
  }

  _createClass(Operation, [{
    key: "then",
    value: function then(callback) {
      this.on('success', callback);
      this.on('fail', callback);
    }
  }, {
    key: "dispatch",
    value: function dispatch(e) {
      if (e === 'success') {
        this.state = this.states[1];
      } else if (e === 'fail') {
        this.state = this.states[2];
      }

      for (var _len = arguments.length, values = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        values[_key - 1] = arguments[_key];
      }

      var _iterator = _createForOfIteratorHelper(this.handlers[e] || []),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var handler = _step.value;
          handler.apply(void 0, values);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }, {
    key: "fail",
    value: function fail() {
      for (var _len2 = arguments.length, values = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        values[_key2] = arguments[_key2];
      }

      this.dispatch.apply(this, ['fail'].concat(values));
    }
  }, {
    key: "success",
    value: function success() {
      for (var _len3 = arguments.length, values = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        values[_key3] = arguments[_key3];
      }

      this.dispatch.apply(this, ['success'].concat(values));
    }
  }, {
    key: "on",
    value: function on(e, handler) {
      if (_typeof(this.handlers[e]) !== 'object') {
        this.handlers[e] = [];
      }

      this.handlers[e].push(handler);
    }
  }]);

  return Operation;
}();

var waitFor = function waitFor(operation, callback) {
  operation.on('success', callback);
  operation.on('fail', callback);
};

var isSuccess = function isSuccess(operation) {
  return operation.state === operation.states[1];
};

var waitfor = waitFor;

if (window) {
  window.waitFor = waitFor;
  window.waitfor = waitfor;
  window.Operation = Operation;
  window.isSuccess = isSuccess;
}

var BlockyLanguage = function BlockyLanguage(name) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    events: []
  },
      events = _ref.events;

  _classCallCheck(this, BlockyLanguage);

  this.name = name;
  this.events = events;
};

var BlockyEvent = /*#__PURE__*/function () {
  function BlockyEvent() {
    _classCallCheck(this, BlockyEvent);

    this.__type = 'Event';
  }

  _createClass(BlockyEvent, [{
    key: "define",
    value: function define() {
      var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
        name: 'Event',
        id: 'event',
        argv: []
      },
          name = _ref2.name,
          id = _ref2.id,
          argv = _ref2.argv;

      this.name = name;
      this.id = id;
      this.argv = argv;
    }
  }]);

  return BlockyEvent;
}();

var BlockyRunEvent = /*#__PURE__*/function (_BlockyEvent) {
  _inherits(BlockyRunEvent, _BlockyEvent);

  var _super = _createSuper(BlockyRunEvent);

  function BlockyRunEvent() {
    var _this;

    _classCallCheck(this, BlockyRunEvent);

    _this = _super.call(this);

    _this.define({
      name: 'Run',
      id: 'runevent',
      argv: []
    });

    return _this;
  }

  return BlockyRunEvent;
}(BlockyEvent);

var Blocky = /*#__PURE__*/function () {
  function Blocky(selector) {
    _classCallCheck(this, Blocky);

    this.selector = selector;
    this.elem = document.querySelector(this.selector);
    this.logEvent = new Operation();
    this.logEvent.on('init', function (sel) {
      console.log("New Blocky Editor: ".concat(sel));
    });
    this.logEvent.on('iqs', function (sel) {
      console.log("[Blocky Editor ".concat(sel, "] ").concat(sel, " is not a valid selector"));
    });
    this.logEvent.dispatch('init', this.selector);

    if (this.elem && this.elem.style) {} else {
      this.logEvent.dispatch('iqs', this.selector);
      throw new Error('Invalid Selector');
    }
  }

  _createClass(Blocky, [{
    key: "run",
    value: function run() {
      this.initHTML();
    }
  }, {
    key: "initHTML",
    value: function initHTML() {
      this.elem.innerHTML = "\n      <div class=\"blocky-sideview\">\n        <h1>".concat(this.lang.name, "</h1>\n      </div>\n      <div class=\"blocky-code\">\n\n      </div>\n    ");
      this.elem.style.fontFamily = 'Menlo, Consolas, DejaVu Sans Mono, OpenSans monospace, sans-serif';
    }
  }, {
    key: "setSize",
    value: function setSize(height, width) {
      this.height = height;
      this.width = width;
      this.elem.style.height = this.height;
      this.elem.style.width = this.width;
    }
  }, {
    key: "setLang",
    value: function setLang(language) {
      this.lang = language;
    }
  }]);

  return Blocky;
}();

if (window) window.Blocky = Blocky;
if (window) window.BlockyEvent = BlockyEvent;
if (window) window.BlockyLanguage = BlockyLanguage;
if (window) window.BlockyRunEvent = BlockyRunEvent;