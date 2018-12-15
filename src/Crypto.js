import randomBytes from "randombytes"
import Ravencoin from "ravencoinjs-lib"

class Crypto {
  static sha256(buffer) {
    return Ravencoin.crypto.sha256(buffer)
  }

  static ripemd160(buffer) {
    return Ravencoin.crypto.ripemd160(buffer)
  }

  static hash256(buffer) {
    return Ravencoin.crypto.hash256(buffer)
  }

  static hash160(buffer) {
    return Ravencoin.crypto.hash160(buffer)
  }

  static randomBytes(size = 16) {
    return randomBytes(size)
  }
}

export default Crypto
