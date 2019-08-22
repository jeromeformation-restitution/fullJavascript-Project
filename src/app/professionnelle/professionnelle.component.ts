import {Component, OnInit} from '@angular/core';
import {User} from '../Model/user';
import {UserService} from '../user.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-professionnelle',
  templateUrl: './professionnelle.component.html',
  styleUrls: ['./professionnelle.component.scss']
})
export class ProfessionnelleComponent implements OnInit {

  public user: User;

  constructor(private userservice: UserService, private router: Router) {
    this.user = new User();
    this.user.roles = ['pro'];
    this.user.profession = [];
  }
  ngOnInit() {
  }
  public sendUser(): void {
    const input = document.getElementById('professionString').value;
    this.user.profession.push(input);
    this.userservice.create(this.user).subscribe(datas => {
      if (datas.token) {
        console.log(datas);
        this.router.navigate(['/']);
      }
    });
  }
}
