import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable()
export class InventoryService {
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  backendUrl = environment.backend;
  inventory = new EventEmitter();

  constructor(private http: HttpClient) {}

  getInventory(steamid){
    return this.http.get( environment.backend + '/inventory/' + steamid + '/570' );
  }
}