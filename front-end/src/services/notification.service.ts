import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class NotificationService {
    // private sesexpired = new Subject<any>();
    private  datasession = new Subject<any>();
    private messageSource = new BehaviorSubject({});
    private messagesource2 = new BehaviorSubject({status: 'false'});
    currentdata = this.messageSource.asObservable();
    currentdata2 = this.messagesource2.asObservable();

    constructor() { }

    getSessionStatus(): Observable<Boolean> {
      return this.datasession.asObservable();
    }

    setSessionStatus(data: string) {
      this.messagesource2.next({status: data});
    }

    getSessionfordata(): Observable<Array<Object>> {
      return this.datasession.asObservable();
    }

    setSessionfordata(data) {
      this.messageSource.next(data);
    }




}
