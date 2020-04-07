import { Component, OnInit, AfterViewInit, ViewChild, TemplateRef, OnDestroy } from '@angular/core';
import {Router, NavigationExtras} from '@angular/router';
import {NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import { TransactionService } from '../../../../../services/transaction.service';
import { ToastrService } from 'ngx-toastr';
import { baseurl } from '../../../../../services/config';
import { AuthenticationService } from 'src/services';
import {BsDatepickerConfig} from 'ngx-bootstrap/datepicker';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import {IAngularMyDpOptions, IMyDateModel} from 'angular-mydatepicker';


@Component({
  selector: 'app-success-transactions',
  templateUrl: './success-transactions.component.html',
  styleUrls: ['./success-transactions.component.css']
})
export class SuccessTransactionsComponent implements OnInit {
  myDpOptions: IAngularMyDpOptions = {
    dateRange: true,
    dateFormat: 'dd/mm/yyyy',
    alignSelectorRight: false,
    openSelectorTopOfInput: false,
    // other options are here...
  };
  myDateInit: Boolean = true;
  model: IMyDateModel = null;
  origin = '';
  clickState = 0;
  show: boolean;
  showNext = true;
  showPrevious = false;
  paginatedArr = [];
  counter = 0;
  pageNumber: any;
  category: any;
  newpage: any;
  selectedcat: any = 'passed';
  color = 'primary';
  mode = 'indeterminate';
  values = 50;
  spinnerDiameter = 1;
  showSpinner = false;
  endDate: any;
  mydate: any;
  data: any;
  prev: number;
  next: number;
  myurl: any;

  @ViewChild('LoginModal') LogiModal: TemplateRef<any>;
  constructor(
    private modalService: NgbModal,
    private ngxService: NgxUiLoaderService,
    private route: Router,
    private transservice: TransactionService,
    private toastr: ToastrService,
    private auth: AuthenticationService,
    ) {this.token = localStorage.getItem('_cu'); }
  modalReference = null;
  transactionid = '';
  select: any = '';
  tabledata = [];
  result: any;
  selected: any;
  pages = [];
  initialamt: any = 0;
  nextpage: number;
  previous: number;
  urldata: any;
  display = '';
  dawnloadurlurl = '';
  token = '';
  firstDate: any;
  secondDate: any;
  selectedOption = false;
  term;


  // date
  bsValue = new Date();
  bsRangeValue: Date;
  maxDate = new Date();
  datePickerConfig: Partial<BsDatepickerConfig>;
  date: Date;


  ngOnInit() {

     this.maxDate.setDate(this.maxDate.getDate() + 7);
     this.datePickerConfig = Object.assign({},
       {containerClass: 'theme-dark-blue',
       showWeekNumbers: false});
     this.getpassedtransactiondata(1);
     this.state();
     this.myurl = this.route.url;
     localStorage.setItem("url", this.myurl);
  }

  // tslint:disable-next-line: use-life-cycle-interface
  ngAfterContentInit() {
    this.checktokexpiry();
  }

  profile(object) {
    const navextras: NavigationExtras = {
      queryParams: {
        id: object.transactionid,
        origin: 'notfraud'
      }
    };
    this.transactionid = object.transactionid;
    this.origin = object.origin;
    this.transservice.setdatasession(object);
    this.route.navigate(['Rac/Transactions/TransactionProfile'], navextras);
  }

  getpassedtransactiondata(page: number) {
    this.show = false;
    this.showSpinner = true;
    this.pages.length = 0;
    this.tabledata.length = 0;
    this.transservice.getPassedTransactions(page)
      .subscribe((datagot) => {
          this.result = datagot;
        },
        (err) => {

        },
        () => {
          this.result.status ? this.done() : this.ShowError() ;
        });
  }

  done() {
    this.show = false;
    this.previous = this.result.data.prev;
    this.nextpage = this.result.data.next;
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
        this.showSpinner = false;

    } else {
      this.show = false;
    }

  }



  openBackDropCustomClass(content) {
    this.modalService.open(content, {backdropClass: 'light-blue-backdrop'});
  }

  onDateChanged(event: IMyDateModel) {
    this.firstDate = new Date().toLocaleDateString();
    this.secondDate =  new Date().toLocaleDateString();
    this.showSpinner = true;
    this.show = false;
    this.category = 'passed';
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
  this.transservice.downexelsheet({startdate: this.firstDate, enddate: this.secondDate, category: this.category})
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
    // this.toastr.error('No transactions filtered');
    this.show = true;

  } else {
    this.show = false;
    // this.toastr.success(this.result.msg);
  }
}

ShowError(): void {
  this.show = false;
  setTimeout(() => {
    this.showSpinner = false;
  }, 0);
  if (this.result.msg === 'Service request failed') {
    this.toastr.error(this.result.error[0].val);

  } else {
  this.toastr.error(this.result.msg);

  }
}

  download() {
    this.transservice.downloadpassed({startdate: this.firstDate, enddate: this.secondDate})
    .subscribe((resultdata) => {
      this.result = resultdata;

    }, (err) => {
          this.modalService.dismissAll();
          this.result = {status: false, msg: 'Network Problem'};
    }, () => {
          this.urldata = this.result.data;
          this.result.status ? this.success2() : this.ShowError() ;
          // this.modalService.dismissAll();
    });

  }

  success2(): void {
    // this.toastr.info(this.result.msg);
    this.dawnloadurlurl = baseurl + 'getExcelFile?filename=' + this.urldata + '&token=' + this.token;
    window.open(this.dawnloadurlurl);
  }

  openSearch(tableSearch) {
    this.modalService.open(tableSearch, {backdropClass: 'light-blue-backdrop'});
  }

  save(filtered) {
    filtered.page = 1;
    this.showSpinner = true;
    Object.keys(filtered).forEach((key) => (filtered[key] == null || filtered[key] == '' && key !== 'amount'  ) && delete filtered[key]);

    this.transservice.filterTransactions(filtered)
      .subscribe(
        (data) => {
            this.result = data;
        }, (err) => {
          this.result = {status: false, msg: 'Network Error' };
        }, () => {
          // this.modalService.dismissAll();
          this.result.status ? this.ready() : this.ShowError() ;
          this.modalService.dismissAll();
        }
      );
   }

   ready() {
    this.tabledata = [];
    this.show = false;
    this.showSpinner = true;
    this.previous = this.result.data.prev;
    this.nextpage = this.result.data.next;
    this.tabledata = this.result.data.itemsList;
    setTimeout(() => {
      this.showSpinner = false;
    }, 0);
    for (let i = 1; i <= this.result.data.pageCount; i++ ) {
         if ( i > 1) {
          // this.nextpage = i;
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
      this.toastr.success('Transactions filtered');
    }
  }


  getnextransactiondata() {
    this.showSpinner = true;
    this.pages = [];
    this.tabledata = [];
    this.next = this.result.data.next;
    this.pages.push({page: this.next});
    this.transservice.gettransactions(this.next).subscribe((res) => {
        this.result = res;
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
  // this.checktokexpiry();
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

         this.tabledata =  this.result.data.itemsList;
         setTimeout(() => {
           this.showSpinner = false;
          }, 0);
     });
 }

  onChange(e) {
    if (e.target.value === 'onhold') {
     this.selectedOption = true;
    } else {
     this.selectedOption = false;
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
