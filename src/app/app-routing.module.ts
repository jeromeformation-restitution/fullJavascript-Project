import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserClientComponent} from './user-client/user-client.component';
import { HomeComponent } from './home/home.component';
import { AdminFormComponent } from './admin-form/admin-form.component';



const routes: Routes = [
  {path: 'user-client', component : UserClientComponent},
  {path: '', component : HomeComponent},
  {path: 'admin', component : AdminFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
