import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthenticationService } from '../../../../services';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
const helper = new JwtHelperService();
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  loginForm: FormGroup;
  email = '';
  result: any;
  errormesg: any = '';
  token = '';
  constructor(
    private auth: AuthenticationService,
    private modalService: NgbModal,
    private toastr: ToastrService,

  ) {}

  ngOnInit() {
      const data = helper.decodeToken(localStorage.getItem('_cu'));
      this.email = data.email;
      this.loginForm = new FormGroup({
        email: new FormControl(this.email !== undefined || '' ? this.email : '', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(6)])
      });
  }


    login() {
      if (this.loginForm.invalid) {
        return;
      }
      localStorage.removeItem('_cu');
      this.auth.login({email: this.loginForm.value.email, password: this.loginForm.value.password}).subscribe((logindata) => {
        this.result = logindata;
          }, (err) => {
              this.result = {status: false, msg: 'Server connection failed'};
              this.errormesg = this.result.msg;
          }, () => {
            this.token = this.result.token;
            this.result.status ? this.donavigation() : this.ShowError() ;
    });
  }

  donavigation(): void {
    localStorage.setItem('_cu',  this.token);
    window.location.reload();
  }

  ShowError(): void {
    this.errormesg = this.result.msg;
  }

}
