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

  constructor(private docV: DocVService) {}

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

    reader.onloadend = function (e) {
      // console.log(reader.result)
      let hash = self.docV.encryptFile(reader.result)
      // console.log('hash of file', hash)
    }

    reader.readAsText(file)

    //hash file
  }
}
