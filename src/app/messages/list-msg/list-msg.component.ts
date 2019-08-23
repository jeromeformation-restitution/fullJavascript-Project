import { Component, OnInit } from '@angular/core';
import {Msg} from '../../Model/msg';
import {MsgService} from '../../msg.service';


@Component({
  selector: 'app-list-msg',
  templateUrl: './list-msg.component.html',
  styleUrls: ['./list-msg.component.scss']
})
export class ListMsgComponent implements OnInit {
  public msgs;

  constructor(private msgservice: MsgService) {
  }
  ngOnInit() {
    this.msgservice.getMsg().subscribe(elem => this.msgs = elem);
  }
}
