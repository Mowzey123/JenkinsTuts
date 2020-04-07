
import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { baseurl, baseurl2 } from './config';
import { BillingDetails, Savecard  } from '../models';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Subject } from 'rxjs';
import { Http, ResponseContentType, RequestOptions } from '@angular/http';

const helper = new JwtHelperService();
@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  id = '';
  private  datasession = new Subject<any>();
  private messageSource = new BehaviorSubject({});
  currentdata = this.messageSource.asObservable();

  constructor(private http: HttpClient) {
    this.id = helper.decodeToken(localStorage.getItem('_cu')).id;
   }

   setdatasession(data) {
    this.messageSource.next(data);
  }



  getdatasession() {
     return this.datasession.asObservable();
  }

  getClientRessolvedTransactions(page: number) {
    return this.http.post(baseurl2 + 'getClientRessolvedTransactions', {page: page || 1});
  }

  getPassedTransactions(page: number) {
    return this.http.post(baseurl2 + 'getClientPassedTransactions', {page: page || 1});
  }

  getBlackListedTransactions(page: number) {
    return this.http.post(baseurl2 + 'getBlackListedTransactions', {page: page || 1});
  }

  getRulesListedTransactions(page: number) {
    return this.http.post(baseurl2 + 'getRulesListedTransactions', {page: page || 1});
  }

  gettransactions(page: number) {
    return this.http.post(baseurl2 + 'getClientTransactions', {page: page || 1});
  }

  getClientConfirmedFraudTransactions(page: number) {
    return this.http.post(baseurl2 + 'getClientConfirmedFraudTransactions', {page: page || 1});
  }

  getTransactionProfile(id: string, origin: string) {
    return this.http.post(baseurl2 + 'getTransactionProfile', {transactionid: id, origin: origin});
  }

  getTransactionLogs(id: string) {
    return this.http.post(baseurl2 + 'getTransactionUpdateLogs', {transactionid: id});
  }

  downexelsheet(dates) {
    return this.http.post(baseurl2 + 'filterTransactionsTable', dates);
  }

//   downloadexelsheet(dates) {
//     const options = new RequestOptions({
//         responseType: ResponseContentType.Blob
//     });

//     return this.http.get(baseurl + 'downnLoadTransactions', dates);
// }
  downloadexelsheet(dates) {
    return this.http.post(baseurl + 'downnLoadTransactions', dates);
  }

  getpendingtransactions(page: number) {
    return this.http.post(baseurl2 + 'getClientPendingTransactions', {page: page || 1 });
  }

  downloadpending(dates) {
    return this.http.post(baseurl + 'downnLoadPendingTransactions', dates);
  }

  downloadpassed(dates) {
    return this.http.post(baseurl + 'downnLoadPassedTransactions', dates);
  }

  downloadpendingbyrules(dates) {
    return this.http.post(baseurl + 'downnLoadPendingTransactionsByRulesEngine', dates);
  }

  downloadResolved(dates) {
    return this.http.post(baseurl + 'downnLoadRessolvedTransactions', dates);
  }

  downfraudulent(dates) {
    return this.http.post(baseurl + 'downnLoadFradulentTransactions', dates);
  }

  downloadpendingbyblacklist(dates) {
    return this.http.post(baseurl + 'downnLoadPendingTransactionsByBlackList', dates);
  }

  getfraudtransactions(page: number) {
    return this.http.post(baseurl2 + '/getClientConfirmedFraudTransactions', {page: page || 1});
  }

  saveBillingDetails(bills: BillingDetails) {
    return this.http.post(baseurl + 'saveBillingDetails', bills);
  }

  getBillingDetails(idno: string) {
   return this.http.post<any>(baseurl + 'getBillingDetails',  {id: this.id});
  }

  saveCard(carddata: Savecard) {
     return this.http.post(baseurl2 + 'saveCard', carddata);
  }

  getSavedCards(idno: number) {
    return this.http.post(baseurl2 + 'getSavedCards', {id: this.id});

  }

  updatestatusresolvedtransactios(id: string) {
    return this.http.post(baseurl2 + '', id);
  }

  updatestatusconfirmedtransactions(id: string) {
   return this.http.post(baseurl2 + '', id);
  }

  aproveonholdtransactions(id: string) {
    return this.http.post(baseurl2 + '', id);
  }

  deleteonholdtransactions(id: string) {
    return this.http.post(baseurl2 + '', id);
  }

  reportfraudontransactiion(data) {
    return this.http.post(baseurl2 + 'updateTransactionFraudStatus' , data);
  }

  approvetransaction(data) {
    return this.http.post(baseurl2 + 'approveTransaction', data);
  }

  declinetransaction(data) {
    return this.http.post(baseurl2 + 'declineTransaction', data);
  }

  filterTransactions(data) {
    return this.http.post(baseurl2 + 'searchForTransaction', data);
  }

}
