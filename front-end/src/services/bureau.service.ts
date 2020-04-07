import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Subject, BehaviorSubject } from 'rxjs';
import { bureaUrl, baseurl4} from './config';


@Injectable({
  providedIn: 'root'
})
export class BureauService {
  private  datasession = new Subject<any>();
  private messageSource = new BehaviorSubject({});
  private messagesource2 = new BehaviorSubject({status: 'false'});
  currentdata = this.messageSource.asObservable();
  currentdata2 = this.messagesource2.asObservable();
  bureaUrl = 'https://testapp.cognativeinsights.io/bureal/';
  constructor(private http: HttpClient) { }

  postRecord(data) {
    return this.http.post(bureaUrl + 'postTransactionData', data);
  }
  getRecords(page: number) {
    return this.http.post(bureaUrl + 'getClientBurealPosts', {page: page || 1});
  }
  searchRecords(data) {
    return this.http.post(bureaUrl + 'searchBureal', data);
  }

  seteditsession(data) {
    this.messageSource.next(data);
  }

  geteditsession() {
     return this.datasession.asObservable();
  }

  dateSearch(dates){
    return this.http.post(bureaUrl + 'filterPostedTransactions', dates);
  }
  tableSearch(data) {
    return this.http.post(bureaUrl + 'columnFilter', data);
  }

  getTransactionProfile(id: string) {
    return this.http.post(bureaUrl + 'getTransactionProfile', {transactionid: id});
  }

  getClientAPIKeys(clientid: string) {
    return this.http.post(bureaUrl + 'getClientAPIKeys', '');
 }

 generatenewapikey(id: string) {
   return this.http.post(bureaUrl + 'regenerateCleintApiKey', {id: id});
 }

 getRecordsToday() {
  return this.http.post(baseurl4 + 'recordsToday', '');
 }

 totalRecords() {
  return this.http.post(baseurl4 + 'totalRecords', '');
 }

 blockedAccs() {
   return this.http.post(baseurl4 + 'blockedaccs', '');
 }

  searchCount() {
    return this.http.post(baseurl4 + 'searchcount', '');
  }

  latestTransactions() {
    return this.http.post(baseurl4 + 'lastesttransactions', '');
  }

  addedRecordsMonthlyTrend() {
    return this.http.post(baseurl4 + 'addedRecordsMonthlyTrend', '');
  }

  fraudTypeData() {
    return this.http.post(baseurl4 + 'fraudTypeOccurance', '');
  }

  getBlockedAccs(page: number) {
    return this.http.post(bureaUrl + 'getClientBlockedAccs', {page: page || 1});
  }

  removeRecord(id: string) {
    return this.http.post(bureaUrl + 'deleteBureauEntry', {transactionid: id});
  }

  downloadexelsheet(dates) {
    return this.http.post(bureaUrl + 'downloadBureauTransactions', dates);
  }

}
