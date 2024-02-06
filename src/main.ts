import ECPairFactory from 'ecpair'
import * as ecc from 'tiny-secp256k1'
import { payments } from 'bitcoinjs-lib'
import addresses from './addresses.json'
const ECPair = ECPairFactory(ecc)

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

console.log('funny start...')
check()
