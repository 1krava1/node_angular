import {EventEmitter, Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class UserService {
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  backendUrl = environment.backend;
  user = new EventEmitter();

  constructor(private http: HttpClient) { }

  signUp(data) {
    return this.http.post( this.backendUrl + '/users/signup', JSON.stringify(data) );
  }

  signIn(data) {
    return this.http.post( this.backendUrl + '/users/signin', JSON.stringify(data) );
  }
}