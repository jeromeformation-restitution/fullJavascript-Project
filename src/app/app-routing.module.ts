import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserClientComponent} from './user-client/user-client.component';



const routes: Routes = [
  {path: 'user-client', component : UserClientComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
