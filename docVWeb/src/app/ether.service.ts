/**by Dinesh Selvam -  PheoDScop#3470*/
import { BehaviorSubject } from 'rxjs'
import { environment } from '../environments/environment'
// import { Injectable } from '@angular/core'

import { ethers } from 'ethers'
var Web3 = require('web3')

declare let window: any

// @Injectable({
//   providedIn: 'root',
// })
export class EtherService {
  public activeAccount: any // tracks what account address is currently used.
  public accounts = [] // metamask or other accounts address

  currentProvider
  web3Provider
  contract

  constructor() {
    if (window.ethereum === undefined) {
      alert('Non-Ethereum browser detected. Install Metamask')
    } else {
      if (typeof window.web3 !== 'undefined') {
        this.web3Provider = window.web3.currentProvider
        console.log('Constructor :: window.web3 - Metamask is set')
      } else {
        this.currentProvider = new Web3.providers.HttpProvider(
          'http://localhost:8545',
        )
        this.web3Provider = new ethers.providers.Web3Provider(
          this.currentProvider,
        )
        console.log(
          'Constructor :: window.ethereum web3 HTTP provider set',
          this.web3Provider,
        )
      }
      console.log(this.web3Provider)
      window.web3 = new Web3(window.ethereum)

      //this.contract = new ethers.Contract(address, abi, this.web3Provider)
    }
  }
}
