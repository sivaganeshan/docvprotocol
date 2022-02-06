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
    // this.getAllBonds()

    this.ether.accountConnected.subscribe((data: any) => {
      if (data != '') {
        this.getAllBonds()
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
          console.log(obj)
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

    reader.readAsText(file)

    //hash file
  }

  public uploadFile() {
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

  public async getAllBonds() {
    this.ether
      .getAllBonds(1, 2)
      .then((data) => {
        console.log(data)
        this.bondArray = data
      })
      .then(() => {
        //call ipfs

        for (let i = 0; i < this.bondArray.length; i++) {
          this.docV.callDataIPFS(this.bondArray[i].cid).then((data) => {
            console.log(data)
            let obj = JSON.parse(data)
            if (Object.keys(obj).indexOf('legalDataUrl') > -1) {
              obj['isComplete'] = true
            } else {
              obj['isComplete'] = false
            }
            this.bondMetaDataArray.push(obj)
          })
        }
      })
  }

  public loadPurposeData(cid: string, index) {
    this.selectedBondDataIndex = index
    this.docV.callDataIPFS(cid).then((result) => {
      console.log(result)
      this.purposeData = result
    })
  }
}
