import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { UserComponent } from './users/user.component'
import { LegalComponent } from './legal/legal.component'

const routes: Routes = [
  { path: '', component: UserComponent },
  { path: 'legal', component: LegalComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
