import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { NgbModalOptions, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from 'src/services';
import { BlacklistService } from 'src/services/blacklist.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-mobilemoney',
  templateUrl: './mobilemoney.component.html',
  styleUrls: ['./mobilemoney.component.css']
})
export class MobilemoneyComponent implements OnInit {

  constructor(
    private auth: AuthenticationService,
    private modalService: NgbModal,
    private blacklist: BlacklistService,
    private toastr: ToastrService
  ) { }
  @ViewChild('LoginModal') LogiModal: TemplateRef<any>;
  errormesg: any;
  color = 'primary';
  mode = 'indeterminate';
  values = 50;
  spinnerDiameter = 1;
  show: boolean;
  showSpinner: boolean;
  list = [];
  result: any;
  term;

 form = new FormGroup({
    phone: new FormControl('', [
      Validators.required,
      Validators.minLength(10)
    ]),
    firstname: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required)
  });

  get phone() {
    return this.form.get('phone');
  }

  ngOnInit() {
    this.getNumbers();
  }

  openBackDropCustomClass(content) {
    this.modalService.open(content, {backdropClass: 'light-blue-backdrop'});
  }

  addmethod() {
    const phoneNumber = {phone: this.form.value.phone, firstname: this.form.value.firstname, lastname: this.form.value.lastname};

    this.blacklist.addBlackListedNumber(phoneNumber).subscribe((data) => {
        this.result = data;
      },
      (err) => {
        this.modalService.dismissAll();
        this.result = {status: false, msg: 'Network Problem'};
      },
      () => {
          this.result.status ? this.showsuccess() : this.ShowError() ;
          // this.form.reset();

          this.getNumbers();
    });
  }

  getNumbers() {
    this.showSpinner = true;
   // this.checktokexpiry();
   this.blacklist.getBlackListedNumbers().subscribe((blacklist) => {
     this.result = blacklist;
   },
   (err) => {
     this.result = {status: false, msg: 'Network Problem'};
   },
   () => {
     this.list = this.result.data;
     this.showSpinner = false;
     if (!Array.isArray(this.list) || !this.list.length) {
       this.show = true;
     } else {
       this.show = false;
     }
   });
}

deleteNumber(id) {
 this.checktokexpiry();
 this.blacklist.deleteFromBlackListedNumber(id).subscribe((resultdelete) => {
   this.result = resultdelete;
 },
 (error) => {
   this.result = {status: false, msg: 'Network Problem'};
 },
 () => {
   this.toastr.success('Number deleted');
   this.getNumbers();
 });
}

  showsuccess(): void {
    this.modalService.dismissAll();
    this.toastr.success(this.result.msg);
  }

  ShowError(): void {
    if (this.result.msg === 'Service request failed') {
      this.toastr.error(this.result.error[0].val);
      this.errormesg = 'Please provide a valid phone number';
    } else {
      this.toastr.error(this.result.msg);
    }
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
}
