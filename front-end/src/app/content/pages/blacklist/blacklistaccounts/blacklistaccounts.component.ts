import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import {NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import { BlacklistService } from '../../../../../services/blacklist.service';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../../../../../services';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-blacklistaccounts',
  templateUrl: './blacklistaccounts.component.html',
  styleUrls: ['./blacklistaccounts.component.css']
})

export class BlacklistaccountsComponent implements OnInit {


  constructor(
              private auth: AuthenticationService,
              private modalService: NgbModal,
              private blacklist: BlacklistService,
              private toastr: ToastrService
            ) {}
  @ViewChild('LoginModal') LogiModal: TemplateRef<any>;
  color = 'primary';
  mode = 'indeterminate';
  values = 50;
  spinnerDiameter = 1;
  show: boolean;
  showSpinner: boolean;
  listdata: any;
  list = [];
  data = {firstname: '', lastname: '', subscriptionid: ''};
  result: any;
  errormesg = '';
  resultdata: any;
  term;

  form = new FormGroup({
    subscriptionid: new FormControl('', Validators.required),
    firstname: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required)
  });

  get subscriptionid() {
    return this.form.get('subscriptionid');
  }

  get firstname() {
    return this.form.get('firstname');
  }

  get lastname() {
    return this.form.get('lastname');
  }



  ngOnInit() {
    // this.checktokexpiry();
    this.getblacklistaccounts();
  }



    // tslint:disable-next-line: use-life-cycle-interface
    ngAfterContentInit() {
      this.checktokexpiry();
    }

  openBackDropCustomClass(content) {
    this.modalService.open(content);
  }

  addmethod() {
    // this.checktokexpiry();
    // tslint:disable-next-line:max-line-length
    const acc = {firstname: this.form.value.firstname, lastname: this.form.value.lastname, subscriptionid: this.form.value.subscriptionid };
    this.form.reset();

    this.blacklist.addToAccountBlackList(acc).subscribe((data) => {
        this.result = data;
      },
      (err) => {
        this.modalService.dismissAll();
        this.result = {status: false, msg: 'Network Problem'};
      },
      () => {
          this.result.status ? this.showsuccess() : this.ShowError() ;
          this.getblacklistaccounts();
      });
  }


  getblacklistaccounts() {
      this.showSpinner = true;
      // this.checktokexpiry();
      this.blacklist.getBlackListedAccs().subscribe((blacklist) => {
        this.listdata = blacklist;
      },
      (err) => {
         this.result = {status: false, msg: 'Network Problem'};
      },
      () => {
        this.list = this.listdata.data;
        this.showSpinner = false;
        if (!Array.isArray(this.list) || !this.list.length) {
          this.show = true;
        } else {
          this.show = false;
        }
      });
  }

  delete(id) {
    // this.checktokexpiry();
    this.blacklist.deleteuserblacklistaccount(id).subscribe((resultdelete) => {
      this.result = resultdelete;
    },
    (error) => {
      this.result = {status: false, msg: 'Network Problem'};
      this.ShowError();
    },
    () => {
      this.showsuccess();
      this.getblacklistaccounts();
    });
  }

  showsuccess(): void {
      this.modalService.dismissAll();
      this.toastr.success(this.result.msg);
  }

  ShowError(): void {
    if (this.result.msg === 'Service request failed') {
      this.toastr.error(this.result.error[0].val);
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
