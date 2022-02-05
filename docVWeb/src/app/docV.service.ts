/**by Dinesh Selvam -  PheoDScop#3470*/
import { BehaviorSubject } from 'rxjs'
import { environment } from '../environments/environment'
// import { Injectable } from '@angular/core'

import { create, IPFSHTTPClient } from 'ipfs-http-client'
import { Byte } from '@angular/compiler/src/util'

var CryptoJS = require('crypto-js')
var CryptoES = require('crypto-js/enc-hex')

// @Injectable({
//   providedIn: 'root',
// })
export class DocVService {
  public activeAccount: any // tracks what account address is currently used.
  public accounts = [] // metamask or other accounts address

  message: any = ''
  nonce: any = ';'
  path: any = ';'
  privateKey: any = ''

  constructor() {}

  public encryptFile(data: any) {
    // Encrypt
    // var ciphertext = CryptoJS.AES.encrypt(
    //   JSON.stringify(data),
    //   'secret key 123',
    // ).toString()

    console.log(data)
    var ciphertext = CryptoJS.SHA256(JSON.stringify(data).toString())
    console.log('cipher :', ciphertext)

    var hash = this.toHexString(ciphertext.words)
    console.log('hash', hash)
    return hash
  }

  public async saveDataIPFS(dataObj: any) {
    let options = {
      url: `http://localhost:5001`,
      // headers: { 'Access-Control-Allow-Headers': '*' },
    }
    const node = create(options) // connects to default

    const data = dataObj
    const results = await node.add(data)
    return results
  }

  public toHexString(byteArray) {
    var hexArrar = byteArray.map((byte) => {
      return ('0' + (byte & 0xff).toString(16)).slice(-2)
    })
    // var hexArray = Array.from(byteArray, function (byte: any) {
    //   return ('0' + (byte & 0xff).toString(16)).slice(-2)
    // })

    return '0x' + hexArrar.join('')
  }

  // Convert a byte array to a hex string
  // public bytesToHex(bytes) {
  //   for (var hex = [], i = 0; i < bytes.length; i++) {
  //     var current = bytes[i] < 0 ? bytes[i] + 256 : bytes[i];
  //     hex.push((current >>> 4).toString(16));
  //     hex.push((current & 0xF).toString(16));
  //   }
  //   return hex.join("");
  // }
}
