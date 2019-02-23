"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ravencoinjsLib = require("ravencoinjs-lib");

var _ravencoinjsLib2 = _interopRequireDefault(_ravencoinjsLib);

var _coininfo = require("coininfo");

var _coininfo2 = _interopRequireDefault(_coininfo);

var _bip32Utils = require("bip32-utils");

var _bip32Utils2 = _interopRequireDefault(_bip32Utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HDNode = function () {
  function HDNode(address) {
    _classCallCheck(this, HDNode);

    this._address = address;
  }

  _createClass(HDNode, [{
    key: "fromSeed",
    value: function fromSeed(rootSeedBuffer) {
      var network = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "testnet";

      var ravencoin = void 0;
      if (network === "ravencoin") ravencoin = _coininfo2.default.ravencoin.main;else ravencoin = _coininfo2.default.ravencoin.test;

      var ravencoinJSLib = ravencoin.toRavencoinJS();
      return _ravencoinjsLib2.default.HDNode.fromSeedBuffer(rootSeedBuffer, ravencoinJSLib);
    }
  }, {
    key: "toLegacyAddress",
    value: function toLegacyAddress(hdNode) {
      return hdNode.getAddress();
    }

    // toRvn2Address(hdNode, regtest = false) {
    //   return this._address.toRvn2Address(hdNode.getAddress(), true, regtest)
    // }

  }, {
    key: "toWIF",
    value: function toWIF(hdNode) {
      return hdNode.keyPair.toWIF();
    }
  }, {
    key: "toXPub",
    value: function toXPub(hdNode) {
      return hdNode.neutered().toBase58();
    }
  }, {
    key: "toXPriv",
    value: function toXPriv(hdNode) {
      return hdNode.toBase58();
    }
  }, {
    key: "toKeyPair",
    value: function toKeyPair(hdNode) {
      return hdNode.keyPair;
    }
  }, {
    key: "toPublicKey",
    value: function toPublicKey(hdNode) {
      return hdNode.getPublicKeyBuffer();
    }
  }, {
    key: "fromXPriv",
    value: function fromXPriv(xpriv) {
      var ravencoin = void 0;
      if (xpriv[0] === "x") ravencoin = _coininfo2.default.ravencoin.main;else if (xpriv[0] === "t") ravencoin = _coininfo2.default.ravencoin.test;

      var ravencoinJSLib = ravencoin.toRavencoinJS();
      return _ravencoinjsLib2.default.HDNode.fromBase58(xpriv, ravencoinJSLib);
    }
  }, {
    key: "fromXPub",
    value: function fromXPub(xpub) {
      var ravencoin = void 0;
      if (xpub[0] === "x") ravencoin = _coininfo2.default.ravencoin.main;else if (xpub[0] === "t") ravencoin = _coininfo2.default.ravencoin.test;

      var ravencoinJSLib = ravencoin.toRavencoinJS();
      return _ravencoinjsLib2.default.HDNode.fromBase58(xpub, ravencoinJSLib);
    }
  }, {
    key: "derivePath",
    value: function derivePath(hdnode, path) {
      return hdnode.derivePath(path);
    }
  }, {
    key: "derive",
    value: function derive(hdnode, path) {
      return hdnode.derive(path);
    }
  }, {
    key: "deriveHardened",
    value: function deriveHardened(hdnode, path) {
      return hdnode.deriveHardened(path);
    }
  }, {
    key: "sign",
    value: function sign(hdnode, buffer) {
      return hdnode.sign(buffer);
    }
  }, {
    key: "verify",
    value: function verify(hdnode, buffer, signature) {
      return hdnode.verify(buffer, signature);
    }
  }, {
    key: "isPublic",
    value: function isPublic(hdnode) {
      return hdnode.isNeutered();
    }
  }, {
    key: "isPrivate",
    value: function isPrivate(hdnode) {
      return !hdnode.isNeutered();
    }
  }, {
    key: "toIdentifier",
    value: function toIdentifier(hdnode) {
      return hdnode.getIdentifier();
    }
  }, {
    key: "fromBase58",
    value: function fromBase58(base58, network) {
      return _ravencoinjsLib2.default.HDNode.fromBase58(base58, network);
    }
  }, {
    key: "createAccount",
    value: function createAccount(hdNodes) {
      var arr = hdNodes.map(function (item, index) {
        return new _bip32Utils2.default.Chain(item.neutered());
      });
      return new _bip32Utils2.default.Account(arr);
    }
  }, {
    key: "createChain",
    value: function createChain(hdNode) {
      return new _bip32Utils2.default.Chain(hdNode);
    }
  }]);

  return HDNode;
}();

exports.default = HDNode;