import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class InventoryService {
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  backendUrl = environment.backend;
  inventory = new EventEmitter();

  constructor(private http: HttpClient) {}

  getInventory(steamid, game, refresh) {
    return this.http.get( environment.backend + '/inventory/' + steamid + '/' + game + '/' + refresh );
  }
}
