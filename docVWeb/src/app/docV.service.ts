/**by Dinesh Selvam -  PheoDScop#3470*/
import { BehaviorSubject } from 'rxjs'
import { environment } from '../environments/environment'
// import { Injectable } from '@angular/core'

import { create, IPFSHTTPClient } from 'ipfs-http-client'
import { Byte } from '@angular/compiler/src/util'
const toBuffer = require('it-to-buffer')

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

  public node

  constructor() {}

  public encryptFile(data: any) {
    // Encrypt
    // var ciphertext = CryptoJS.AES.encrypt(
    //   JSON.stringify(data),
    //   'secret key 123',
    // ).toString()

    // console.log(data)
    var ciphertext = CryptoJS.SHA256(data)
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

  public async callDataIPFS(cid: string) {
    let options = {
      url: `http://localhost:5001`,
      // headers: { 'Access-Control-Allow-Headers': '*' },
    }
    this.node = await create(options) // connects to default

    const bufferedContents = await toBuffer(await this.node.cat(cid)) // returns a Buffer
    // const stringContents = bufferedContents.toString() // returns a string

    let stringContents = this.Utf8ArrayToStr(bufferedContents)

    return stringContents
  }

  public pad(n) {
    return n.length < 2 ? '0' + n : n
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

  public Utf8ArrayToStr(array) {
    var out, i, len, c
    var char2, char3

    out = ''
    len = array.length
    i = 0
    while (i < len) {
      c = array[i++]
      switch (c >> 4) {
        case 0:
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
          // 0xxxxxxx
          out += String.fromCharCode(c)
          break
        case 12:
        case 13:
          // 110x xxxx   10xx xxxx
          char2 = array[i++]
          out += String.fromCharCode(((c & 0x1f) << 6) | (char2 & 0x3f))
          break
        case 14:
          // 1110 xxxx  10xx xxxx  10xx xxxx
          char2 = array[i++]
          char3 = array[i++]
          out += String.fromCharCode(
            ((c & 0x0f) << 12) | ((char2 & 0x3f) << 6) | ((char3 & 0x3f) << 0),
          )
          break
      }
    }

    return out
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
