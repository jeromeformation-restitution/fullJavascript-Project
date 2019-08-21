import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserClientComponent} from './user-client/user-client.component';
import { AdminFormComponent } from './admin-form/admin-form.component';
import { HomepageComponent } from './homepage/homepage.component';



const routes: Routes = [
  {path: '', component : HomepageComponent},
  {path: 'admin', component : AdminFormComponent},
  {path: 'user-client', component : UserClientComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
