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
  selector: 'verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss'],
})
export class VerifyComponent implements OnInit {
  usrPer = userPersona
  doc = doctypes
  legalEntity = legalTeam()
  idTypes = idType

  documentReferenceId: string = ''

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
  fileVerification = {
    hash: '',
  }

  purposeData = ''

  isSubmitted: boolean = false
  fileVerified: boolean = false

  constructor(private docV: DocVService, private ether: EtherService) {}

  ngOnInit(): void {}

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

    reader.onloadend = function (e) {
      console.log(reader.result?.toString())
      hash = self.docV.encryptFile(reader.result)
      self.fileVerification.hash = hash
      console.log('hash of file', hash)
    }

    reader.readAsDataURL(file)
  }

  public verifyFile() {
    this.isSubmitted = true
    this.ether
      .verifyBond(
        parseInt(this.documentReferenceId),
        this.fileVerification.hash,
      )
      .then((data) => {
        if (data) {
          this.fileVerified = true
        } else {
          this.fileVerified = false
        }
      })
  }
}
