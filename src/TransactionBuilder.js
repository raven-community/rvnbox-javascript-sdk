import RavenCoin from "ravencoinjs-lib"
import coininfo from "coininfo"
import bip66 from "bip66"
import bip68 from "bc-bip68"

class TransactionBuilder {
  static setAddress(address) {
    TransactionBuilder._address = address
  }

  constructor(network = "testnet") {
    let ravencoin
    if (network === "ravencoin") ravencoin = coininfo.ravencoin.main
    else ravencoin = coininfo.ravencoin.test

    const ravencoinJSLib = ravencoin.toRavencoinJS()
    this.transaction = new Ravencoin.TransactionBuilder(ravencoinJSLib)
    this.DEFAULT_SEQUENCE = 0xffffffff
    this.hashTypes = {
      SIGHASH_ALL: 0x01,
      SIGHASH_NONE: 0x02,
      SIGHASH_SINGLE: 0x03,
      SIGHASH_ANYONECANPAY: 0x80,
      SIGHASH_RAVENCOIN_BIP143: 0x40,
      ADVANCED_TRANSACTION_MARKER: 0x00,
      ADVANCED_TRANSACTION_FLAG: 0x01
    }
    this.bip66 = bip66
    this.bip68 = bip68
    this.p2shInput = false
    this.tx
  }

  addInput(txHash, vout, sequence = this.DEFAULT_SEQUENCE, prevOutScript) {
    this.transaction.addInput(txHash, vout, sequence, prevOutScript)
  }

  addInputScript(vout, script) {
    this.tx = this.transaction.buildIncomplete()
    this.tx.setInputScript(vout, script)
    this.p2shInput = true
  }

  addOutput(scriptPubKey, amount) {
    try {
      this.transaction.addOutput(
        TransactionBuilder._address.toLegacyAddress(scriptPubKey),
        amount
      )
    } catch (error) {
      this.transaction.addOutput(scriptPubKey, amount)
    }
  }

  sign(
    vin,
    keyPair,
    redeemScript,
    hashType = this.hashTypes.SIGHASH_ALL,
    value
  ) {
    let witnessScript

    this.transaction.sign(
      vin,
      keyPair,
      redeemScript,
      hashType,
      value,
      witnessScript
    )
  }

  build() {
    if (this.p2shInput === true) return this.tx

    return this.transaction.build()
  }
}

export default TransactionBuilder
