import { Component, OnInit } from '@angular/core'
import {
  legalTeam,
  doctypes,
  userPersona,
  idType,
  bondNftMetadata,
} from '../constants'

import { DocVService } from '../docV.service'

@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
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

  constructor(private docV: DocVService) {}

  ngOnInit(): void {
    // console.log(this.legalEntity)
  }

  public enumIter(val: any) {
    var keys = Object.values(val)
    return keys
  }

  public setPersona(val: any) {
    console.log('persona', val)
    this.selectedPersona = val
  }
  public setDocType(val: any) {
    console.log('doc type', val)
    this.selectedDocType = val
  }
  public setEntity(val: any) {
    console.log('legal entity', val)
    this.selectedLegalEntity = val
    this.selectedLegalEntityName = val.name
  }
  public setIdType(val: any) {
    this.selectedIdType = val
    this.bondMetaData.idType = val
  }

  public async submitUserData() {
    //check data integrity
    // this.bondMetaDataErrors = this.datacheck()
    // if (!this.bondMetaDataErrors) {
    //   return
    // }

    if (this.bondPurposeData == '') {
      return
    }

    this.docV.saveDataIPFS(this.bondPurposeData).then((data: any) => {
      console.log('IPFS result CID:', data)

      this.bondMetaData.purposeDataUrl = data.path
      console.log('bondMetaData', this.bondMetaData)

      this.docV
        .saveDataIPFS(JSON.stringify(this.bondMetaData).toString())
        .then((result: any) => {
          console.log('result.cid', result)
        })
    })

    // pass data to service layer to send to IPFS and get CID then call web3 to pass to blockchain.
  }

  private datacheck() {
    for (const [key, value] of Object.entries(this.bondMetaData)) {
      console.log(`${key}: ${value}`)
      if (value == null || value.toString().trim().length == 0) {
        // this.bondMetaDataErrors.[key] = true
        return false
      }
    }
    return true
  }
}
