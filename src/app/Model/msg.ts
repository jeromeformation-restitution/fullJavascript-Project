import {User} from '../Model/user';
import {Files} from '../model/files';

export class Msg {

  public id: string;
  public title: string;
  public content: string;
  public author: User;
  public recipient: User;
  public createdAt: Date;
  public isRead: boolean;
  public attachements: Array<Files>;
  public previousMsg: Msg;

  constructor() {
  }
}
