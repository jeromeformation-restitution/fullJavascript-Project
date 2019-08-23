import { Component, OnInit } from '@angular/core';
import {Msg} from '../../Model/msg';
import {MsgService} from "../../msg.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-show-msg',
  templateUrl: './show-msg.component.html',
  styleUrls: ['./show-msg.component.scss']
})
export class ShowMsgComponent implements OnInit {

  public msg;
  constructor(private msgservice: MsgService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.msgservice.showMsg(this.route.snapshot.paramMap.get('id')).subscribe(elem => this.msg = elem);
  }
}
