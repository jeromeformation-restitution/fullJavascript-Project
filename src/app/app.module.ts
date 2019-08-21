import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';
import { FormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
<<<<<<< HEAD
import { AdminFormComponent } from './admin-form/admin-form.component';
=======
import { UserClientComponent } from './user-client/user-client.component';
>>>>>>> 682490e313c89daf31cc2a96cab04fd1534a0d1b

@NgModule({
  declarations: [
    AppComponent,
<<<<<<< HEAD
    AdminFormComponent
=======
    UserClientComponent
>>>>>>> 682490e313c89daf31cc2a96cab04fd1534a0d1b
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

