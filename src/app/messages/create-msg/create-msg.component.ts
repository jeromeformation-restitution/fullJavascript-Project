import { Component, OnInit } from '@angular/core';
import {Msg} from '../../Model/msg';
import {User} from '../../Model/user';
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../user.service";
import {MsgService} from "../../msg.service";

@Component({
  selector: 'app-create-msg',
  templateUrl: './create-msg.component.html',
  styleUrls: ['./create-msg.component.scss']
})
export class CreateMsgComponent implements OnInit {
  public msg: Msg;
  constructor(private userservice: UserService, private msgservice: MsgService, private router: Router, private route: ActivatedRoute) {
    this.msg = new Msg();
    this.msg.author = JSON.parse(localStorage.getItem('user'));
    this.userservice.getUser(this.route.snapshot.paramMap.get('slug')).subscribe(user => {
      this.msg.recipient = user;
    });
  }
  ngOnInit() {}
  public sendMsg() {
    this.msgservice.create(this.msg).subscribe(datas => {
      console.log(datas);
    });
  }
}
