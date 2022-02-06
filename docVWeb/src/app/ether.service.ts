/**by Dinesh Selvam -  PheoDScop#3470*/
import { BehaviorSubject } from 'rxjs'
import { environment } from '../environments/environment.hardhat'
import { ethers, utils } from 'ethers'

declare let window: any

import BondNft from '../assets/BondNft.json'
import Escrow from '../assets/Escrow.json'
import LegalFund from '../assets/LegalFund.json'

export class EtherService {
  public activeAccount: any // tracks what account address is currently used.
  public accountsAry = [] // metamask or other accounts address

  currentProvider
  web3Provider
  contract

  public BondNftInstance: any
  public EscrowInstance: any
  public LegalFundInstance: any

  private accountChangeSubject = new BehaviorSubject<string>('')
  accountChanged = this.accountChangeSubject.asObservable()

  public provider = new ethers.providers.Web3Provider(window.ethereum)

  constructor() {
    if (window.ethereum === undefined) {
      alert('Non-Ethereum browser detected. Install Metamask')
    } else {
      if (typeof window.web3 !== 'undefined') {
        this.web3Provider = window.web3.currentProvider
        console.log('Constructor :: window.web3 - Metamask is set')
      } else {
        this.currentProvider = new ethers.providers.JsonRpcProvider(
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
      // console.log(this.web3Provider)
      window.web3 = window.web3.currentProvider

      let signer = this.provider.getSigner()
      this.BondNftInstance = new ethers.Contract(
        environment.bondNftInstance,
        BondNft.abi,
        signer,
      )
      console.log(this.BondNftInstance)

      this.EscrowInstance = new ethers.Contract(
        environment.escrowInstance,
        Escrow.abi,
        signer,
      )
      console.log(this.EscrowInstance)

      this.LegalFundInstance = new ethers.Contract(
        environment.legalFundInstance,
        LegalFund.abi,
        signer,
      )
      console.log(this.LegalFundInstance)

      //this.contract = new ethers.Contract(address, abi, this.web3Provider)
    }
  }

  public accountChecker() {
    const self: this = this

    window.ethereum.on('accountsChanged', (accounts) => {
      this.accountsAry = accounts
      console.log('accoutns changed', this.accountsAry)

      this.updateActiveAccount()
    })
  }

  public updateActiveAccount() {
    if (this.accountsAry.length != 0) {
      this.activeAccount = this.accountsAry[0]
      //change of account ==> update all pages and go back to main.
      this.accountChangeSubject.next(this.activeAccount)
    } else {
      this.activeAccount = ''
      this.accountChangeSubject.next('')
      // call disconnected subject
    }
  }

  public async connectToMetaMask() {
    const self: this = this

    await this.provider
      .send('eth_requestAccounts', [])
      .then((data) => {
        console.log(data)
        this.activeAccount = data[0]
        console.log('selected add ', this.activeAccount)
        this.accountChangeSubject.next(this.activeAccount)

        self.accountChecker()
      })
      .catch((err: any) => {
        console.log('Account Request failed', err)
      })
  }

  // all smart contract functions here.
  // ESCROW functions

  public async createBond(uri: string, legalMember: string) {
    const self: this = this
    let overrides = {
      // The maximum units of gas for the transaction to use
      gasLimit: 23000,
      // The amount to send with the transaction (i.e. msg.value)
      value: utils.parseEther('5.0'),
    }
    let tx = await self.EscrowInstance.createABond(uri, legalMember, overrides)
    return tx
  }

  // BONDNFT functions
  // param: address to_, string memory storageUri_
  public async mintABond(to_: string, storageUri_: string) {
    const self: this = this
    let result = await this.BondNftInstance.mintABond(to_, storageUri_)
    return result
  }

  //param:  uint256 id_, string memory hashedDoc_,string memory storageUri_
  public async updateABond(id_, hashedDoc_: string, storageUri_: string) {
    const self: this = this
    let success = await this.BondNftInstance.updateABond(
      id_,
      hashedDoc_,
      storageUri_,
    )
    return success
  }

  //param: verifyBond(uint256 id_, string memory hashedDoc_)
  public async verifyBond(id_, hashedDoc_: string) {
    const self: this = this
    let success = await this.BondNftInstance.verifyBond(id_, hashedDoc_)
    return success
  }

  //param: getAllBonds(uint256 start_, uint8 bondCount_)
  public async getAllBonds(start_, bondCount_) {
    const self: this = this
    let allBonds = []
    allBonds = await this.BondNftInstance.getAllBonds(start_, bondCount_)
    return allBonds
  }
}
