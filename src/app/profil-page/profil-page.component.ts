import { Component, OnInit } from '@angular/core';
import {User} from "../Model/user";
import {UserService} from "../user.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-profil-page',
  templateUrl: './profil-page.component.html',
  styleUrls: ['./profil-page.component.scss']
})
export class ProfilPageComponent implements OnInit {

  public user: User;
  public slug: string;
  constructor(private userservice: UserService, private router: Router, private route: ActivatedRoute, ) {
    this.slug = this.route.snapshot.paramMap.get('slug');
  }


  ngOnInit() {
    this.userservice.getUser(this.slug).subscribe(user => {
      this.user = user;
    });
  }

}
