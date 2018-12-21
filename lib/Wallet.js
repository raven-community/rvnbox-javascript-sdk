"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// import RVNWalletBridge from "rvn-wallet-bridge.js"
var Wallet = function () {
  function Wallet(walletProvider) {
    // this.rvnWalletBridge = new RVNWalletBridge(walletProvider)

    _classCallCheck(this, Wallet);
  }

  _createClass(Wallet, [{
    key: "setWalletProvider",
    value: function setWalletProvider(walletProvider) {
      this.rvnWalletBridge.walletProvider = walletProvider;
    }
  }, {
    key: "getAssetAddress",
    value: function getAddress(changeType, index, asset) {
      return this.rvnWalletBridge.getAddress(changeType, index, asset);
    }
  }, {
    key: "getAssetAddressIndex",
    value: function getAddressIndex(changeType, asset) {
      return this.rvnWalletBridge.getAddressIndex(changeType, asset);
    }
  },
  {
    key: "getAssetAddresses",
    value: function getAddresses(changeType, startIndex, size, asset) {
      return this.rvnWalletBridge.getAddresses(changeType, startIndex, size, asset);
    }
  }, {
    key: "getRedeemScript",
    value: function getRedeemScript(p2shAddress, address) {
      return this.rvnWalletBridge.getRedeemScript(p2shAddress, address);
    }
  }, {
    key: "getRedeemScripts",
    value: function getRedeemScripts(address) {
      return this.rvnWalletBridge.getRedeemScripts(address);
    }
  }, {
    key: "addRedeemScript",
    value: function addRedeemScript(redeemScript, address) {
      return this.rvnWalletBridge.addRedeemScript(redeemScript, address);
    }
  },
  {
    key: "getUtxos",
    value: function getUtxos(dAppId) {
      return this.rvnWalletBridge.getUtxos(dAppId);
    }
  }, {
    key: "getBalance",
    value: function getBalance(dAppId) {
      return this.rvnWalletBridge.getBalance(dAppId);
    }
  }, {
    key: "sign",
    value: function sign(address, dataToSign) {
      return this.rvnWalletBridge.sign(address, dataToSign);
    }
  }, {
    key: "buildTransaction",
    value: function buildTransaction(outputs, dAppId) {
      return this.rvnWalletBridge.buildTransaction(outputs, dAppId);
    }
  }, {
    key: "getProtocolVersion",
    value: function getProtocolVersion() {
      return this.rvnWalletBridge.getProtocolVersion();
    }
  }, {
    key: "getNetwork",
    value: function getNetwork() {
      return this.rvnWalletBridge.getNetwork();
    }
  }, {
    key: "getFeePerByte",
    value: function getFeePerByte() {
      return this.rvnWalletBridge.getFeePerByte();
    }
  }]);

  return Wallet;
}();

exports.default = Wallet;
