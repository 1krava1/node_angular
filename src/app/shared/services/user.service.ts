import {EventEmitter, Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import {Observable} from 'rxjs/Observable';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable()
export class UserService {
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  backendUrl = environment.backend;
  user = new EventEmitter();

  constructor(private http: HttpClient,
              private jwtHelperService: JwtHelperService) {
    this.user.emit(this.getUser());
  }

  signUp(data) {
    return this.http.post( this.backendUrl + '/signup', JSON.stringify(data) );
  }
  signIn(data) {
    return this.http.post( this.backendUrl + '/users/signin', JSON.stringify(data) );
  }

  setUserToken(token) {
    if ( !!localStorage ) {
      localStorage.setItem('jwt', token);
      this.setUser();
    }
  }
  getUserToken() {
    if ( !!localStorage ) return localStorage.getItem('jwt');
  }
  isLoggedIn() {
    return !!localStorage && !!localStorage.getItem('jwt');
  }

  getUser() {
    if ( this.isLoggedIn() ) {
      return this.getUserToken() ? this.jwtHelperService.decodeToken(this.getUserToken()).data._doc : false;
    }
  }
  setUser() {
    this.user.emit( this.getUser() );
  }
  getUserField(field) {
    return this.getUser().steamid;
  }

  logout(): void {
    if ( !!localStorage ) localStorage.removeItem('jwt');
    this.user.emit(null);
  }
}