import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AuthenticationService } from '../../../services';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MustMatch } from 'src/@helpers';


@Component({
  selector: 'app-confirmingemail',
  templateUrl: './confirming.component.html',
  styleUrls: ['./confirming.component.css']
})

export class ConfirmingemailComponent implements OnInit {
   token = '';
   userid = '';
   msg = 'Confirming Email ...';
   result: any;
   count = 0;
   role: any = '';
   registerForm: FormGroup;
   submitted = false;

   constructor(
     private formBuilder: FormBuilder,
     private route: ActivatedRoute, private authservice: AuthenticationService, private router: Router
    ) {}

  ngOnInit() {
    this.token = this.route.snapshot.params.token;
    localStorage.setItem('_cu$', this.token);
    this.userid = this.route.snapshot.params.userid;
    this.role = decodeURIComponent(( this.route.snapshot.params.role + '').replace(/\+/g, '%20'));
    if (this.role === 'admin') {
      this.confirmemail();
    }

    this.registerForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
  }, {
      validator: MustMatch('password', 'confirmPassword')
  });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.registerForm.invalid) {
          return;
      }
      this.notadmin();
  }



  confirmemail() {
    this.authservice.confirmemail1(this.token).subscribe((data) => {
      this.result = data;
    }, (err) => {
        this.msg = 'Network Failure';
    }, () => {
        this.result.status ? this.donavigation() : this.ShowError();
    });
  }

  notadmin() {
    this.authservice.confirmemail({role: this.role , password: this.registerForm.value.password}).subscribe((data) => {
      this.result = data;
    }, (err) => {
        this.msg = 'Network Failure';
    }, () => {
        this.result.status ? this.donavigation() : this.ShowError();
    });
  }

  donavigation() {
    localStorage.removeItem('_cu$');
    const navextras: NavigationExtras = {
      queryParams: {
        email: this.result.data.email,
      }
    };
    setTimeout(() => {
      this.msg = this.result.msg;
      this.router.navigate([''], navextras);
    }, 1000);
  }

  ShowError(): void {
      this.msg = this.result.msg;
  }

}
