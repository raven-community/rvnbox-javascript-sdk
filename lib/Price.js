"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _axios = require("axios");

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Price = function () {
  function Price() {
    _classCallCheck(this, Price);
  }

  _createClass(Price, [{
    key: "current",

    // TODO: v3: Default currency to usd, always call api.coinmarketcap.com
    value: async function current() {
      var currency = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "all";

      try {
        if (currency === "all") {
          var _response = await _axios2.default.get("https://api.coinmarketcap.com/v2/ticker/2577/?convert=EUR");
          return _response.data;
        }

        var response = await _axios2.default.get("https://api.coinmarketcap.com/v2/ticker/2577/?convert=" + currency);
        return response.data.quotes[currency];
      } catch (error) {
        if (error.response && error.response.data) throw error.response.data;else throw error;
      }
    }
  }]);

  return Price;
}();

exports.default = Price;