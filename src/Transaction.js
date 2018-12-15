import Ravencoin from "ravencoinjs-lib"
import axios from "axios"

class Transaction {
  constructor(restURL) {
    this.restURL = restURL
  }

  transaction() {
    return new Ravencoin.Transaction()
  }

  fromHex(hex) {
    return Ravencoin.Transaction.fromHex(hex)
  }

  transactionBuilder(network = "ravencoin") {
    return new Ravencoin.TransactionBuilder(Ravencoin.networks[network])
  }

  fromTransaction(tx) {
    return Ravencoin.TransactionBuilder.fromTransaction(tx)
  }

  async details(txid) {
    if (typeof txid !== "string") txid = JSON.stringify(txid)

    try {
      const response = await axios.get(
        `${this.restURL}transaction/details/${txid}`
      )
      return response.data
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }
}

export default Transaction
