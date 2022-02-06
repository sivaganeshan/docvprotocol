import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'

import { UserModule } from './users/user.module'
import { LegalModule } from './legal/legal.module'
import { VerifyModule } from './verify/verify.module'

import { DocVService } from './docV.service'
import { EtherService } from './ether.service'

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UserModule,
    LegalModule,
    VerifyModule,
  ],
  providers: [DocVService, EtherService],
  bootstrap: [AppComponent],
})
export class AppModule {}
