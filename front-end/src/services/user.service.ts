import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {baseurl} from './config';
import { EditUserprofile, Userprofile, ChangePassword } from '../models';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  id = '';
  constructor( private http: HttpClient) {
    this.id = localStorage.getItem('_cu');
   }

  getLoggedUserProfile() {
    return this.http.post(baseurl + 'getLoggedUserProfile', '');
  }

  getusers() {
     return this.http.post(baseurl + 'getTeamUsers', '');
  }



  editUserprofile(data: EditUserprofile) {
   return this.http.post(baseurl + 'editUserprofile', data);
  }

  adminedituserinfo(data: Userprofile) {
    return this.http.post(baseurl + 'adminEditUserprofile', data);
  }

  changepassword(data: ChangePassword) {
   return this.http.post(baseurl + 'changeUserPassword', data);
  }

  addUserprofile(data: Userprofile) {
    return this.http.post(baseurl + 'addUserProfile', data );
   }

  deleteUserProfile(data) {
    return this.http.post(baseurl + 'disableTeamUser',  data);
  }

  enableUserProfile(data) {
    return this.http.post(baseurl + 'enableTeamUser',  data);
  }

   deleteUser(id: string) {
     return this.http.post(baseurl, id);
   }
}
