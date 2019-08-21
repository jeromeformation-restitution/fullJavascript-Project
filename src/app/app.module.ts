import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';
import { FormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserClientComponent } from './user-client/user-client.component';
import { ProfessionnelleComponent } from './professionnelle/professionnelle.component';

@NgModule({
  declarations: [
    AppComponent,
    UserClientComponent,
    ProfessionnelleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
