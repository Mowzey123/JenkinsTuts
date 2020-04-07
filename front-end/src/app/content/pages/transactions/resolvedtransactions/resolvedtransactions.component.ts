import { TransactionService } from './../../../../../services/transaction.service';
import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import {Router, NavigationExtras} from '@angular/router';
import {NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from '../../../../../services';
import { ToastrService } from 'ngx-toastr';
import { baseurl } from 'src/services/config';
import {BsDatepickerConfig} from 'ngx-bootstrap/datepicker';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import {IAngularMyDpOptions, IMyDateModel} from 'angular-mydatepicker';


@Component({
  selector: 'app-resolvedtransactions',
  templateUrl: './resolvedtransactions.component.html',
  styleUrls: ['./resolvedtransactions.component.css']
})
export class ResolvedtransactionsComponent implements OnInit {
  myDpOptions: IAngularMyDpOptions = {
    dateRange: true,
    dateFormat: 'dd/mm/yyyy',
    alignSelectorRight: false,
    openSelectorTopOfInput: false,
    // other options are here...
  };
  myDateInit: Boolean = true;
  model: IMyDateModel = null;

  color = 'primary';
  mode = 'indeterminate';
  values = 50;
  spinnerDiameter = 1;
  showSpinner = false;
  category: any;
  endDate: any;
  mydate: any;
  mydata: any;
  origin = '';
  myurl: any;


  @ViewChild('LoginModal') LogiModal: TemplateRef<any>;
  selected: any = '';
  selectedcat: any = 'ressolved';
  term;
  show = false;
  showBar: boolean;
  data = [];
  // data1 = mydata;
  initialamt: any = 0;
  clickState: any = 0;
  transactionid: '';
  result: any;
  selectedOption = false;
  previous: any;
  nextpage: any;
  next: any;
  prev: any;
  pages = [];
  tabledata = [];
  token = '';
  urldata: any;
  display = '';
  dawnloadurlurl = '';
   // date
   bsValue = new Date();
   bsRangeValue: Date;
   maxDate = new Date();
   datePickerConfig: Partial<BsDatepickerConfig>;
   date: Date;
   firstDate: any;
   secondDate: any;

  constructor(private modalService: NgbModal,
              private ngxService: NgxUiLoaderService,
              private route: Router,
              private transactions: TransactionService,
              private auth: AuthenticationService,
              private toastr: ToastrService
              ) {this.token = localStorage.getItem('_cu'); }

  ngOnInit() {
        // date values
        this.maxDate.setDate(this.maxDate.getDate() + 7);
        this.datePickerConfig = Object.assign({},
           {containerClass: 'theme-dark-blue',
           showWeekNumbers: false});
        this.getresolvedTransactions(1);
        this.state();
        this.myurl = this.route.url;
        localStorage.setItem("url", this.myurl);
  }

    // tslint:disable-next-line: use-life-cycle-interface
    ngAfterContentInit() {
      this.checktokexpiry();
    }

  getresolvedTransactions(page) {
        this.show = false;
        this.showSpinner = true;
        this.transactions.getClientRessolvedTransactions(page).subscribe((resolveddata) => {
          this.result = resolveddata;
        },
        (error) => {

        },
        () => {
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
        });
  }

  getnextransactiondata() {
    this.showSpinner = true;
    this.pages = [];
    this.tabledata = [];
    this.next = this.result.data.next;
    this.pages.push({page: this.next});
     this.transactions.getClientRessolvedTransactions(this.next)
      .subscribe((datagot) => {
            this.result = datagot;
          },
          (err) => {
          },
          () => {
            this.previous = this.result.data.hasPrev;
            this.nextpage = this.result.data.hasNext;
            this.tabledata = this.result.data.itemsList;
    });
  }

  previousmethod() {
    this.showSpinner = true;
    this.pages = [];
    this.tabledata = [];
    this.prev = this.result.data.prev;
    this.pages.push({page: this.prev});
       this.transactions.getClientRessolvedTransactions(this.prev)
      .subscribe((datagot) => {
            this.result = datagot;
          },
          (err) => {
          },
          () => {
            this.previous = this.result.data.hasPrev;
            this.nextpage = this.result.data.hasNext;
            this.tabledata = this.result.data.itemsList;
          });
  }

  save(filtered) {
    this.showBar = true;
    filtered.page = 1;
    Object.keys(filtered).forEach((key) => (filtered[key] == null || filtered[key] === '' && key !== 'amount'  ) && delete filtered[key]);
    this.transactions.filterTransactions(filtered)
      .subscribe(
        (data) => {
            this.result = data;
        }, (err) => {
          this.result = {status: false, msg: 'Network Error' };
        }, () => {
          if (this.result.status) {
            setTimeout(() => {
             this.success2();
             this.showBar = false;
           }, 1000);
          } else {
            this.ShowError();
          }
          // this.modalService.dismissAll();
          this.result.status ? this.ready() : this.ShowError() ;
          this.modalService.dismissAll();
        }
      );
   }

   onChange(e) {
    if (e.target.value === 'onhold') {
      this.selectedOption = true;
    } else {
      this.selectedOption = false;
    }
   }


   ready() {
    this.tabledata = [];
    this.show = false;
    this.previous = this.result.data.hasPrev;
    this.nextpage = this.result.data.hasNext;
    this.tabledata = this.result.data.itemsList;
    setTimeout(() => {
      this.ngxService.stopLoader('loader-01'); // stop foreground spinner of the master loader with 'default' taskId
    }, 0);

    for (let i = 1; i <= this.result.data.docs.totalPages; i++ ) {
         if ( i > 1) {
          // this.nextpage = i;
         } else {
          this.pages.push({page: i});
         }
    }

    if (!this.tabledata || !this.tabledata.length) {
      this.show = true;
    } else {
      this.show = false;
    }
   }

  openSearch(tableSearch) {
    this.modalService.open(tableSearch, {backdropClass: 'light-blue-backdrop'});
  }

  openBackDropCustomClass(content) {
    this.modalService.open(content, {backdropClass: 'light-blue-backdrop'});
  }

  profile(object) {
    this.transactionid = object.transactionid;
    if (this.transactionid === '') {
      return;
    }
    const navextras: NavigationExtras = {
      queryParams: {
        id: this.transactionid,
        origin: 'notfraud'
      }
    };
    this.transactionid = object.transactionid;
    this.origin = object.origin;
    this.transactions.setdatasession(object);
    this.route.navigate(['Rac/Transactions/TransactionProfile'], navextras);
  }
  onDateChanged(event: IMyDateModel) {
    this.firstDate = new Date().toLocaleDateString();
    this.secondDate =  new Date().toLocaleDateString();
    this.showSpinner = true;
    this.show = false;
    this.category = 'ressolved';
    this.mydata = event.dateRange.formatted;
    this.mydate = this.mydata.split(' - ');
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
    this.transactions.downexelsheet({startdate: this.firstDate, enddate: this.secondDate,  category: this.category})
    .subscribe((resultdata) => {
      this.result = resultdata;
    }, (err) => {
          this.modalService.dismissAll();
          this.result = {status: false, msg: 'Network Problem'};
    }, () => {
          // this.urldata = this.result.data;
          this.result.status ? this.success() : this.ShowError() ;
          this.modalService.dismissAll();
    });
  }

  success(): void {
    this.toastr.info(this.result.msg);
    this.tabledata = this.result.data.docs;
    setTimeout(() => {
      this.showSpinner = false;
     }, 0);

    if (!this.tabledata || !this.tabledata.length) {
      this.show = true;

    } else {
      this.show = false;
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

  ShowError(): void {
    // this.show = false;
    this.showBar = false;
    if (this.result.msg === 'Service request failed') {
      this.toastr.error(this.result.error[0].val);
      this.show = false;
    } else {
      this.toastr.error(this.result.msg);
    }
  }

  download() {
    this.showBar = true;
    this.transactions.downloadResolved({startdate: this.firstDate, enddate: this.secondDate})
    .subscribe((resultdata) => {
      this.result = resultdata;

    }, error => {
          this.modalService.dismissAll();
          this.result = {status: false, msg: 'Network Problem'};
    }, () => {
          this.urldata = this.result.data;
          if (this.result.status) {
            setTimeout(() => {
             this.success2();
             this.showBar = false;
           }, 1000);
          } else {
            this.ShowError();
          }
    });
 

  }

  success2(): void {
    this.dawnloadurlurl = baseurl + 'getExcelFile?filename=' + this.urldata + '&token=' + this.token;
    window.open(this.dawnloadurlurl);
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
         const d: any = new Date(a.transactionData[0].createdAt);
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
