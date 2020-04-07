import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BlacklistService } from './../../../../../services/blacklist.service';
import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import {NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from './../../../../../services';
@Component({
  selector: 'app-blacklistcards',
  templateUrl: './blacklistcards.component.html',
  styleUrls: ['./blacklistcards.component.css']
})
export class BlacklistcardsComponent implements OnInit {
  @ViewChild('LoginModal') LogiModal: TemplateRef<any>;
  color = 'primary';
  mode = 'indeterminate';
  values = 50;
  spinnerDiameter = 1;
  show: boolean;
  showSpinner: boolean;
  carddata: any;
  imagepath: any;
  myicon: any;
  icon: any;
  visaRegEx: any;
  mastercardRegEx: any;
  amexpRegEx: any;
  discovRegEx: any;
  list = [];
  data = {cardschema: '', prefix: '', suffix: ''};
  result: any;
  errormesg: any = '';
  term;
  constructor(
            private auth: AuthenticationService,
            private modalService: NgbModal,
            private blacklist: BlacklistService,
            private toastr: ToastrService
    ) { }

  ngOnInit() {
    this.getblacklistedcards();
  }


  // tslint:disable-next-line: use-life-cycle-interface
  ngAfterContentInit() {
    this.checktokexpiry();
  }

  openBackDropCustomClass(content) {
    this.modalService.open(content, {backdropClass: 'light-blue-backdrop'});
  }

  // save(card){
  //   console.log(card);
  // }
  // tslint:disable-next-line: member-ordering
  form = new FormGroup({
    prefix: new FormControl('', [
      Validators.required,
      Validators.maxLength(4)
    ]),
    suffix: new FormControl('', Validators.required)
  });

  get prefix() {
    return this.form.get('prefix');
  }

  get suffix() {
    return this.form.get('suffix');
  }

  addmethod() {
    this.checktokexpiry();
    const carddata = {prefix: this.form.value.prefix, suffix: this.form.value.suffix};
    this.blacklist.addBlackListedCard(carddata)
      .subscribe((datadded) => {
          this.result = datadded;
      }, (err) => {
          this.modalService.dismissAll();
          this.result = {status: false, msg: 'Network Problem'};
      }, () => {
        this.result.status ? this.showsuccess() : this.ShowError() ;
        this.form.reset();
        this.getblacklistedcards();
    });
  }

  getblacklistedcards() {
      this.showSpinner = true;
      // this.checktokexpiry();
      this.blacklist.getBlackListedCards().subscribe((cardsdata) => {
          this.result = cardsdata;
      }, (err) => {
          this.result = {status: false, msg: 'Network Problem'};
      }, () => {
          this.list = this.result.data;
          setTimeout(() => {
            this.showSpinner = false;
           }, 0);
          if (!Array.isArray(this.list) || !this.list.length) {
            this.show = true;
          } else {
            this.show = false;
          }
      });
  }

  showIcon(myvalue: any){
    const ccNum = myvalue;
    this.visaRegEx = /^4/;
    this.mastercardRegEx = /^5[1-5]/;
    this.amexpRegEx = /^3[47]/;
    this.discovRegEx = /^6011/;
    if (this.visaRegEx.test(ccNum)) {
    this.icon = 'assets/img/visa.png';
    return this.icon;
    } else if (this.mastercardRegEx.test(ccNum)) {
    this.icon = 'assets/img/mastercard.png';
    return this.icon;
    } else if (this.amexpRegEx.test(ccNum)) {
    this.icon = 'assets/img/american-express.png';
    return this.icon;

    } else if (this.discovRegEx.test(ccNum)) {
    this.icon = 'assets/img/discover.png';
    return this.icon;

    }
  }
  onCardinput(inputValue: any): void {
    const ccNum = inputValue;
    this.visaRegEx = /^4/;
    this.mastercardRegEx = /^5[1-5]/;
    this.amexpRegEx = /^3[47]/;
    this.discovRegEx = /^6011/;
    if (this.visaRegEx.test(ccNum)) {
    this.imagepath = 'assets/img/visa.png';
    } else if (this.mastercardRegEx.test(ccNum)) {
    this.imagepath = 'assets/img/mastercard.png';
    } else if (this.amexpRegEx.test(ccNum)) {
    this.imagepath = 'assets/img/american-express.png';
    } else if (this.discovRegEx.test(ccNum)) {
    this.imagepath = 'assets/img/discover.png';
    } else {
      this.imagepath = 'assets/img/credit-card.png';
    }
  }

  removeCard(id) {
    this.checktokexpiry();
    this.blacklist.deletecardfrombacklist(id).subscribe((resultdelete) => {
      this.result = resultdelete;
    },
    (error) => {
      this.result = {status: false, msg: 'Network Problem'};
      this.ShowError();
    },
    () => {
      this.toastr.success('Card Deleted');
      this.getblacklistedcards();
    });
  }
  getBlackListedCards() {
    throw new Error('Method not implemented.');
  }

  showsuccess(): void {
    this.toastr.success(this.result.msg);
    this.modalService.dismissAll();
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
