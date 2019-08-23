import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserClientComponent} from './user-client/user-client.component';
import { AdminFormComponent } from './admin-form/admin-form.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ProfessionnelleComponent } from './professionnelle/professionnelle.component';
import {ProfilPageComponent} from './profil-page/profil-page.component';
import {ListMsgComponent} from './messages/list-msg/list-msg.component';
import {CreateMsgComponent} from './messages/create-msg/create-msg.component';
import {ShowMsgComponent} from './messages/show-msg/show-msg.component';



const routes: Routes = [
  {path: '', component : HomepageComponent},
  {path: 'admin', component : AdminFormComponent},
  {path: 'user-client', component : UserClientComponent},
  {path: 'professionnelle', component: ProfessionnelleComponent},
  {path: 'profil/:slug', component: ProfilPageComponent},
  {path: 'message/inbox', component: ListMsgComponent},
  {path: 'message/read/:id', component: ShowMsgComponent},
  {path: 'message/:slug', component: CreateMsgComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

