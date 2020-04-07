import { AuthenticationService } from '../services/authentication.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseurl } from './config';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor( private http: HttpClient) { }

  getClientAPIKeys(clientid: string) {
    return this.http.post(baseurl + 'getClientAPIKeys', '');
 }

 generatenewapikey(id: string) {
   return this.http.post(baseurl + 'regenerateCleintApiKey', {id: id});
 }
}
