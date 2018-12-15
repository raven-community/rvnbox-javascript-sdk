/*
  Send 1000 corbes to RECV_ADDR.
*/

"use strict"

// Instantiate RVNBOX.
const rvnboxLib = "../../../../lib/rvnbox-sdk"
const RVNBOXSDK = require(rvnboxLib).default
//const RVNBOX = new RVNBOXSDK({ restURL: "https://trest.bitcoin.com/v1/" })
const RVNBOX = new RVNBOXSDK({ restURL: "htts://localhost:3000/v1/" })

// Replace the address below with the address you want to send the RVN to.
const RECV_ADDR = `rvntest:rEgfYH2ed8a3Age6qLuhXeLvSUJU4Q3sBE`

// Open the wallet generated with create-wallet.
try {
  var walletInfo = require(`../create-wallet/wallet.json`)
} catch (err) {
  console.log(
    `Could not open wallet.json. Generate a wallet with create-wallet first.`
  )
  process.exit(0)
}

const SEND_ADDR = walletInfo.Address
const SEND_MNEMONIC = walletInfo.mnemonic

async function sendRvn() {
  // Get the balance of the sending address.
  const balance = await getRVNBalance(SEND_ADDR, false)
  console.log(`balance: ${JSON.stringify(balance, null, 2)}`)
  console.log(`Balance of sending address ${SEND_ADDR} is ${balance} RVN.`)

  // Exit if the balance is zero.
  if (balance <= 0.0) {
    console.log(`Balance of sending address is zero. Exiting.`)
    process.exit(0)
  }

  const SEND_ADDR_LEGACY = RVNBOX.Address.toLegacyAddress(SEND_ADDR)
  const RECV_ADDR_LEGACY = RVNBOX.Address.toLegacyAddress(RECV_ADDR)
  console.log(`Sender Legacy Address: ${SEND_ADDR_LEGACY}`)
  console.log(`Receiver Legacy Address: ${RECV_ADDR_LEGACY}`)

  const balance2 = await getRVNBalance(RECV_ADDR, false)
  console.log(`Balance of recieving address ${RECV_ADDR} is ${balance2} RVN.`)

  const utxo = await RVNBOX.Address.utxo(SEND_ADDR)
  console.log(`utxo: ${JSON.stringify(utxo, null, 2)}`)

  // instance of transaction builder
  const transactionBuilder = new RVNBOX.TransactionBuilder("testnet")

  const corbesToSend = 1000 // <--- This is where you set the amount to send.
  const originalAmount = utxo[0].corbes
  const vout = utxo[0].vout
  const txid = utxo[0].txid

  // add input with txid and index of vout
  transactionBuilder.addInput(txid, vout)

  // get byte count to calculate fee. paying 1.2 sat/byte
  const byteCount = RVNBOX.RavenCoin.getByteCount({ P2PKH: 1 }, { P2PKH: 2 })
  console.log(`byteCount: ${byteCount}`)
  const corbesPerByte = 1.2
  const txFee = Math.floor(corbesPerByte * byteCount)
  console.log(`txFee: ${txFee}`)

  // amount to send back to the sending address.
  // It's the original amount - 1 sat/byte for tx size
  const remainder = originalAmount - corbesToSend - txFee

  // add output w/ address and amount to send
  transactionBuilder.addOutput(RECV_ADDR, corbesToSend)
  transactionBuilder.addOutput(SEND_ADDR, remainder)

  // Generate a change address from a Mnemonic of a private key.
  const change = changeAddrFromMnemonic(SEND_MNEMONIC)

  // Generate a keypair from the change address.
  const keyPair = RVNBOX.HDNode.toKeyPair(change)

  // Sign the transaction with the HD node.
  let redeemScript
  transactionBuilder.sign(
    0,
    keyPair,
    redeemScript,
    transactionBuilder.hashTypes.SIGHASH_ALL,
    originalAmount
  )

  // build tx
  const tx = transactionBuilder.build()
  // output rawhex
  const hex = tx.toHex()

  // Broadcast transation to the network
  const broadcast = await RVNBOX.RawTransactions.sendRawTransaction(hex)
  console.log(`Transaction ID: ${broadcast}`)
}
sendRvn()

// Generate a change address from a Mnemonic of a private key.
function changeAddrFromMnemonic(mnemonic) {
  // root seed buffer
  const rootSeed = RVNBOX.Mnemonic.toSeed(mnemonic)

  // master HDNode
  const masterHDNode = RVNBOX.HDNode.fromSeed(rootSeed, "testnet")

  // HDNode of BIP44 account
  const account = RVNBOX.HDNode.derivePath(masterHDNode, "m/44'/145'/0'")

  // derive the first external change address HDNode which is going to spend utxo
  const change = RVNBOX.HDNode.derivePath(account, "0/0")

  return change
}

// Get the balance in RVNH of a RVN address.
async function getRVNBalance(addr, verbose) {
  try {
    const result = await RVNBOX.Address.details([addr])

    if (verbose) console.log(result)

    const rvnBalance = result[0]

    return rvnBalance.balance
  } catch (err) {
    console.error(`Error in getRVNBalance: `, err)
    console.log(`addr: ${addr}`)
    throw err
  }
}
