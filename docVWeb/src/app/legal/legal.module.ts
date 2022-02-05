import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'

import { BrowserModule } from '@angular/platform-browser'
import { LegalComponent } from './legal.component'

@NgModule({
  declarations: [LegalComponent],
  imports: [BrowserModule, FormsModule],
  providers: [],
  bootstrap: [LegalComponent],
})
export class LegalModule {}
