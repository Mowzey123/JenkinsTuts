import { Card, Addaccount } from './../models/billingdetails';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseurl } from './config';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class BlacklistService {
  token = '';

constructor(private http: HttpClient) {
  this.token = localStorage.getItem('_cu');
}

 addToAccountBlackList(data: Addaccount) {
  return this.http.post(baseurl + 'addToAccountBlackList', data);
 }

 getBlackListedAccs() {
  return this.http.post(baseurl + 'getBlackListedAccs', '');
 }


 addBlackListedCard(data: Card) {
  return this.http.post(baseurl + 'addBlackListedCard', {
    userdata: {id: this.token},
    // cardschema: data.cardschema,
    prefix: data.prefix,
    suffix: data.suffix
  });
 }

  getBlackListedCards() {
    return this.http.post(baseurl + 'getBlackListedCards', '');
  }

  deleteuserblacklistaccount(idno: string) {
    return this.http.post(baseurl +  'deleteFromBlacklistedAccount', {id: idno});
  }

  deletecardfrombacklist(id: string) {
    return this.http.post(baseurl + 'deleteFromBlacklist', {id});
  }

  addBlackListedDevice(data) {
    return this.http.post(baseurl + 'addBlackListedDevice', data);
  }

  getBlackListedDevices() {
    return this.http.post(baseurl + 'getBlackListedDevicess', '');
  }

  deleteFromBlackListedDevice(idno: string) {
    return this.http.post(baseurl +  'deleteFromBlackListedDevice', {id: idno});
  }

  addBlackListedNumber(data) {
    return this.http.post(baseurl + 'addPhoneToBlacklist', data);
  }

  getBlackListedNumbers() {
    return this.http.post(baseurl + 'getBlackListedNumbers', '');
  }

  deleteFromBlackListedNumber(phone: string) {
    return this.http.post(baseurl +  'deleteBlackListedNumber', {phone: phone});
  }

}
