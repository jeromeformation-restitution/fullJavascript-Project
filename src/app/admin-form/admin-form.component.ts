import { Component, OnInit } from '@angular/core';
import { User } from '../Model/user';

@Component({
  selector: 'app-admin-form',
  templateUrl: './admin-form.component.html',
  styleUrls: ['./admin-form.component.scss']
})
export class AdminFormComponent implements OnInit {

  public user: User;
  constructor() {
    this.user = new User();
  }

  ngOnInit() {
  }

}
