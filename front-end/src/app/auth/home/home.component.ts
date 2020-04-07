import { Component, OnInit, HostListener, ElementRef } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators, FormControl } from '@angular/forms';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../../services/authentication.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  signupForm: FormGroup;
  signup: FormGroup;
  result: any;
  errormesg: any;
  token: any;
  logedin = '';
  localdata: any;
  private file: File | null = null;
  FormGroup: any;

  @HostListener('change', ['$event.target.files']) emitFiles( event: FileList ) {
    const file = event && event.item(0);
    this.file = file;
  }

  constructor(
     private host: ElementRef<HTMLInputElement>,
     private fb: FormBuilder,
     private toastr: ToastrService,
     private router: Router,
     private authservice: AuthenticationService
  ) { }

  ngOnInit() {

      this.signupForm = new FormGroup({
        email: new FormControl('', [
          Validators.required,
          Validators.email
        ]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(6)
        ])
      });
  }

  register() {
    if (this.signupForm.invalid) {
      return ;
    }
    const format = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;

    if (format.test( this.signupForm.value.password)) {
      this.errormesg = 'Special Characters are not accepted';
    } else {
      this.localdata = {email: this.signupForm.value.email, password: this.signupForm.value.password};
      localStorage.setItem('userdata', JSON.stringify(this.localdata));
      this.donavigation();
    }
  }

  donavigation(): void {
    this.router.navigate(['/Company']);
  }

  ShowError(): void {
    // this.toastr.error(this.result.msg);
    if (this.result.msg === 'Service request failed') {
      this.toastr.error(this.result.error[0].val);
    } else {
      this.toastr.error(this.result.msg);
    }
  }

  login(): void {
    this.router.navigate(['']);
  }
 }
