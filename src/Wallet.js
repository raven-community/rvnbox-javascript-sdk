// import RVNWalletBridge from "rvn-wallet-bridge.js"
class Wallet {
  constructor(walletProvider) {
    // this.rvnWalletBridge = new RVNWalletBridge(walletProvider)
  }

  setWalletProvider(walletProvider) {
    this.rvnWalletBridge.walletProvider = walletProvider
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

  getRedeemScript(p2shAddress, txid) {
    return this.rvnWalletBridge.getRedeemScript(p2shAddress, txid)
  }

  getRedeemScripts(txid) {
    return this.rvnWalletBridge.getRedeemScripts(txid)
  }

  addRedeemScript(redeemScript, txid) {
    return this.rvnWalletBridge.addRedeemScript(redeemScript, txid)
  }

  getUtxos(address) {
    return this.rvnWalletBridge.getUtxos(address)
  }

  getBalance(address) {
    return this.rvnWalletBridge.getBalance(address)
  }

  sign(address, dataToSign) {
    return this.rvnWalletBridge.sign(address, dataToSign)
  }

  buildTransaction(outputs, address) {
    return this.rvnWalletBridge.buildTransaction(outputs, address)
  }

  getProtocolVersion() {
    return this.rvnWalletBridge.getProtocolVersion()
  }

  getNetwork() {
    return this.rvnWalletBridge.getNetwork()
  }

  getFeePerByte() {
    return this.rvnWalletBridge.getFeePerByte()
  }
}

export default Wallet
