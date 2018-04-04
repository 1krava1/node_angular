import {EventEmitter, Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import {Observable} from 'rxjs/Observable';
import {JwtHelperService} from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Injectable()
export class UserService {
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  backendUrl = environment.backend;
  user = new EventEmitter();

  constructor(private http: HttpClient,
              private jwtHelperService: JwtHelperService,
              private router: Router) {
    this.user.emit(this.getUser());
  }

  signUp(data) {
    return this.http.post( this.backendUrl + '/signup', JSON.stringify(data) );
  }
  signIn(data) {
    return this.http.post( this.backendUrl + '/users/signin', JSON.stringify(data) );
  }

  setUserToken(token): void {
    if ( typeof localStorage !== 'undefined' ) {
      localStorage.setItem('jwt', token);
      this.setUser();
    }
  }
  getUserToken() {
    if ( this.jwtHelperService.isTokenExpired(localStorage.getItem('jwt')) ) { this.logout(); return; }
    if ( typeof localStorage !== 'undefined' ) {
      return localStorage.getItem('jwt');
    }
  }
  isLoggedIn(): boolean {
    return typeof localStorage !== 'undefined' && !!localStorage.getItem('jwt');
  }

  getUser() {
    if ( this.isLoggedIn() ) {
      return this.getUserToken() ? this.jwtHelperService.decodeToken(this.getUserToken()).data._doc : false;
    }
  }
  setUser(): void {
    this.user.emit( this.getUser() );
  }
  getUserField(field) {
    return this.getUser().steamid;
  }

  logout(): void {
    if ( typeof localStorage !== 'undefined' ) { localStorage.removeItem('jwt'); }
    this.user.emit(null);
    this.router.navigate(['/']);
  }
}
