/**by Dinesh Selvam -  PheoDScop#3470*/
import { BehaviorSubject } from 'rxjs'
import { environment } from '../environments/environment.hardhat'
import { ethers, utils } from 'ethers'

const Web3 = require('web3')
var Contract = require('web3-eth-contract')

declare let window: any

import BondNft from '../assets/BondNft.json'
import Escrow from '../assets/Escrow.json'
import LegalFund from '../assets/LegalFund.json'

export class EtherService {
  public activeAccount: any // tracks what account address is currently used.
  public accountsAry = [] // metamask or other accounts address
  private chainId: any
  private networkId: any

  currentProvider
  web3Provider
  contract

  public BondNftInstance: any
  public EscrowInstance: any
  public LegalFundInstance: any

  private accountChangeSubject = new BehaviorSubject<string>('')
  accountChanged = this.accountChangeSubject.asObservable()

  private accountConnectSubject = new BehaviorSubject<string>('')
  accountConnected = this.accountConnectSubject.asObservable()

  public provider = new ethers.providers.Web3Provider(window.ethereum, 'any')

  constructor() {
    if (window.ethereum === undefined) {
      alert('Non-Ethereum browser detected. Install Metamask')
    } else {
      if (typeof window.web3 !== 'undefined') {
        this.web3Provider = window.web3.currentProvider
        console.log('Constructor :: window.web3 - Metamask is set')
      } else {
        this.web3Provider = new Web3.providers.HttpProvider(
          'http://localhost:8545',
        )

        // this.web3Provider = new ethers.providers.Web3Provider(
        //   this.currentProvider,
        // )
        console.log(
          'Constructor :: window.ethereum web3 HTTP provider set',
          this.web3Provider,
        )
      }
      // console.log(this.web3Provider)
      // window.web3 = window.web3.currentProvider
      // console.log(this.web3);
      window.web3 = new Web3(window.ethereum)
      Contract.setProvider(this.web3Provider)

      // this.EscrowInstance = new ethers.Contract(
      //   environment.escrowInstance,
      //   Escrow.abi,
      //   signer,
      // )
      // console.log('Escrow', this.EscrowInstance)

      // this.BondNftInstance = new ethers.Contract(
      //   environment.bondNftInstance,
      //   BondNft.abi,
      //   signer,
      // )
      // console.log('BondNFT', this.BondNftInstance)

      // this.LegalFundInstance = new ethers.Contract(
      //   environment.legalFundInstance,
      //   LegalFund.abi,
      //   signer,
      // )
      // console.log('Legal', this.LegalFundInstance)
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

    self.chainId = await window.ethereum.request({
      method: 'eth_chainId',
    })

    self.networkId = await window.ethereum.request({
      method: 'net_version',
    })

    await window.ethereum
      .request({ method: 'eth_requestAccounts' })
      .then((data: any) => {
        console.log('accounts', data)
        this.activeAccount = data[0]

        console.log(
          'selected add ',
          window.web3.currentProvider.selectedAddress,
        )

        //set up Behaviour Subject to detect changes to connected account.
        self.accountChangeSubject.next(
          window.web3.currentProvider.selectedAddress,
        )

        self.accountChecker()
      })
      .catch((err: any) => {
        console.log('Account Request failed', err)
      })
      .then(() => {
        // read contract abi
        try {
          self.EscrowInstance = new Contract(
            Escrow.abi,
            environment.escrowInstance,
          )
          console.log('EscrowInstance: ', this.EscrowInstance)
          self.BondNftInstance = new Contract(
            BondNft.abi,
            environment.bondNftInstance,
          )
          console.log('BondNftInstance: ', this.BondNftInstance)
          self.LegalFundInstance = new Contract(
            LegalFund.abi,
            environment.legalFundInstance,
          )
          console.log('LegalFundInstance: ', this.LegalFundInstance)

          self.accountConnectSubject.next(this.activeAccount)
        } catch (error) {
          // Catch any errors for any of the above operations.
          alert(
            `Failed to load web3, accounts contracts. Check console for details.`,
          )
          console.log(error)
        }
      })

    // await this.provider
    //   .send('eth_requestAccounts', [])
    //   .then((data) => {
    //     console.log(data)
    //     this.activeAccount = data[0]
    //     console.log('selected add ', this.activeAccount)
    //     this.accountChangeSubject.next(this.activeAccount)

    //     self.accountChecker()
    //   })
    //   .catch((err: any) => {
    //     console.log('Account Request failed', err)
    //   })
  }

  // all smart contract functions here.
  // ESCROW functions

  public async createBond(uri: string, legalMember: string) {
    const self: this = this
    let overrides = {
      value: utils.parseEther('5.0'),
    }
    return self.EscrowInstance.methods
      .createABond(uri, legalMember)
      .send({ from: this.activeAccount, value: utils.parseEther('5.0') })
      .then((tx) => {
        return tx
      })
  }

  // BONDNFT functions
  // param: address to_, string memory storageUri_
  public async mintABond(to_: string, storageUri_: string) {
    const self: this = this
    let result = await self.BondNftInstance.methods.mintABond(to_, storageUri_)
    return result
  }

  //param:  uint256 id_, string memory hashedDoc_,string memory storageUri_
  public async updateABond(id_, hashedDoc_: string, storageUri_: string) {
    const self: this = this
    let success = await self.BondNftInstance.methods.updateABond(
      id_,
      hashedDoc_,
      storageUri_,
    )
    return success
  }

  //param: verifyBond(uint256 id_, string memory hashedDoc_)
  public async verifyBond(id_, hashedDoc_: string) {
    const self: this = this
    let success = await self.BondNftInstance.methods.verifyBond(id_, hashedDoc_)
    return success
  }

  //param: getAllBonds(uint256 start_, uint8 bondCount_)
  public async getAllBonds(start: number, bondCount: number) {
    const self: this = this

    return await self.BondNftInstance.methods
      .getAllBonds(start, bondCount)
      .call()
    // try {
    //   let signer = await this.provider.getSigner()
    //   let contract = new ethers.Contract(
    //     environment.bondNftInstance,
    //     BondNft.abi,
    //     signer,
    //   )
    //   let totalEthLocked = await contract['getAllBonds'](start, bondCount)
    // } catch (ex) {
    //   console.error('Error in getting getTotalEthLocked : ', ex)
    // }
  }
}
