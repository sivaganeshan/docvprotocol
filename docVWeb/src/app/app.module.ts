import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'

import { UserModule } from './users/user.module'
import { LegalModule } from './legal/legal.module'

import { DocVService } from './docV.service'

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, UserModule, LegalModule],
  providers: [DocVService],
  bootstrap: [AppComponent],
})
export class AppModule {}