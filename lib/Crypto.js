"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _randombytes = require("randombytes");

var _randombytes2 = _interopRequireDefault(_randombytes);

var _ravencoinjsLib = require("ravencoinjs-lib");

var _ravencoinjsLib2 = _interopRequireDefault(_ravencoinjsLib);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Crypto = function () {
  function Crypto() {
    _classCallCheck(this, Crypto);
  }

  _createClass(Crypto, null, [{
    key: "sha256",
    value: function sha256(buffer) {
      return _ravencoinjsLib2.default.crypto.sha256(buffer);
    }
  }, {
    key: "ripemd160",
    value: function ripemd160(buffer) {
      return _ravencoinjsLib2.default.crypto.ripemd160(buffer);
    }
  }, {
    key: "hash256",
    value: function hash256(buffer) {
      return _ravencoinjsLib2.default.crypto.hash256(buffer);
    }
  }, {
    key: "hash160",
    value: function hash160(buffer) {
      return _ravencoinjsLib2.default.crypto.hash160(buffer);
    }
  }, {
    key: "randomBytes",
    value: function randomBytes() {
      var size = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 16;

      return (0, _randombytes2.default)(size);
    }
  }]);

  return Crypto;
}();

exports.default = Crypto;
