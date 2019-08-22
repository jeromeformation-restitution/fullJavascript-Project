import { Component, OnInit } from '@angular/core';
import {User} from '../Model/user';
import {UserService} from '../user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-client',
  templateUrl: './user-client.component.html',
  styleUrls: ['./user-client.component.scss']
})
export class UserClientComponent implements OnInit {
  public user: User;
  constructor(private userservice: UserService, private router: Router) {
    this.user = new User();
    this.user.roles = ['client'];
    this.user.profession = [];
  }
  ngOnInit() {
  }
  /**
   * Envoi du User à l'API pour le sauvegarder
   */
  public sendUser(): void {
    this.userservice.create(this.user).subscribe(datas => {
        if (datas.token) {
          console.log(datas);
          this.router.navigate(['/']);
        }
    });
  }
}
