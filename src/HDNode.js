import Ravencoin from "ravencoinjs-lib"
import coininfo from "coininfo"
import bip32utils from "bip32-utils"

class HDNode {
  constructor(address) {
    this._address = address
  }

  fromSeed(rootSeedBuffer, network = "ravencoin") {
    let ravencoin
    if (network === "ravencoin") ravencoin = coininfo.ravencoin.main
    else ravencoin = coininfo.ravencoin.test

    const ravencoinJSLib = ravencoin.toRavencoinJS()
    return Ravencoin.HDNode.fromSeedBuffer(
      rootSeedBuffer,
      ravencoinJSLib
    )
  }

  toLegacyAddress(hdNode) {
    return hdNode.getAddress()
  }

  toAddress(hdNode, regtest = false) {
    return this._address.toAddress(hdNode.getAddress(), true, regtest)
  }

  toWIF(hdNode) {
    return hdNode.keyPair.toWIF()
  }

  toXPub(hdNode) {
    return hdNode.neutered().toBase58()
  }

  toXPriv(hdNode) {
    return hdNode.toBase58()
  }

  toKeyPair(hdNode) {
    return hdNode.keyPair
  }

  toPublicKey(hdNode) {
    return hdNode.getPublicKeyBuffer()
  }

  fromXPriv(xpriv) {
    let ravencoin
    if (xpriv[0] === "x") ravencoin = coininfo.ravencoin.main
    else if (xpriv[0] === "t") ravencoin = coininfo.ravencoin.test

    const ravencoinJSLib = ravencoin.toRavencoinJS()
    return Ravencoin.HDNode.fromBase58(xpriv, ravencoinJSLib)
  }

  fromXPub(xpub) {
    let ravencoin
    if (xpub[0] === "x") ravencoin = coininfo.ravencoin.main
    else if (xpub[0] === "t") ravencoin = coininfo.ravencoin.test

    const ravencoinJSLib = ravencoin.toRavencoinJS()
    return Ravencoin.HDNode.fromBase58(xpub, ravencoinJSLib)
  }

  derivePath(hdnode, path) {
    return hdnode.derivePath(path)
  }

  derive(hdnode, path) {
    return hdnode.derive(path)
  }

  deriveHardened(hdnode, path) {
    return hdnode.deriveHardened(path)
  }

  sign(hdnode, buffer) {
    return hdnode.sign(buffer)
  }

  verify(hdnode, buffer, signature) {
    return hdnode.verify(buffer, signature)
  }

  isPublic(hdnode) {
    return hdnode.isNeutered()
  }

  isPrivate(hdnode) {
    return !hdnode.isNeutered()
  }

  toIdentifier(hdnode) {
    return hdnode.getIdentifier()
  }

  fromBase58(base58, network) {
    return Ravencoin.HDNode.fromBase58(base58, network)
  }

  createAccount(hdNodes) {
    const arr = hdNodes.map(
      (item, index) => new bip32utils.Chain(item.neutered())
    )
    return new bip32utils.Account(arr)
  }

  createChain(hdNode) {
    return new bip32utils.Chain(hdNode)
  }
}

export default HDNode
