import ECPairFactory from 'ecpair'
import fs from 'fs'
import path from 'path'
import * as ecc from 'tiny-secp256k1'
import { payments } from 'bitcoinjs-lib'
const ECPair = ECPairFactory(ecc)

const addresses = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../address.json'), 'utf8'))

const check = () => {
  const kp = ECPair.makeRandom()
  const p2pkh = payments.p2pkh({
    pubkey: kp.publicKey,
  })
  const p2psh = payments.p2sh({
    redeem: p2pkh,
  })
  const p2wpkh = payments.p2wpkh({ pubkey: kp.publicKey })

  ;[p2pkh.address, p2psh.address, p2wpkh.address].forEach((a) => {
    if (addresses.includes(a as string)) {
      console.log(`address: ${a}, wif: ${kp.toWIF()}`)
    }
  })
  setTimeout(() => check())
}

check()
console.log(`funny start in ${addresses.length} addr ...`)
