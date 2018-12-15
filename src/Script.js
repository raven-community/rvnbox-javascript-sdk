import Ravencoin from "ravencoinjs-lib"
import opcodes from "ravencoin-ops"

class Script {
  constructor() {
    this.opcodes = opcodes
    this.nullData = Ravencoin.script.nullData
    this.multisig = {
      input: {
        encode: signatures => {
          const sigs = []
          signatures.forEach(sig => {
            sigs.push(sig)
          })
          return Ravencoin.script.multisig.input.encode(sigs)
        },
        decode: Ravencoin.script.multisig.input.decode,
        check: Ravencoin.script.multisig.input.check
      },
      output: {
        encode: (m, pubKeys) => {
          const pks = []
          pubKeys.forEach(pubKey => {
            pks.push(pubKey)
          })
          return Ravencoin.script.multisig.output.encode(m, pks)
        },
        decode: Ravencoin.script.multisig.output.decode,
        check: Ravencoin.script.multisig.output.check
      }
    }
    this.pubKey = Ravencoin.script.pubKey
    this.pubKeyHash = Ravencoin.script.pubKeyHash
    this.scriptHash = Ravencoin.script.scriptHash
  }

  classifyInput(script) {
    return Ravencoin.script.classifyInput(script)
  }

  classifyOutput(script) {
    return Ravencoin.script.classifyOutput(script)
  }

  decode(scriptBuffer) {
    return Ravencoin.script.decompile(scriptBuffer)
  }

  encode(scriptChunks) {
    const arr = []
    scriptChunks.forEach(chunk => {
      arr.push(chunk)
    })
    return Ravencoin.script.compile(arr)
  }

  toASM(buffer) {
    return Ravencoin.script.toASM(buffer)
  }

  fromASM(asm) {
    return Ravencoin.script.fromASM(asm)
  }
}

export default Script
