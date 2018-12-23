// local deps
import RavenCoin from "./RavenCoin"
import Crypto from "./Crypto"
import Util from "./Util"
import Block from "./Block"
import Blockchain from "./Blockchain"
import Control from "./Control"
import Generating from "./Generating"
import Mining from "./Mining"
import Network from "./Network"
import RawTransactions from "./RawTransactions"
import Mnemonic from "./Mnemonic"
import Address from "./Address"
import HDNode from "./HDNode"
import Transaction from "./Transaction"
import TransactionBuilder from "./TransactionBuilder"
import ECPair from "./ECPair"
import Script from "./Script"
import Price from "./Price"
import Socket from "./Socket"
import Wallet from "./Wallet"

class RVNBOXSDK {
  constructor(config) {
    if (config && config.restURL && config.restURL !== "")
      this.restURL = config.restURL
    else this.restURL = "https://rest.ravencoin.online/v1/"

    this.Address = new Address(this.restURL)
    this.RavenCoin = new RavenCoin(this.Address)
    this.Block = new Block(this.restURL)
    this.Blockchain = new Blockchain(this.restURL)
    this.Control = new Control(this.restURL)
    this.Crypto = Crypto
    this.ECPair = ECPair
    this.ECPair.setAddress(this.Address)
    this.Generating = new Generating(this.restURL)
    this.HDNode = new HDNode(this.Address)
    this.Mining = new Mining(this.restURL)
    this.Mnemonic = new Mnemonic(this.Address)
    this.Network = new Network(this.restURL)
    this.Price = new Price()
    this.RawTransactions = new RawTransactions(this.restURL)
    this.Script = new Script()
    this.Transaction = new Transaction(this.restURL)
    this.TransactionBuilder = TransactionBuilder
    this.TransactionBuilder.setAddress(this.Address)
    this.Util = new Util(this.restURL)
    this.Socket = Socket
    this.Wallet = Wallet
  }
}

export default RVNBOXSDK
