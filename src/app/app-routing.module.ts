import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { professionnelle} from './professionnelle/professionnelle.component';
import {userList} from  './user-list/user-list.component';

const routes: Routes = [
  {path: 'professionnelle', component: userListComponent},
  {path: 'professionnelle/creation', component: profesionnelleComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

