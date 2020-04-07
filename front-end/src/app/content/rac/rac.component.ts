import { JwtHelperService } from '@auth0/angular-jwt';
import { Component, OnInit, AfterViewInit, TemplateRef, ViewChild } from '@angular/core';
import { AuthenticationService } from '../../../services';
import { FormGroup,  FormBuilder,  Validators, FormControl } from '@angular/forms';
import { NotificationService } from '../../../services/notification.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
const helper = new JwtHelperService();

declare let MetisMenu: any;

@Component({
    selector: 'rac.content-wrapper',
    templateUrl: './rac.component.html',
    styleUrls: ['./rac.component.css']
})
export class RacComponent implements OnInit, AfterViewInit {


    @ViewChild('LoginModal') LogiModal: TemplateRef<any>;
    loginForm: FormGroup;
    email = '';
    result: any;
    errormesg = '';
    token = '';
    constructor(  private auth: AuthenticationService,
                  private notification: NotificationService,
                  private toastr: ToastrService,
                  private fb: FormBuilder,
                  private modalservice: NgbModal) { this.token = localStorage.getItem('_cu'); }

    ngOnInit() {

      const data = helper.decodeToken(this.token);
      this.email = data.email;
      this.loginForm = new FormGroup({
        email: new FormControl(this.email !== undefined || '' ? this.email : '', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(6)])
      });

      this.notification.currentdata2.subscribe(data => this.result = data);
      if (this.result.status === 'true') {
            const ngbModalOptions: NgbModalOptions = {
              backdrop : 'static',
              keyboard : false
          };
            this.modalservice.open(this.LogiModal, ngbModalOptions);

      } else {
      }

      // if (this.auth.checkiftokenisabouttoexpire() === 'true' ) {
      //       const ngbModalOptions: NgbModalOptions = {
      //         backdrop : 'static',
      //         keyboard : false
      //     };
      //   this.modalservice.open(this.LogiModal, ngbModalOptions);


    }

    login() {
      if (this.loginForm.invalid) {
        return;
      }
      localStorage.removeItem('_cu');
      this.auth.login({email: this.loginForm.value.email, password: this.loginForm.value.password}).subscribe((logindata) => {
            this.result = logindata;
        }, (err) => {
            this.result = {statsu: false, msg: 'Network Problem'};
            this.modalservice.dismissAll();
        }, () => {
          this.result.statsu ? this.success() : this.ShowError() ;
      });
    }

    ngAfterViewInit(): void {
      // tslint:disable-next-line: no-unused-expression
      new MetisMenu('#sidenav');
    }

    success() {
      this.toastr.success('New Session is Created');
      this.modalservice.dismissAll();
    }

    ShowError() {

       this.errormesg = this.result.msg;
    }
}
