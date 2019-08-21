import { Injectable } from '@angular/core';
import {Observable, of, throwError} from 'rxjs';
import {User} from './model/user';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {ResponseApi} from './Model/response-api';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/users';
  private JSONHeaders = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  constructor(private http: HttpClient) {
  }
  /**
   * Recupere les users de l'API
   */
  public getUsers(): Observable<User[]> {
    return this.http
      .get<User[]>(this.apiUrl)
      .pipe(
        tap(users => console.log(users.length + ' utilisateurs reçus de l\'API')),
        catchError(this.handleError)
      );
  }
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('Erreur front : ', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Erreur de l'API : ${error.status}, ` +
        `contenu: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(error);
  }
  public getUser(slug: string): Observable<User | null> {
    return this.http.get<User>(this.apiUrl + '/profil/' + slug)
      .pipe(
        tap(user => console.log(user.username)),
        catchError((error: HttpErrorResponse) => {
          if(error.status === 404) {
            return of(null);
          } else {
            this.handleError(error);
          }
        }));
  }
  /**
   * Envoie le produit à l'API pour l'insertion en BDD
   */
  create(user: User): Observable<ResponseApi> {
    return this.http.post<ResponseApi>(this.apiUrl, user, this.JSONHeaders).pipe(
      tap(datas => console.log('Retour API (creation user) :'))
    );
  }
  delete(user: User): Observable<ResponseApi> {
    return this.http.delete<ResponseApi>(this.apiUrl + '/profile', this.JSONHeaders).pipe(
      tap(datas => console.log('Retour API (Suppression user) :')),
      tap(datas => console.log(datas))
    );
  }
}
