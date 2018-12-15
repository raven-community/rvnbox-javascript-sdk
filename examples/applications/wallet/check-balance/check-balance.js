/*
  Check the balance of the root address of an HD node wallet generated
  with the create-wallet example.
*/

// Instantiate RVNBOX.
const rvnboxLib = "../../../../lib/rvnbox-sdk"
const RVNBOXSDK = require(rvnboxLib).default
const RVNBOX = new RVNBOXSDK({ restURL: "https://trest.ravencoin.online/v1/" })

// Open the wallet generated with create-wallet.
try {
  var walletInfo = require(`../create-wallet/wallet.json`)
} catch (err) {
  console.log(
    `Could not open wallet.json. Generate a wallet with create-wallet first.`
  )
  process.exit(0)
}

// Get the balance of the wallet.
async function getBalance() {
  try {
    // first get RVN balance
    const balance = await RVNBOX.Address.details([walletInfo.Address])

    console.log(`RVN Balance information:`)
    console.log(balance)
  } catch (err) {
    console.error(`Error in getBalance: `, err)
    throw err
  }
}
getBalance()
