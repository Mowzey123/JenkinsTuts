import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { baseurl } from './config';
import { AuthenticationService } from './authentication.service';
import { Subject, BehaviorSubject, Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class RulesService {

  private  datasession = new Subject<any>();
  private messageSource = new BehaviorSubject({});
  currentdata = this.messageSource.asObservable();


  constructor(private http: HttpClient) { }

  seteditsession(data) {
    this.messageSource.next(data);
  }



  geteditsession() {
     return this.datasession.asObservable();
  }

  getAttributes() {
    return this.http.post(baseurl + 'fetchExtractedAttributes', '');
   }

   addAttribute(data) {
    return this.http.post(baseurl + 'addSingleAttribute', data);
  }

  deleteSingleAttribute(idno: string) {
    return this.http.post(baseurl +  'deleteAttribute', {attributeid: idno});
  }

  editSingleAttribute(data) {
    return this.http.post(baseurl + 'editAttribute', data);
  }
  createARulesmethod(basicrules: any) {
     return this.http.post(baseurl + 'createARule', basicrules);
  }

  fetchCreatedRulesmethod() {
      return this.http.post(baseurl + 'fetchCreatedRules', '');
  }

  deleteRule(idno: string) {
    return this.http.post(baseurl +  'deleteRule', {ruleid: idno});
  }

  editRule(idno: string) {

    return this.http.post(baseurl + 'editRules', {attributeid: idno});
  }

  editrulesmethod(data) {
    return this.http.post(baseurl + 'editRules', data);
  }
}
