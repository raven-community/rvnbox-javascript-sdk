import axios from "axios"
import Ravencoin from "ravencoinjs-lib"
import addr from "rvnaddrjs"
import coininfo from "coininfo"

class Address {
  constructor(restURL) {
    this.restURL = restURL
  }

  // Translate address from any address format into a specific format.
  toLegacyAddress(address) {
    const { prefix, type, hash } = this._decode(address)

    let ravencoin
    switch (prefix) {
      case "ravencoin":
        ravencoin = coininfo.ravencoin.main
        break
      case "rvntest":
        ravencoin = coininfo.ravencoin.test
        break
      case "rvnreg":
        ravencoin = coininfo.ravencoin.regtest
        break
      default:
        throw `unsupported prefix : ${prefix}`
    }

    let version
    switch (type) {
      case "P2PKH":
        version = ravencoin.versions.public
        break
      case "P2SH":
        version = ravencoin.versions.scripthash
        break
      default:
        throw `unsupported address type : ${type}`
    }

    const hashBuf = Buffer.from(hash)

    return Ravencoin.address.toBase58Check(hashBuf, version)
  }

  toAddress(address, prefix = true, regtest = false) {
    const decoded = this._decode(address)

    let prefixString
    if (regtest) prefixString = "rvnreg"
    else prefixString = decoded.prefix

    const Address = addr.encode(
      prefixString,
      decoded.type,
      decoded.hash
    )

    if (prefix) return Address
    return Address.split(":")[1]
  }

  // Converts any address format to hash160
  toHash160(address) {
    const legacyAddress = this.toLegacyAddress(address)
    const bytes = Ravencoin.address.fromBase58Check(legacyAddress)
    return bytes.hash.toString("hex")
  }

  // Converts hash160 to Legacy Address
  hash160ToLegacy(hash160, network = Ravencoin.networks.ravencoin.pubKeyHash) {
    const buffer = Buffer.from(hash160, "hex")
    const legacyAddress = Ravencoin.address.toBase58Check(buffer, network)
    return legacyAddress
  }

  // Converts hash160 to  Address
  hash160ToAddress(
    hash160,
    network = Ravencoin.networks.ravencoin.pubKeyHash,
    regtest = false
  ) {
    const legacyAddress = this.hash160ToLegacy(hash160, network)
    return this.toAddress(legacyAddress, true, regtest)
  }

  _decode(address) {
    try {
      return this._decodeLegacyAddress(address)
    } catch (error) {}

    try {
      return this._decodeAddress(address)
    } catch (error) {}

    try {
      return this._encodeAddressFromHash160(address)
    } catch (error) {}

    throw new Error(`Unsupported address format : ${address}`)
  }

  _decodeLegacyAddress(address) {
    const { version, hash } = Ravencoin.address.fromBase58Check(address)
    const info = coininfo.ravencoin

    switch (version) {
      case info.main.versions.public:
        return {
          prefix: "ravencoin",
          type: "P2PKH",
          hash: hash,
          format: "legacy"
        }
      case info.main.versions.scripthash:
        return {
          prefix: "ravencoin",
          type: "P2SH",
          hash: hash,
          format: "legacy"
        }
      case info.test.versions.public:
        return {
          prefix: "rvntest",
          type: "P2PKH",
          hash: hash,
          format: "legacy"
        }
      case info.test.versions.scripthash:
        return {
          prefix: "rvntest",
          type: "P2SH",
          hash: hash,
          format: "legacy"
        }
      default:
        throw new Error(`Invalid format : ${address}`)
    }
  }

  _decodeAddress(address) {
    if (address.indexOf(":") !== -1) {
      const decoded = addr.decode(address)
      decoded.format = "addr"
      return decoded
    }

    const prefixes = ["ravencoin", "rvntest", "rvnreg"]
    for (let i = 0; i < prefixes.length; ++i) {
      try {
        const decoded = addr.decode(`${prefixes[i]}:${address}`)
        decoded.format = "addr"
        return decoded
      } catch (error) {}
    }

    throw new Error(`Invalid format : ${address}`)
  }

  _encodeAddressFromHash160(address) {
    try {
      return {
        legacyAddress: this.hash160ToLegacy(address),
        Address: this.hash160ToAddress(address),
        format: "hash160"
      }
    } catch (error) {}

    throw new Error(`Invalid format : ${address}`)
  }

  // Test for address format.
  isLegacyAddress(address) {
    return this.detectAddressFormat(address) === "legacy"
  }

  isAddress(address) {
    return this.detectAddressFormat(address) === "addr"
  }

  isHash160(address) {
    return this.detectAddressFormat(address) === "hash160"
  }

  // Test for address network.
  isMainnetAddress(address) {
    if (address[0] === "x") return true
    else if (address[0] === "t") return false

    return this.detectAddressNetwork(address) === "mainnet"
  }

  isTestnetAddress(address) {
    if (address[0] === "x") return false
    else if (address[0] === "t") return true

    return this.detectAddressNetwork(address) === "testnet"
  }

  isRegTestAddress(address) {
    return this.detectAddressNetwork(address) === "regtest"
  }

  // Test for address type.
  isP2PKHAddress(address) {
    return this.detectAddressType(address) === "p2pkh"
  }

  isP2SHAddress(address) {
    return this.detectAddressType(address) === "p2sh"
  }

  // Detect address format.
  detectAddressFormat(address) {
    const decoded = this._decode(address)

    return decoded.format
  }

  // Detect address network.
  detectAddressNetwork(address) {
    if (address[0] === "x") return "mainnet"
    else if (address[0] === "t") return "testnet"

    const decoded = this._decode(address)

    switch (decoded.prefix) {
      case "ravencoin":
        return "mainnet"
      case "rvntest":
        return "testnet"
      case "rvnreg":
        return "regtest"
      default:
        throw new Error(`Invalid prefix : ${decoded.prefix}`)
    }
  }

  // Detect address type.
  detectAddressType(address) {
    const decoded = this._decode(address)

    return decoded.type.toLowerCase()
  }

  fromXPub(xpub, path = "0/0") {
    const HDNode = Ravencoin.HDNode.fromBase58(
      xpub,
      Ravencoin.networks[this.detectAddressNetwork(xpub)]
    )
    const address = HDNode.derivePath(path)
    return this.toAddress(address.getAddress())
  }

  fromOutputScript(scriptPubKey, network = "ravencoin") {
    let netParam
    if (network !== "ravencoin") netParam = Ravencoin.networks.testnet

    const regtest = network === "rvnreg"

    return this.toAddress(
      Ravencoin.address.fromOutputScript(scriptPubKey, netParam),
      true,
      regtest
    )
  }

  async details(address) {
    if (typeof address !== "string") address = JSON.stringify(address)

    try {
      const response = await axios.get(
        `${this.restURL}address/details/${address}`
      )
      return response.data
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }

  async utxo(address) {
    if (typeof address !== "string") address = JSON.stringify(address)

    try {
      const response = await axios.get(`${this.restURL}address/utxo/${address}`)
      return response.data
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }

  async unconfirmed(address) {
    if (typeof address !== "string") address = JSON.stringify(address)

    try {
      const response = await axios.get(
        `${this.restURL}address/unconfirmed/${address}`
      )
      return response.data
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }

  async transactions(address) {
    if (typeof address !== "string") address = JSON.stringify(address)

    try {
      const response = await axios.get(
        `${this.restURL}address/transactions/${address}`
      )
      return response.data
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }
}

export default Address
