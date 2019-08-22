import { Component } from '@angular/core';
import {UserService} from './user.service';
import {User} from './Model/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'artisan';
  public usersFiltered: Array<User>  = [];

  constructor(private userservice: UserService){
  }
  public search(input) {
    const optionCategory = input.querySelector('option:checked').value;
    const recherche =  input.querySelector('input').value;
    this.userservice.search(optionCategory, recherche).subscribe(users => {
      this.usersFiltered = users;
    });
  }
}
