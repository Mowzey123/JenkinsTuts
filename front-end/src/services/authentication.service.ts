
import { Injectable, ViewChild, TemplateRef} from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';
import {baseurl} from './config';
import { UserLogin, Companyuserprofile, EditUserprofile, ConfirmEmail, Token} from '../models';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
const helper = new JwtHelperService();

@Injectable({ providedIn: 'root' })

export class AuthenticationService {
  @ViewChild('LoginModal') LogiModal: TemplateRef<any>;
  tokenid = '';
  expirytime: any;
  tokeninstance: any;
  token: Token;
  result: any;
  data: any;
  constructor(
    private http: HttpClient,
    private router: Router,
    private modalService: NgbModal,
    // public jwtHelper: JwtHelperService,
    private auth: AuthenticationService
    ) {this.tokenid = this.getAuthToken(); }

  login(userlogin: UserLogin) {
        return this.http.post<any>(baseurl + 'login', userlogin);
  }

  signupClient(addcompanyuser: Companyuserprofile) {
        return this.http.post( baseurl, addcompanyuser);
  }


  confirmemail(data: ConfirmEmail) {
    return this.http.post(baseurl + 'verifyEmail', data);
  }

  resendEmail(data) {
    return this.http.post(baseurl + 'verifyEmail', data);
  }

  confirmemail1(data) {
    return this.http.post(baseurl + 'verifyEmail', data);
  }

  addUserProfile(data: EditUserprofile) {
     return this.http.post(baseurl + 'editUserprofile', data);
  }

  logout() {
    localStorage.removeItem('_cu');
    this.router.navigate(['']);
  }

  refreshToken() {
   return this.http.post(baseurl + 'renewAuthToken', '');
  }

  getAuthToken(): string {
    const token = localStorage.getItem('_cu');
    if (token !== '' || token !== null || typeof token !== 'undefined') {
      return token;
    } else {
      this.logout();
    }
  }

  public isExpired(): boolean {
    const token = this.getAuthToken();
    if (  token !== 'undefined') {
      return helper.isTokenExpired(token);
    } else {
      this.logout();
    }

  }



  checkiftokenisabouttoexpire() {
     const tokendif = this.abouttoexpirediference();
      if  (tokendif && tokendif < 0) {
        return 'true';
      } else {
      }
      if (tokendif > 0 && tokendif < 200) {
         this.refreshmethod();
      }

  }

  refreshmethod() {
    this.refreshToken().subscribe((tokendata) => {
        this.tokeninstance = tokendata;
    }, (err) => {
        this.logout();
    }, () => {
        localStorage.setItem('_cu', this.tokeninstance.newtoken);
        window.location.reload();
    });
  }

  passwordReset(data) {
    return this.http.post(baseurl + 'forgotPassword', data);
  }

  resetPswd(data) {
    return this.http.post(baseurl + 'ressetPassword', data);
  }

  abouttoexpirediference() {
      // const now = new Date();
      const dif = (helper.decodeToken(this.tokenid).exp ) - (Date.now().valueOf() / 1000);
      if (dif !== null) {
        return dif;
      }
  }

}
