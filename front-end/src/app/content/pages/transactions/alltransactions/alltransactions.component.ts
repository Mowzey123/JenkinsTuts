import { Component, OnInit, AfterViewInit, ViewChild, TemplateRef, Directive, Input, Output, EventEmitter } from '@angular/core';
import {Router, NavigationExtras} from '@angular/router';
import {NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import { TransactionService } from '../../../../../services/transaction.service';
import { ToastrService } from 'ngx-toastr';
import { baseurl } from '../../../../../services/config';
import { AuthenticationService } from 'src/services';
import {BsDatepickerConfig} from 'ngx-bootstrap/datepicker';
import { NgxUiLoaderService} from 'ngx-ui-loader';
import { subscribeOn } from 'rxjs/operators';
import {IMyDrpOptions} from 'mydaterangepicker';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {IAngularMyDpOptions, IMyDateModel} from 'angular-mydatepicker';
// other imports here...

@Component({
  selector: 'app-alltransactions',
  templateUrl: './alltransactions.component.html',
  styleUrls: ['./alltransactions.component.css']
})
export class AlltransactionsComponent implements OnInit {
  myDpOptions: IAngularMyDpOptions = {
    dateRange: true,
    dateFormat: 'dd/mm/yyyy',
    alignSelectorRight: false,
    openSelectorTopOfInput: false,
    // other options are here...
  };
  myDateInit: Boolean = true;
  model: IMyDateModel = null;
  // tslint:disable-next-line: no-use-before-declare
  //  model;
  endDate: any;
  color = 'primary';
  mode = 'indeterminate';
  values = 50;
  spinnerDiameter = 1;
  clickState = 0;
  selectedcat: any = 'all';
  show: boolean;
  showBar: boolean;
  defpayment: String = '';
  elements: any = [];
  headElements = ['id', 'first', 'last', 'handle'];
  // date
  bsValue = new Date();
  bsRangesValue: Date[];
  category: any;
  value: any;
  maxDate: any;
  minDate: any;
  datePickerConfig: Partial<BsDatepickerConfig>;
  data: any = [];
  mydate: any = [];
  bsRangeValue:  Date[];
  daterangepickerModel: Date[];

  @ViewChild('LoginModal') LogiModal: TemplateRef<any>;

  constructor(
    private formBuilder: FormBuilder,
    private ngxService: NgxUiLoaderService,
    private modalService: NgbModal,
    private route: Router,
    private transservice: TransactionService,
    private toastr: ToastrService,
    private auth: AuthenticationService,
    ) {
      this.token = localStorage.getItem('_cu');
      // this.bsRangeValue = [this.bsValue, this.maxDate];
  }
  modalReference = null;
  transactionid = '';
  select: any = '';
  tabledata = [];
  result: any;
  selected: any;
  pages = [];
  nextpage: any;
  next: number;
  prev: number;
  initialamt: any = 0;
  previous: any;
  urldata: any;
  firstDate: any;
  secondDate: any;
  display = '';
  dawnloadurlurl = '';
  token = '';
  term;
  selectedOption = false;
  showSpinner = false;
  origin = '';
  myurl: any;



  ngOnInit(): void {
    for (let i = 1; i <= 15; i++) {
      this.elements.push({ id: i, first: 'User ' + i, last: 'Name ' + i, handle: 'Handle ' + i });
    }

     this.datePickerConfig = Object.assign({},
       {containerClass: 'theme-dark-blue',
       showWeekNumbers: false});
     this.gettransactiondata(1);
     this.state();
     this.myurl = this.route.url;
     localStorage.setItem("url", this.myurl);
  }

    // tslint:disable-next-line: use-life-cycle-interface
    ngAfterContentInit() {
      this.checktokexpiry();
    }

  profile(object) {
    this.transactionid = object.transactionid;
    
    const navextras: NavigationExtras = {
      queryParams: {
        id: this.transactionid,
        origin: 'notfraud'
      }
    };
    this.transactionid = object.transactionid;
    this.origin = object.origin;
    this.transservice.setdatasession(object);
    this.route.navigate(['Rac/Transactions/TransactionProfile'], navextras );
  }

  gettransactiondata(page: number) {
    this.show = false;
    this.showSpinner = true;
    this.pages.length = 0;
    this.tabledata.length = 0;
    this.transservice.gettransactions(page)
    .subscribe((datagot) => {
          this.result = datagot;
        },
        (err) => {
          setTimeout(() => {
            this.showSpinner = false;
           }, 0);

        },
        () => {
          this.showSpinner = true;
          this.result.status ? this.done() : this.ShowError() ;
        });
  }

  done() {
    this.show = false;
    this.previous = this.result.data.hasPrev;
    this.nextpage = this.result.data.hasNext;
    this.tabledata = this.result.data.itemsList;

    setTimeout(() => {
     this.showSpinner = false;
    }, 0);

    for (let i = 1; i <= this.result.data.pageCount; i++ ) {
         if ( i > 1) {
         } else {
          this.pages.push({page: i});
         }
    }
    if (!Array.isArray(this.tabledata) || !this.tabledata.length) {
        this.show = true;
    } else {
      this.show = false;
    }

  }

  getnextransactiondata() {
      this.showSpinner = true;
      this.pages = [];
      this.tabledata = [];
      this.next = this.result.data.next;
      this.pages.push({page: this.next});
      this.transservice.gettransactions(this.next).subscribe((datagot) => {
          this.result = datagot;
          this.previous = this.result.data.hasPrev;
          this.nextpage = this.result.data.hasNext;
        },
        (err) => {
        },
        () => {
            this.tabledata = this.result.data.itemsList;
            setTimeout(() => {
              this.showSpinner = false;
             }, 0);
      });
  }

 previousmethod() {
     this.showSpinner = true;
     this.pages = [];
     this.tabledata = [];
     this.prev = this.result.data.prev;
     this.pages.push({page: this.prev});
     this.transservice.gettransactions(this.prev).subscribe((datagot) => {
          this.result = datagot;
          this.previous = this.result.data.hasPrev;
          this.nextpage = this.result.data.hasNext;
        },
        (err) => {
        },
        () => {
            this.tabledata = this.result.data.itemsList;
            setTimeout(() => {
              this.showSpinner = false;
             }, 0);
        });
 }

 save(filtered) {
  Object.keys(filtered).forEach((key) => (filtered[key] == null || filtered[key] == '' && key !== 'amount'  ) && delete filtered[key]);


  filtered.page = 1;
  this.show = false;
  this.showSpinner = true;
  this.transservice.filterTransactions(filtered)
    .subscribe(
      (data) => {
          this.result = data;
      }, (err) => {
        this.result = {status: false, msg: 'Network Error' };
      }, () => {
        this.result.status ? this.ready() : this.ShowError() ;
        this.modalService.dismissAll();
      }
    );
 }

 ready() {
  this.tabledata = [];
  this.show = false;
  this.showSpinner = true;
  this.previous = this.result.data.hasPrev;
  this.nextpage = this.result.data.hasNext;
  this.tabledata = this.result.data.itemsList;
  setTimeout(() => {
    this.showSpinner = false;
   }, 0);

  for (let i = 1; i <= this.result.data.pageCount; i++ ) {
       if ( i > 1) {
       } else {
        this.pages = [];
        this.pages.push({page: i});
       }
  }
  if (!this.tabledata || !this.tabledata.length) {
    this.toastr.error('No data found');
    this.show = true;
    this.showSpinner = false;

  } else {
    this.show = false;

    this.toastr.success(this.result.msg);
  }
}

onChange(e) {
  if (e.target.value === 'onhold') {
   this.selectedOption = true;
  } else {
   this.selectedOption = false;
  }
}


  openSearch(tableSearch) {
    this.modalService.open(tableSearch, {backdropClass: 'light-blue-backdrop'});
  }

onDateChanged(event: IMyDateModel) {
      this.firstDate = new Date().toLocaleDateString();
      this.secondDate =  new Date().toLocaleDateString();
      this.showSpinner = true;
      this.show = false;
      this.category = 'all';
      this.data = event.dateRange.formatted;
      this.mydate = this.data.split(' - ');
      this.tabledata = [];
      if (this.mydate.length  < 2) {
        this.firstDate = new Date().toLocaleDateString();
        this.endDate = new Date();
        this.endDate.setDate(this.endDate.getDate() + 3);
        this.secondDate = this.endDate.toLocaleDateString();
      } else if (Array.isArray(this.mydate) || this.mydate.length) {
        this.firstDate = this.mydate[0];
        this.secondDate = this.mydate[1];
      }

    this.transservice.downexelsheet({startdate:  this.firstDate, enddate: this.secondDate, category: this.category})
      .subscribe((resultdata) => {
        this.result = resultdata;
      }, (err) => {
            this.modalService.dismissAll();
            this.result = {status: false, msg: 'Network Problem'};
      }, () => {
            this.result.status ? this.successfilter() : this.ShowError() ;
            this.modalService.dismissAll();
      });
  }


  successfilter(): void {

    this.tabledata = this.result.data.itemsList;
    setTimeout(() => {
      this.showSpinner = false;
     }, 0);

    if (!this.tabledata || !this.tabledata.length) {
      this.show = true;
    } else {
      this.show = false;
    }
  }

  ShowError(): void {
    this.show = false;
    this.showBar = false;

    // setTimeout(() => {
    //   this.showSpinner = false;
    // }, 0);
    // this.show = false;
    if (this.result.msg === 'Service request failed') {
      this.toastr.error(this.result.error[0].val);
      this.show = false;
    } else {
      this.toastr.error(this.result.msg);
    }
  }

  download() {
    this.showBar = true;
    this.transservice.downloadexelsheet({startdate: this.firstDate, enddate: this.secondDate})
    .subscribe((resultdata) => {
      this.result = resultdata;
    }, (err) => {
          this.modalService.dismissAll();
          this.result = {status: false, msg: 'Network Problem'};
    }, () => {
          this.urldata = this.result.data;
          if (this.result.status) {
              this.success2();
          } else {
            this.ShowError();
          }
    });

  }


  success2(): void {
    this.dawnloadurlurl = baseurl + 'getExcelFile?filename=' + this.urldata + '&token=' + this.token;
    this.showBar = false;
    window.open(this.dawnloadurlurl);
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

  state() {
    if (this.clickState === 0) {
      this.tabledata.sort(function(a, b) {
        const c: any = new Date(a.transactionData[0].createdAt);
        const d: any = new Date(b.transactionData[0].createdAt);
        return d - c;
        });
    this.clickState = 1;
    } else {
        this.tabledata.sort(function(a, b) {
        const c: any = new Date(a.transactionData[0].createdAt);
        const d: any = new Date(b.transactionData[0].createdAt);
        return c - d;
        });
      this.clickState = 0;
    }
  }

  numberWithCommas(x: any) {
    // tslint:disable-next-line: use-isnan
    const calx = Math.abs(x)
    if (calx) {
      const newx = Number(calx) === NaN ? calx : calx.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      return newx;
    } else {
      const anotherx = 0;
      return anotherx;
    }
   }

}




