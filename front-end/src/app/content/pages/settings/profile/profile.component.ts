import { Component, OnInit, ViewEncapsulation, ViewChild, TemplateRef } from '@angular/core';
import {NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService, UserService } from '../../../../../services';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MustMatch } from '../../../../../@helpers/Match';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  @ViewChild('LoginModal') LogiModal: TemplateRef<any>;
  userprofdata = {phone: '', firstname: '', lastname: '', role: ''};
  changepassword = {oldpassword: '', newpassword: ''};
  roles = ['admin', 'superadmin'];
  result: any;
  token = '';
  resultedit: any;
  submitted = false;
  id = '';
  registerForm: FormGroup;
  constructor(
    private toastr: ToastrService,
    private modalService: NgbModal,
    private auth: AuthenticationService,
    private formBuilder: FormBuilder,
    private userservice: UserService) {}

  ngOnInit() {
        // this.checktokexpiry();
        this.token = localStorage.getItem('_cu');
        this.userservice.getLoggedUserProfile().subscribe((userdata) => {
          this.resultedit = userdata;
        },
        (error) => {
            this.result = {status: false, msg: 'Network Problem'};
        },
        () => {

              this.userprofdata = this.resultedit.data;

        });

        this.registerForm = this.formBuilder.group({
          oldpassword: ['', [Validators.required, Validators.minLength(6)]],
          password: ['', [Validators.required, Validators.minLength(6)]],
          confirmPassword: ['', Validators.required]
        }, {
            validator: MustMatch('password', 'confirmPassword')
        });
  }

    // tslint:disable-next-line: use-life-cycle-interface
    ngAfterContentInit() {
      this.checktokexpiry();
    }

  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }
    this.changpassword();
}



  openBackDropCustomClass(content) {
    this.modalService.open(content, {backdropClass: 'light-blue-backdrop'});
  }

  admineditprofile() {
      this.checktokexpiry();

      this.userservice.editUserprofile({
              firstname: this.userprofdata.firstname,
              lastname: this.userprofdata.lastname,
              phone: this.userprofdata.phone,
        })
      .subscribe((regdata) => {
          this.result = regdata;
        },
        (err) => {
          this.result = {status: false, msg: 'Network Problem'};
        },
       () => {
        this.result.status ? this.successmethod() : this.ShowError() ;
       });
  }

  changpassword() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }


    this.checktokexpiry();

    this.userservice.changepassword({oldpassword: this.registerForm.value.oldpassword,
      newpassword: this.registerForm.value.confirmPassword}).subscribe((data) => {
      this.result = data;
      },
        (err) => {
          this.result = {status: false, msg: 'Network Problem'};
        },
        () => {
          this.result.status ? this.successmethod() : this.ShowError() ;
      });
    this.modalService.dismissAll();
  }

  checktokexpiry() {
    setTimeout(() => {
      if (this.auth.checkiftokenisabouttoexpire() === 'true') {
        const ngbModalOptions: NgbModalOptions = {
          backdrop : 'static',
          keyboard : false
      };
        this.modalService.open(this.LogiModal, ngbModalOptions);
      } else {}
    }, 0);
  }

  successmethod() {
    this.toastr.success(this.result.msg);
  }

  ShowError(): void {
    this.toastr.error(this.result.msg);
  }
}
