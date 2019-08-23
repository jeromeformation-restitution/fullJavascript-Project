import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';
import { FormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminFormComponent } from './admin-form/admin-form.component';
import { UserClientComponent } from './user-client/user-client.component';
import { HomepageComponent } from './homepage/homepage.component';
import { NavComponent } from './nav/nav.component';
import { ProfessionnelleComponent } from './professionnelle/professionnelle.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ProfilPageComponent } from './profil-page/profil-page.component';
import { CreateMsgComponent } from './messages/create-msg/create-msg.component';
import { ListMsgComponent } from './messages/list-msg/list-msg.component';
import { ShowMsgComponent } from './messages/show-msg/show-msg.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminFormComponent,
    UserClientComponent,
    HomepageComponent,
    NavComponent,
    UserClientComponent,
    ProfessionnelleComponent,
    ProfilPageComponent,
    CreateMsgComponent,
    ListMsgComponent,
    ShowMsgComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

