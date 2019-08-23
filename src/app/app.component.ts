import {Component, DoCheck} from '@angular/core';
import {UserService} from './user.service';
import {User} from './Model/user';
import {Router} from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements DoCheck {
  public connectedUser: User;
  public usersFiltered;

  constructor(private userservice: UserService, public router: Router){
  }
  ngDoCheck() {
    if (localStorage.getItem('user')) {
      console.log(localStorage.getItem('user'));
      this.connectedUser = JSON.parse(localStorage.getItem('user'));
    } else {
      this.connectedUser = null;
    }
  }
  public search(input) {
    const optionCategory = input.querySelector('option:checked').value;
    const recherche =  input.querySelector('input').value;
    this.userservice.search(optionCategory, recherche).subscribe(users => {
      this.usersFiltered = users;
    });
  }
  public logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.userservice.logout();
    this.router.navigate(['/']);
  }
}
