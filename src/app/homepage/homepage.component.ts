import { Component, OnInit } from '@angular/core';
import {UserService} from "../user.service";
import {User} from '../Model/user';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  public users: Array<User>  = [];
  constructor(private userservice: UserService) {
  }

  ngOnInit() {
    this.userservice.getUsers().subscribe(users => {
      this.users = users;
    });
  }
}
