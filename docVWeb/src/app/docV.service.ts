/**by Dinesh Selvam -  PheoDScop#3470*/
import { BehaviorSubject } from 'rxjs'
import { environment } from '../environments/environment'
// import { Injectable } from '@angular/core'

import { create, IPFSHTTPClient } from 'ipfs-http-client'

// @Injectable({
//   providedIn: 'root',
// })
export class DocVService {
  public activeAccount: any // tracks what account address is currently used.
  public accounts = [] // metamask or other accounts address

  constructor() {}

  public async saveDataIPFS(dataObj: any) {
    let options = {
      url: `http://localhost:5001`,
      // headers: { 'Access-Control-Allow-Headers': '*' },
    }
    const node = create(options) // connects to default

    const data = dataObj
    const results = await node.add(data)
    return results
    // for await (const { cid } of results) {
    //   // CID (Content IDentifier) uniquely addresses the data
    //   // and can be used to get it again.
    //   console.log(cid.toString())
    // }
  }
}
