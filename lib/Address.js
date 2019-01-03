"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _axios = require("axios");

var _axios2 = _interopRequireDefault(_axios);

var _ravencoinjsLib = require("ravencoinjs-lib");

var _ravencoinjsLib2 = _interopRequireDefault(_ravencoinjsLib);

//var _rvn2addrjs = require("rvn2addrjs");

//var _rvn2addrjs2 = _interopRequireDefault(_rvn2addrjs);

var _coininfo = require("coininfo");

var _coininfo2 = _interopRequireDefault(_coininfo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Address = function () {
  function Address(restURL) {
    _classCallCheck(this, Address);

    this.restURL = restURL;
  }

  // Translate address from any address format into a specific format.


  _createClass(Address, [{
    key: "toLegacyAddress",
    value: function toLegacyAddress(address) {
      var _decode2 = this._decode(address),
          prefix = _decode2.prefix,
          type = _decode2.type,
          hash = _decode2.hash;

      var ravencoin = void 0;
      switch (prefix) {
        case "ravencoin":
          ravencoin = _coininfo2.default.ravencoin.main;
          break;
        case "rvntest":
          ravencoin = _coininfo2.default.ravencoin.test;
          break;
        case "rvnreg":
          ravencoin = _coininfo2.default.ravencoin.test;
          break;
        default:
          throw "unsupported prefix : " + prefix;
      }

      var version = void 0;
      switch (type) {
        case "P2PKH":
          version = ravencoin.versions.public;
          break;
        case "P2SH":
          version = ravencoin.versions.scripthash;
          break;
        default:
          throw "unsupported address type : " + type;
      }

      var hashBuf = Buffer.from(hash);

      return _ravencoinjsLib2.default.address.toBase58Check(hashBuf, version);
    }
  },
  // {
  //   key: "toRvn2Address",
  //   value: function toRvn2Address(address) {
  //     var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  //     var regtest = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  //
  //     var decoded = this._decode(address);
  //
  //     var prefixString = void 0;
  //     if (regtest) prefixString = "rvnreg";else prefixString = decoded.prefix;
  //
  //     var rvn2Address = _rvn2addrjs2.default.encode(prefixString, decoded.type, decoded.hash);
  //
  //     if (prefix) return rvn2Address;
  //     return rvn2Address.split(":")[1];
  //   }
  //
  //   // Converts any address format to hash160
  //
  // },
   {
    key: "toHash160",
    value: function toHash160(address) {
      var legacyAddress = this.toLegacyAddress(address);
      var bytes = _ravencoinjsLib2.default.address.fromBase58Check(legacyAddress);
      return bytes.hash.toString("hex");
    }

    // Converts hash160 to Legacy Address

  }, {
    key: "hash160ToLegacy",
    value: function hash160ToLegacy(hash160) {
      var network = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _ravencoinjsLib2.default.networks.ravencoin.pubKeyHash;

      var buffer = Buffer.from(hash160, "hex");
      var legacyAddress = _ravencoinjsLib2.default.address.toBase58Check(buffer, network);
      return legacyAddress;
    }

    // Converts hash160 to Rvn2 Address

  },
  //  {
  //   key: "hash160ToRvn2",
  //   value: function hash160ToRvn2(hash160) {
  //     var network = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _ravencoinjsLib2.default.networks.ravencoin.pubKeyHash;
  //     var regtest = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  //
  //     var legacyAddress = this.hash160ToLegacy(hash160, network);
  //     return this.toRvn2Address(legacyAddress, true, regtest);
  //   }
  // },
   {
    key: "_decode",
    value: function _decode(address) {
      try {
        return this._decodeLegacyAddress(address);
      } catch (error) {}

      // try {
      //   return this._decodeRvn2Address(address);
      // } catch (error) {}

      try {
        return this._encodeAddressFromHash160(address);
      } catch (error) {}

      throw new Error("Unsupported address format : " + address);
    }
  }, {
    key: "_decodeLegacyAddress",
    value: function _decodeLegacyAddress(address) {
      var _Ravencoin$address$from = _ravencoinjsLib2.default.address.fromBase58Check(address),
          version = _Ravencoin$address$from.version,
          hash = _Ravencoin$address$from.hash;

      var info = _coininfo2.default.ravencoin;

      switch (version) {
        case info.main.versions.public:
          return {
            prefix: "ravencoin",
            type: "P2PKH",
            hash: hash,
            format: "legacy"
          };
        case info.main.versions.scripthash:
          return {
            prefix: "ravencoin",
            type: "P2SH",
            hash: hash,
            format: "legacy"
          };
        case info.test.versions.public:
          return {
            prefix: "rvntest",
            type: "P2PKH",
            hash: hash,
            format: "legacy"
          };
        case info.test.versions.scripthash:
          return {
            prefix: "rvntest",
            type: "P2SH",
            hash: hash,
            format: "legacy"
          };
        default:
          throw new Error("Invalid format : " + address);
      }
    }
  },
  // {
  //   key: "_decodeRvn2Address",
  //   value: function _decodeRvn2Address(address) {
  //     if (address.indexOf(":") !== -1) {
  //       var decoded = _rvn2addrjs2.default.decode(address);
  //       decoded.format = "rvn2addr";
  //       return decoded;
  //     }
  //
  //     var prefixes = ["ravencoin", "rvntest", "rvnreg"];
  //     for (var i = 0; i < prefixes.length; ++i) {
  //       try {
  //         var _decoded = _rvn2addrjs2.default.decode(prefixes[i] + ":" + address);
  //         _decoded.format = "rvn2addr";
  //         return _decoded;
  //       } catch (error) {}
  //     }
  //
  //     throw new Error("Invalid format : " + address);
  //   }
  // },
   {
    key: "_encodeAddressFromHash160",
    value: function _encodeAddressFromHash160(address) {
      try {
        return {
          legacyAddress: this.hash160ToLegacy(address),
          // rvn2Address: this.hash160ToRvn2(address),
          format: "hash160"
        };
      } catch (error) {}

      throw new Error("Invalid format : " + address);
    }

    // Test for address format.

  }, {
    key: "isLegacyAddress",
    value: function isLegacyAddress(address) {
      return this.detectAddressFormat(address) === "legacy";
    }
  },
  //  {
  //   key: "isRvn2Address",
  //   value: function isRvn2Address(address) {
  //     return this.detectAddressFormat(address) === "rvn2addr";
  //   }
  // },
   {
    key: "isHash160",
    value: function isHash160(address) {
      return this.detectAddressFormat(address) === "hash160";
    }

    // Test for address network.

  }, {
    key: "isMainnetAddress",
    value: function isMainnetAddress(address) {
      if (address[0] === "x") return true;else if (address[0] === "t") return false;

      return this.detectAddressNetwork(address) === "mainnet";
    }
  }, {
    key: "isTestnetAddress",
    value: function isTestnetAddress(address) {
      if (address[0] === "x") return false;else if (address[0] === "t") return true;

      return this.detectAddressNetwork(address) === "testnet";
    }
  }, {
    key: "isRegTestAddress",
    value: function isRegTestAddress(address) {
      return this.detectAddressNetwork(address) === "regtest";
    }

    // Test for address type.

  }, {
    key: "isP2PKHAddress",
    value: function isP2PKHAddress(address) {
      return this.detectAddressType(address) === "p2pkh";
    }
  }, {
    key: "isP2SHAddress",
    value: function isP2SHAddress(address) {
      return this.detectAddressType(address) === "p2sh";
    }

    // Detect address format.

  }, {
    key: "detectAddressFormat",
    value: function detectAddressFormat(address) {
      var decoded = this._decode(address);

      return decoded.format;
    }

    // Detect address network.

  }, {
    key: "detectAddressNetwork",
    value: function detectAddressNetwork(address) {
      if (address[0] === "x") return "mainnet";else if (address[0] === "t") return "testnet";

      var decoded = this._decode(address);

      switch (decoded.prefix) {
        case "ravencoin":
          return "mainnet";
        case "rvntest":
          return "testnet";
        case "rvnreg":
          return "regtest";
        default:
          throw new Error("Invalid prefix : " + decoded.prefix);
      }
    }

    // Detect address type.

  }, {
    key: "detectAddressType",
    value: function detectAddressType(address) {
      var decoded = this._decode(address);

      return decoded.type.toLowerCase();
    }
  }, {
    key: "fromXPub",
    value: function fromXPub(xpub) {
      var path = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "0/0";

      var HDNode = _ravencoinjsLib2.default.HDNode.fromBase58(xpub, _ravencoinjsLib2.default.networks[this.detectAddressNetwork(xpub)]);
      var address = HDNode.derivePath(path);
      return this.toLegacyAddress(address.getAddress());
    }
  }, {
    key: "fromOutputScript",
    value: function fromOutputScript(scriptPubKey) {
      var network = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "ravencoin";

      var netParam = void 0;
      if (network !== "ravencoin") netParam = _ravencoinjsLib2.default.networks.testnet;

      var regtest = network === "rvnreg";

      return this.toLegacyAddress(_ravencoinjsLib2.default.address.fromOutputScript(scriptPubKey, netParam), true, regtest);
    }
  }, {
    key: "details",
    value: async function details(address) {
      if (typeof address !== "string") address = JSON.stringify(address);

      try {
        var response = await _axios2.default.get(this.restURL + "address/details/" + address);
        return response.data;
      } catch (error) {
        if (error.response && error.response.data) throw error.response.data;else throw error;
      }
    }
  }, {
    key: "utxo",
    value: async function utxo(address) {
      if (typeof address !== "string") address = JSON.stringify(address);

      try {
        var response = await _axios2.default.get(this.restURL + "address/utxo/" + address);
        return response.data;
      } catch (error) {
        if (error.response && error.response.data) throw error.response.data;else throw error;
      }
    }
  }, {
    key: "unconfirmed",
    value: async function unconfirmed(address) {
      if (typeof address !== "string") address = JSON.stringify(address);

      try {
        var response = await _axios2.default.get(this.restURL + "address/unconfirmed/" + address);
        return response.data;
      } catch (error) {
        if (error.response && error.response.data) throw error.response.data;else throw error;
      }
    }
  }, {
    key: "transactions",
    value: async function transactions(address) {
      if (typeof address !== "string") address = JSON.stringify(address);

      try {
        var response = await _axios2.default.get(this.restURL + "address/transactions/" + address);
        return response.data;
      } catch (error) {
        if (error.response && error.response.data) throw error.response.data;else throw error;
      }
    }
  }]);

  return Address;
}();

exports.default = Address;
