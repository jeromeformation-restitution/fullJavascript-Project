import {Component, OnInit} from '@angular/core';
import {User} from '../Model/user';
import {Router} from "@angular/router";

@Component({
  selector: 'app-professionnelle',
  templateUrl: './professionnelle.component.html',
  styleUrls: ['./professionnelle.component.scss']
})
export class ProfessionnelleComponent implements OnInit {

  public user: User;

  constructor() {
    this.user = new User();
  }

  public senduserAPI() {
    this.user(
      datas => {
        console.log(datas.message);
        if (datas.message === 'User bien crée'){
          this.router.navigate(['/utilisateur/' + this.user]);
        }
      }
      );
  }
  ngOnInit() {
  }

}
