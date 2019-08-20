import {User} from './user';

export interface ResponseApi {
  token: string;
  user: User;
}
