import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserClientComponent} from './user-client/user-client.component';
import { ProfessionnelleComponent } from './professionnelle/professionnelle.component';


const routes: Routes = [
  {path: 'user-client', component : UserClientComponent},
  {path: 'professionnelle/creation', component: ProfessionnelleComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

