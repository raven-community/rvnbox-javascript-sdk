import Ravencoin from "ravencoinjs-lib"
import sb from "corbe-ravencoin"
import ravencoinMessage from "ravencoinjs-message"
import bs58 from "bs58"
import bip21 from "bip21"
import coininfo from "coininfo"
import bip38 from "bip38"
import wif from "wif"

const Buffer = require("safe-buffer").Buffer

class RavenCoin {
  constructor(address) {
    this._address = address
  }

  // Translate coins to corbe value
  toCorbe(coins) {
    return sb.toCorbe(coins)
  }

  // Translate corbe to coin value
  toRavenCoin(corbes) {
    return sb.toRavencoin(corbes)
  }

  // Translate corbe to bits denomination
  toBits(corbes) {
    return parseFloat(corbes) / 100
  }

  // Translate corbe to bits denomination
  // TODO remove in 2.0
  corbeToBits(corbes) {
    return parseFloat(corbes) / 100
  }

  // Translate bits to corbe denomination
  // TODO remove in 2.0
  // fromBits(bits) {
  //   return this.toInteger(bits * 100);
  // }
  //
  // // Translate bits to corbe denomination
  // corbeFromBits(bits) {
  //   return this.toInteger(bits * 100);
  // }
  //
  // toInteger(number){
  //   return Math.round(  // round to nearest integer
  //     Number(number)    // type cast your input
  //   );
  // }

  // sign message
  signMessageWithPrivKey(privateKeyWIF, message) {
    const network = privateKeyWIF.charAt(0) === "c" ? "testnet" : "ravencoin"
    let ravencoin
    if (network === "ravencoin") ravencoin = coininfo.ravencoin.main
    else ravencoin = coininfo.ravencoin.test

    const ravencoinJSLib = ravencoin.toRavencoinJS()
    const keyPair = Ravencoin.ECPair.fromWIF(
      privateKeyWIF,
      ravencoinJSLib
    )
    const privateKey = keyPair.d.toBuffer(32)
    return ravencoinMessage
      .sign(message, privateKey, keyPair.compressed)
      .toString("base64")
  }

  // verify message
  verifyMessage(address, signature, message) {
    return ravencoinMessage.verify(
      message,
      this._address.toLegacyAddress(address),
      signature
    )
  }

  // encode base58Check
  encodeBase58Check(hex) {
    return bs58.encode(Buffer.from(hex, "hex"))
  }

  // decode base58Check
  decodeBase58Check(address) {
    return bs58.decode(address).toString("hex")
  }

  // encode bip21 url
  encodeBIP21(address, options, regtest = false) {
    return bip21.encode(
      this._address.toCashAddress(address, true, regtest),
      options
    )
  }

  // decode bip21 url
  decodeBIP21(url) {
    return bip21.decode(url)
  }

  getByteCount(inputs, outputs) {
    // from https://github.com/bitcoinjs/bitcoinjs-lib/issues/921#issuecomment-354394004
    let totalWeight = 0
    let hasWitness = false
    // assumes compressed pubkeys in all cases.
    const types = {
      inputs: {
        "MULTISIG-P2SH": 49 * 4,
        "MULTISIG-P2WSH": 6 + 41 * 4,
        "MULTISIG-P2SH-P2WSH": 6 + 76 * 4,
        P2PKH: 148 * 4,
        P2WPKH: 108 + 41 * 4,
        "P2SH-P2WPKH": 108 + 64 * 4
      },
      outputs: {
        P2SH: 32 * 4,
        P2PKH: 34 * 4,
        P2WPKH: 31 * 4,
        P2WSH: 43 * 4
      }
    }

    Object.keys(inputs).forEach(function(key) {
      if (key.slice(0, 8) === "MULTISIG") {
        // ex. "MULTISIG-P2SH:2-3" would mean 2 of 3 P2SH MULTISIG
        const keyParts = key.split(":")
        if (keyParts.length !== 2) throw new Error(`invalid input: ${key}`)
        const newKey = keyParts[0]
        const mAndN = keyParts[1].split("-").map(function(item) {
          return parseInt(item)
        })

        totalWeight += types.inputs[newKey] * inputs[key]
        const multiplyer = newKey === "MULTISIG-P2SH" ? 4 : 1
        totalWeight += (73 * mAndN[0] + 34 * mAndN[1]) * multiplyer
      } else {
        totalWeight += types.inputs[key] * inputs[key]
      }
      if (key.indexOf("W") >= 0) hasWitness = true
    })

    Object.keys(outputs).forEach(function(key) {
      totalWeight += types.outputs[key] * outputs[key]
    })

    if (hasWitness) totalWeight += 2

    totalWeight += 10 * 4

    return Math.ceil(totalWeight / 4)
  }

  encryptBIP38(privKeyWIF, passphrase) {
    const decoded = wif.decode(privKeyWIF)

    return bip38.encrypt(decoded.privateKey, decoded.compressed, passphrase)
  }

  decryptBIP38(encryptedKey, passphrase, network = "mainnet") {
    const decryptedKey = bip38.decrypt(encryptedKey, passphrase)
    let prefix
    if (network === "testnet") prefix = 0xef
    else prefix = 0x80

    return wif.encode(prefix, decryptedKey.privateKey, decryptedKey.compressed)
  }
}

export default RavenCoin
