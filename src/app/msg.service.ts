import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ResponseApi} from './Model/response-api';
import {catchError, tap} from 'rxjs/operators';
import {Msg} from './Model/msg';

@Injectable({
  providedIn: 'root'
})
export class MsgService {

  private apiUrl = 'http://localhost:3000/msg';
  private token: string;
  private JSONHeaders;
  constructor(private http: HttpClient) {
    this.token = JSON.parse(localStorage.getItem('token'));
    this.JSONHeaders = {headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'Bearer' + this.token})};
  }

  /**
   * Envoie le message à l'API pour l'insertion en BDD
   */
  create(msg: Msg){
    return this.http.post(this.apiUrl + '/send', msg,  this.JSONHeaders).pipe(
      tap(datas => console.log('Retour API (creation msg) :'))
    );
  }
  getMsg() {
    return this.http.get(this.apiUrl, this.JSONHeaders)
      .pipe(
        tap(msg => console.log(msg))
      );
  }
  showMsg(id: string){
    return this.http.get(this.apiUrl + '/' + id, this.JSONHeaders);
  }
}
