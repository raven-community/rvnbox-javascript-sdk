"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _axios = require("axios");

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Asset = function () {
    function Asset(restURL) {
        _classCallCheck(this, Asset);

        this.restURL = restURL;
    }

    _createClass(Asset, [{
        key: "details",
        value: async function details(asset) {
            try {
                var response = await _axios2.default.get(this.restURL + "asset/details/" + asset);
                return response.data;
            } catch (error) {
                if (error.response && error.response.status) throw error.response.status + " " + error.response.statusText;else throw error;
            }
        }
    }, {
        key: "list",
        value: async function list() {
            try {
                var response = await _axios2.default.get(this.restURL + "asset/list");
                return response.data;
            } catch (error) {
                if (error.response && error.response.status) throw error.response.status + " " + error.response.statusText;else throw error;
            }
        }
    }, {
        key: "addresses",
        value: async function addresses(asset) {
            try {
                var response = await _axios2.default.get(this.restURL + "asset/addresses/" + asset);
                return response.data;
            } catch (error) {
                if (error.response && error.response.status) throw error.response.status + " " + error.response.statusText;else throw error;
            }
        }
    }, {
        key: "balances",
        value: async function balances(address) {
            try {
                var response = await _axios2.default.get(this.restURL + "asset/details/" + address);
                return response.data;
            } catch (error) {
                if (error.response && error.response.status) throw error.response.status + " " + error.response.statusText;else throw error;
            }
        }
    }]);

    return Asset;
}();

exports.default = Asset;