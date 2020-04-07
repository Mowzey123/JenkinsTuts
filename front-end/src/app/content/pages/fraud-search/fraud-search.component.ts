import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { BureauService } from 'src/services/bureau.service';
import { Router, NavigationExtras } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgbModalOptions, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from 'src/services';

@Component({
  selector: 'app-fraud-search',
  templateUrl: './fraud-search.component.html',
  styleUrls: ['./fraud-search.component.css']
})
export class FraudSearchComponent implements OnInit {
  @ViewChild('LoginModal') LogiModal: TemplateRef<any>;
  sentdata: any;
  sortOrders: string[] = ['account', 'device', 'mobilemoney', 'card'];
  deviceDetails: string[] = ['imei', 'deviceId'];
  detailOrder = 'Select details';
  result: any;
  redirect: Boolean = false;
  selectedSortOrder = 'Select parameters';
  searchObj = {
      parameter: '',
      prefix: '',
      suffix: '',
      msisdn: '',
      imei: '',
      deviceId: '',
      userId: ''
  };
  spinnerDiameter = 1;
  carddata: any;
  imagepath: any;
  myicon: any;
  icon: any;
  visaRegEx: any;
  mastercardRegEx: any;
  amexpRegEx: any;
  discovRegEx: any;
  errormesg: any = '';

  dummyParam = '123456XYZ';
  parameter: String;
  constructor(
    public router: Router,
    private bureauservice: BureauService,
    private toastr: ToastrService,

    private modalService: NgbModal,
    private auth: AuthenticationService,

  ) {

   }

  ngOnInit() {

  }

  // tslint:disable-next-line: use-life-cycle-interface
  ngAfterContentInit() {
    this.checktokexpiry();
  }


  ChangeSortOrder(newSortOrder: string) {
    switch (newSortOrder) {
      case 'card':
        this.selectedSortOrder = 'Bank Card';
        break;
      case 'mobilemoney':
        this.selectedSortOrder = 'Mobile Money';
        break;
      case 'device':
        this.selectedSortOrder = 'Device';
        break;
      case 'account':
        this.selectedSortOrder = 'Account';
        break;
      default:
        this.selectedSortOrder  = 'Select Parameters';
    }
    // this.selectedSortOrder = newSortOrder;
    this.searchObj.parameter = newSortOrder;
  }

  ChangeDetails(newDetailOrder: string) {
    switch (newDetailOrder) {
      case 'imei':
        this.detailOrder = 'IMEI';
        break;
      case 'deviceId':
        this.detailOrder = 'Device ID';
        break;
      default:
        this.detailOrder  = 'Select details';
    }

  }



  submit() {
    this.searchObj.msisdn = '+256' + this.searchObj.msisdn;
    this.bureauservice.searchRecords(this.searchObj)
      .subscribe( res => {
        this.result = res;
      }, err => {
          this.toastr.error(err.error.message);
          
      }, () => {

        if (!('msg' in this.result)) {
          this.showSuccess();
          this.searchObj.msisdn = '';
        } else {
          this.showError();
          this.searchObj.msisdn = '';
        }
      });
  }


  showSuccess() {

    this.bureauservice.seteditsession(this.result);
    this.router.navigate(['/Rac/Searchprofile']);
  }

  showError() {
    this.toastr.error(this.result.msg);

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
