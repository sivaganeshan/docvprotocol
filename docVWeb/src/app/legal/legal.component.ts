import { Component, OnInit } from '@angular/core'
import {
  legalTeam,
  doctypes,
  userPersona,
  idType,
  bondNftMetadata,
} from '../constants'

import { DocVService } from '../docV.service'
import { EtherService } from '../ether.service'

@Component({
  selector: 'legal',
  templateUrl: './legal.component.html',
  styleUrls: ['./legal.component.scss'],
})
export class LegalComponent implements OnInit {
  usrPer = userPersona
  doc = doctypes
  legalEntity = legalTeam()
  idTypes = idType
  bondMetaData = {
    name: '',
    email: '',
    mobile: '',
    idType: '',
    idNumber: '',
    purposeDataUrl: '', //cid of purpose
    isConfirmed: false,
  }

  bondPurposeData = ''

  bondMetaDataErrors = false

  selectedPersona = ''
  selectedDocType = ''
  selectedLegalEntity = ''
  selectedLegalEntityName = ''
  selectedIdType = ''

  currentPageCreate: boolean = true

  selectedBondDataIndex = 0
  bondArray: any = []
  bondMetaDataArray: any = []
  updateBond = {
    cid: '',
    hash: '',
  }

  purposeData = ''

  legalConfirmation: boolean = false

  constructor(private docV: DocVService, private ether: EtherService) {}

  ngOnInit(): void {
    this.ether.accountConnected.subscribe((data: any) => {
      if (data != '') {
        this.getBondCount()
      }
    })
  }

  public showCreate(isbool: boolean) {
    this.currentPageCreate = isbool
  }

  changeListener($event): void {
    this.readFile($event.target)
  }

  public enumIter(val: any) {
    var keys = Object.values(val)
    return keys
  }

  public readFile(input: any) {
    const self: this = this

    var file: File = input.files[0]
    var reader: FileReader = new FileReader()
    let hash

    let obj = this.bondMetaDataArray[this.selectedBondDataIndex]
    reader.onloadend = function (e) {
      console.log(reader.result?.toString())
      hash = self.docV.encryptFile(reader.result)
      console.log('hash of file', hash)

      self.docV
        .saveDataIPFS(reader.result)
        .then((cid) => {
          console.log(cid)
          obj['legalDataUrl'] = cid.path
        })
        .then(() => {
          console.log('saving UpdateObj to IPFS', obj)
          self.docV
            .saveDataIPFS(JSON.stringify(obj).toString())
            .then((newCid) => {
              console.log('newCid', newCid.path)
              self.updateBond.hash = hash
              self.updateBond.cid = newCid.path
            })
        })
    }

    reader.readAsDataURL(file)

    //hash file
  }

  public uploadFile() {
    console.log('seelctedBondData Index', this.selectedBondDataIndex + 1)
    this.ether
      .updateABond(
        this.selectedBondDataIndex + 1,
        this.updateBond.hash,
        this.updateBond.cid,
      )
      .then((data) => {
        console.log(data)
      })
  }

  public getBondCount() {
    this.ether.getBondCount().then((val) => {
      console.log('bond Count', val)

      if (val > 0) {
        this.getAllBonds(val)
      }
    })
  }
  public async getAllBonds(count: number) {
    this.ether
      .getAllBonds(1, count)
      .then((data) => {
        // console.log(data)
        this.bondArray = data
      })
      .then(() => {
        //call ipfs

        for (let i = 0; i < this.bondArray.length; i++) {
          this.docV.callDataIPFS(this.bondArray[i].cid).then((data) => {
            console.log(this.bondArray[i].bondId)

            let obj = JSON.parse(data)
            obj['bondId'] = this.bondArray[i].bondId
            console.log(obj)
            // if (Object.keys(obj).indexOf('legalDataUrl') > -1) {
            //   obj['isComplete'] = true
            // } else {
            //   obj['isComplete'] = false
            // }
            this.bondMetaDataArray.push(obj)
            this.bondMetaDataArray = this.bondMetaDataArray.sort(
              (a, b) => a.bondId - b.bondId,
            )
          })
        }
      })
  }

  public loadPurposeData(cid: string, index) {
    this.selectedBondDataIndex = index - 1
    console.log('BondId selected', index)
    this.docV.callDataIPFS(cid).then((result) => {
      console.log('purposedata', result)
      this.purposeData = result
    })
  }
}
