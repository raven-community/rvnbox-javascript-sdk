// import RVNWalletBridge from "rvn-wallet-bridge.js"
class Wallet {
  constructor(walletProvider) {
    // this.rvnWalletBridge = new RVNWalletBridge(walletProvider)
  }

  setWalletProvider(walletProvider) {
    this.rvnWalletBridge.walletProvider = walletProvider
  }

  getAddress(changeType, index, dAppId) {
    return this.rvnWalletBridge.getAddress(changeType, index, dAppId)
  }

  getAddressIndex(changeType, dAppId) {
    return this.rvnWalletBridge.getAddressIndex(changeType, dAppId)
  }

  getAddresses(changeType, startIndex, size, dAppId) {
    return this.rvnWalletBridge.getAddresses(
      changeType,
      startIndex,
      size,
      dAppId
    )
  }

  getRedeemScript(p2shAddress, dAppId) {
    return this.rvnWalletBridge.getRedeemScript(p2shAddress, dAppId)
  }

  getRedeemScripts(dAppId) {
    return this.rvnWalletBridge.getRedeemScripts(dAppId)
  }

  addRedeemScript(redeemScript, dAppId) {
    return this.rvnWalletBridge.addRedeemScript(redeemScript, dAppId)
  }

  getUtxos(dAppId) {
    return this.rvnWalletBridge.getUtxos(dAppId)
  }

  getBalance(dAppId) {
    return this.rvnWalletBridge.getBalance(dAppId)
  }

  sign(address, dataToSign) {
    return this.rvnWalletBridge.sign(address, dataToSign)
  }

  buildTransaction(outputs, dAppId) {
    return this.rvnWalletBridge.buildTransaction(outputs, dAppId)
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

  getDefaultDAppId() {
    return this.rvnWalletBridge.getDefaultDAppId()
  }

  setDefaultDAppId(dAppId) {
    return this.rvnWalletBridge.setDefaultDAppId(dAppId)
  }
}

export default Wallet
