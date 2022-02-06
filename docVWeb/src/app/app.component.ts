import { Component } from '@angular/core'
import { EtherService } from './ether.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'docVWeb'

  constructor(private ether: EtherService) {}

  public connectTo() {
    this.ether.connectToMetaMask()
  }
}
