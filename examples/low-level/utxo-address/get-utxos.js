/*
  Check the balance of the root address of an HD node wallet generated
  with the create-wallet example.
*/

"use strict"

// Instantiate RVNBOX.
const rvnboxLib = "../../../lib/rvnbox-sdk"
const RVNBOXSDK = require(rvnboxLib).default
//const RVNBOX = new RVNBOXSDK({ restURL: "http://trest.ravencoin.online/v2/" })
const RVNBOX = new RVNBOXSDK({ restURL: "http://localhost:3000/v2/" })

const ADDR = `rEgfYH2ed8a3Age6qLuhXeLvSUJU4Q3sBE`

async function getUtxos() {
  try {
    // first get RVN balance
    const utxos = await RVNBOX.Address.utxo([ADDR])

    console.log(`UTXO information for address ${ADDR}:`)
    console.log(utxos)
  } catch (err) {
    console.error(`Error in getUtxos: `, err)
    throw err
  }
}
getUtxos()
