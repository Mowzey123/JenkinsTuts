import { Component, OnInit, Input } from '@angular/core';
import {Router, ActivatedRoute, NavigationExtras} from '@angular/router';
import {AuthenticationService} from '../../../services';
import { FormGroup,  FormBuilder,  Validators, FormControl } from '@angular/forms';
import { NgbModal, NgbAlertConfig } from '@ng-bootstrap/ng-bootstrap';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [NgbAlertConfig]
})

export class LoginComponent implements OnInit {

  dismissible = true;
  loginForm: any;
  forgotForm: FormGroup;
  token = '';
  newtoken = '';
  email = '';
  result: any;
  errormesg: any;
  msg: any;


  test = '';
  constructor(
    private modalService: NgbModal,
    public router: Router,
    public location: Location,
    private authservice: AuthenticationService,
    private toastr: ToastrService,
    private route: ActivatedRoute) {
      if (!this.authservice.isExpired()) {
        this.router.navigate(['/Rac/Summary']);
      } else {
        this.authservice.logout();
      }
    }



  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.email = params.email;
     });
    this.route.queryParams.subscribe((params) => {
     this.token = params.token;
    });
    this.loginForm = new FormGroup({
      email: new FormControl(this.email !== undefined || '' ? this.email : '', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
    this.forgotForm = new FormGroup({
      email2: new FormControl(this.email !== undefined || '' ? this.email : '', [Validators.required, Validators.email])
    });
  }

  get f() { return this.loginForm.controls; }

  login() {
      if (this.loginForm.invalid) {
        return;
      }
      localStorage.clear();
      this.authservice.login({email: this.loginForm.value.email, password: this.loginForm.value.password}).subscribe((logindata) => {
         this.result = logindata;
          }, error => {
              this.result = {status: false, msg: 'Server connection failed'};
              this.errormesg = this.result.msg;
          }, () => {
            this.token = this.result.token;
            localStorage.setItem('_cu',  this.token);
            this.result.status ? this.donavigation() : this.ShowError() ;
    });
}
onClosed(danger) {
  this.errormesg = null;
}

donavigation(): void {
  window.location.replace('Rac/Summary');
}

ShowError(): void {
    this.errormesg = this.result.msg;
}

openBackDropCustomClass(password) {
  this.modalService.open(password, {backdropClass: 'light-blue-backdrop'});
}



signup() {
  this.router.navigate(['/home']);
}

resetPassword() {
  localStorage.clear();
  this.authservice.passwordReset({email: this.forgotForm.value.email2})
    .subscribe((res) => {
      this.result = res;
    }, error => {
      // this.result = {status: false, msg: 'Server connection failed'};
      this.msg = this.result.msg;
    }, () => {
      this.result.status ? this.checkMail() : this.throwError() ;
    });
}

checkMail() {
  this.toastr.info('Check your email');
  this.modalService.dismissAll();

}

throwError() {
  this.msg = this.result.msg;
}

onClosed1(danger1) {
  this.msg = '';
}

}
