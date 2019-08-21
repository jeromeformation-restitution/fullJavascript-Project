import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {User} from "../../Model/user";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public isPro: boolean;
  public user: User;

  constructor(private route: ActivatedRoute) {
    // Récupération du rôle
    const role = route.snapshot.paramMap.get('role');
    this.isPro = (role === 'pro');
    // Création de l'utilisateur
    this.user = new User();
    this.user.roles.push((this.isPro) ? 'pro' : 'client');
  }

  ngOnInit() {
  }

}
