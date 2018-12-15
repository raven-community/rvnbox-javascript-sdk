/*
  Check the balance of the root address of an HD node wallet generated
  with the create-wallet example.
*/

"use strict"

// Instantiate RVNBOX.
const rvnboxLib = "../../../lib/rvnbox-sdk"
const RVNBOXSDK = require(rvnboxLib).default
//const RVNBOX = new RVNBOXSDK({ restURL: "https://trest.ravencoin.online/v1/" })
const RVNBOX = new RVNBOXSDK({ restURL: "htts://localhost:3000/v1/" })

const ADDR = `rEgfYH2ed8a3Age6qLuhXeLvSUJU4Q3sBE`

async function addressDetails() {
  try {
    // first get RVN balance
    const balance = await RVNBOX.Address.details([ADDR])

    console.log(`RVN Balance information:`)
    console.log(balance)
  } catch (err) {
    console.error(`Error in getBalance: `, err)
    throw err
  }
}
addressDetails()
