import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'

import { BrowserModule } from '@angular/platform-browser'
import { VerifyComponent } from './verify.component'

@NgModule({
  declarations: [VerifyComponent],
  imports: [BrowserModule, FormsModule],
  providers: [],
  bootstrap: [VerifyComponent],
})
export class VerifyModule {}
