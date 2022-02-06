import { Component } from '@angular/core'
import { EtherService } from './ether.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'docVWeb'
  metamask = {
    address: '',
    balance: '',
  }
  isConnected: boolean = false
  currentAccountBalance = 0

  constructor(private ether: EtherService) {}

  public connectTo() {
    this.ether.connectToMetaMask().then(() => {
      this.isConnected = true
      this.metamask.address = this.ether.activeAccount
      this.getCurrentAccountBalance()
    })
  }

  public async getCurrentAccountBalance() {
    this.ether.getAccountBalance().then((data: any) => {
      console.log(data)
      this.currentAccountBalance = data
    })
  }
}
