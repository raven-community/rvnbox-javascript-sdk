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

    // getAssetAddress(changeType, index, asset) {
    //   return this.rvnWalletBridge.getAddress(changeType, index, asset)
    // }
    //
    // getAssetAddressIndex(changeType, asset) {
    //   return this.rvnWalletBridge.getAddressIndex(changeType, asset)
    // }
    //
    // getAssetAddresses(changeType, startIndex, size, asset) {
    //   return this.rvnWalletBridge.getAddresses(
    //     changeType,
    //     startIndex,
    //     size,
    //     asset
    //   )
    // }

  }, {
    key: "getRedeemScript",
    value: function getRedeemScript(p2shAddress, txid) {
      return this.rvnWalletBridge.getRedeemScript(p2shAddress, txid);
    }
  }, {
    key: "getRedeemScripts",
    value: function getRedeemScripts(txid) {
      return this.rvnWalletBridge.getRedeemScripts(txid);
    }
  }, {
    key: "addRedeemScript",
    value: function addRedeemScript(redeemScript, txid) {
      return this.rvnWalletBridge.addRedeemScript(redeemScript, txid);
    }
  }, {
    key: "getUtxos",
    value: function getUtxos(address) {
      return this.rvnWalletBridge.getUtxos(address);
    }
  }, {
    key: "getBalance",
    value: function getBalance(address) {
      return this.rvnWalletBridge.getBalance(address);
    }
  }, {
    key: "sign",
    value: function sign(address, dataToSign) {
      return this.rvnWalletBridge.sign(address, dataToSign);
    }
  }, {
    key: "buildTransaction",
    value: function buildTransaction(outputs, address) {
      return this.rvnWalletBridge.buildTransaction(outputs, address);
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