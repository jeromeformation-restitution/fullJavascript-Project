import { Component, OnInit } from '@angular/core';
import { User } from '../Model/user';
import {UserService} from '../user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin-form',
  templateUrl: './admin-form.component.html',
  styleUrls: ['./admin-form.component.scss']
})
export class AdminFormComponent implements OnInit {
  public user: User;
  constructor(private userservice: UserService, private router: Router) {
    this.user = new User();
  }
  ngOnInit() {
  }
  public connectUser() {
    this.userservice.connect(this.user).subscribe(datas => {
      if (datas.token) {
        console.log(datas);
        localStorage.setItem('user', JSON.stringify(datas.user));
        localStorage.setItem('token', JSON.stringify(datas.token));
        this.router.navigate(['/']);
      }
    });
  }
}
