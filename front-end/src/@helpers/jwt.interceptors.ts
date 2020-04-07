import { NotificationService } from '../services/notification.service';

import { Injectable, ViewChild, TemplateRef, Injector} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HttpSentEvent,
  HttpHeaderResponse,
  HttpProgressEvent,
  HttpResponse,
  HttpUserEvent, } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { AuthenticationService } from '../services';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  tokeninstance: any;
  auth: any;
  router: any;
  expirytime: any;
  timer: any;
  isRefreshingToken = false;
  tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  token = '';

  constructor(
    private injector: Injector,
    private authService: AuthenticationService,
    private toastr: ToastrService,
    private notification: NotificationService) {
    // const authservice = this.injector.get(AuthenticationService);
    this.token = authService.getAuthToken();
    if (this.token === '' || this.token === null || typeof this.token === 'undefined') {
      this.token = localStorage.getItem('_cu$');
    }
  }


  // tslint:disable-next-line: max-line-length
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any> | any> {
    return next.handle(this.addTokenToRequest(request));
  }

  addTokenToRequest(request: HttpRequest<any>): HttpRequest<any> {
        return request.clone({
          setHeaders: {
            Authorization: `Bearer ${this.token}`
          }
        });
  }

  // intercept(req, next) {
  //   const authservice = this.injector.get(AuthService);
  //   const tokenizedReq = req.clone({
  //     setHeaders: {
  //       Authorization: `Bearer ${this.token}`
  //     }
  //   });

  //   return next.handle(tokenizedReq);
  // }
}
