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

  public enumIter(val: any) {
    var keys = Object.values(val)
    return keys
  }

  public gethashOfFile(file: any) {
    let data = file.path[0].files[0]

    console.log(data)
    var result = this.docV.encryptFile(data)
  }
}
