import Ravencoin from "ravencoinjs-lib"
import coininfo from "coininfo"

class ECPair {
  static setAddress(address) {
    ECPair._address = address
  }

  static fromWIF(privateKeyWIF) {
    let network
    if (privateKeyWIF[0] === "L" || privateKeyWIF[0] === "K")
      network = "ravencoin"
    else if (privateKeyWIF[0] === "c") network = "testnet"

    let ravencoin
    if (network === "ravencoin") ravencoin = coininfo.ravencoin.main
    else ravencoin = coininfo.ravencoin.test

    const ravencoinJSLib = ravencoin.toRavencoinJS()

    return Ravencoin.ECPair.fromWIF(privateKeyWIF, ravencoinJSLib)
  }

  static toWIF(ecpair) {
    return ecpair.toWIF()
  }

  static sign(ecpair, buffer) {
    return ecpair.sign(buffer)
  }

  static verify(ecpair, buffer, signature) {
    return ecpair.verify(buffer, signature)
  }

  static fromPublicKey(pubkeyBuffer) {
    return Ravencoin.ECPair.fromPublicKeyBuffer(pubkeyBuffer)
  }

  static toPublicKey(ecpair) {
    return ecpair.getPublicKeyBuffer()
  }

  static toLegacyAddress(ecpair) {
    return ecpair.getAddress()
  }

  static toAddress(ecpair, regtest = false) {
    return ECPair._address.toAddress(ecpair.getAddress(), true, regtest)
  }
}

export default ECPair
