import { Component, OnInit, AfterViewInit, ViewChild, TemplateRef } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import {NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import { Router, NavigationExtras } from '@angular/router';
import { TransactionService } from '../../../../../services/transaction.service';
import { ToastrService } from 'ngx-toastr';
import { baseurl } from '../../../../../services/config';
import { AuthenticationService } from '../../../../../services';
import {BsDatepickerConfig} from 'ngx-bootstrap/datepicker';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import {IAngularMyDpOptions, IMyDateModel} from 'angular-mydatepicker';
import { ActivatedRoute } from "@angular/router";


@Component({
  selector: 'app-fraudprevented',
  templateUrl: './fraudprevented.component.html',
  styleUrls: ['./fraudprevented.component.css']
})

export class FraudpreventedComponent implements OnInit {
  myDpOptions: IAngularMyDpOptions = {
    dateRange: true,
    dateFormat: 'dd/mm/yyyy',
    alignSelectorRight: false,
    openSelectorTopOfInput: false,
    // other options are here...
  };
  myDateInit: Boolean = true;
  model: IMyDateModel = null;
  next: any;
  prev: any;
  color = 'primary';
  mode = 'indeterminate';
  values = 50;
  spinnerDiameter = 1;
  showSpinner = false;
  endDate: any;
  mydate: any;
  data: any;

  myurl: any;

  @ViewChild('LoginModal') LogiModal: TemplateRef<any>;
  clickState = 0;
  selectedcat: any = 'confirmed';
  transactionid: '';
  selected: any = '';
  select: any = '';
  tabledata = [];
  // data = mydata;
  selectedOption = false;
  result: any;
  pages = [];
  nextpage: any;
  previous: any;
  firstDate: any;
  secondDate: any;
  urldata: any;
  bsRangesValue = [];
  display = '';
  dawnloadurlurl = '';
  token = '';
  term;
  category: any;
  initialamt: any = 0;
  show: boolean;
  showBar: boolean;
  origin = '';
    // date
  bsValue = new Date();
  bsRangeValue: Date;
  maxDate = new Date();
  datePickerConfig: Partial<BsDatepickerConfig>;
  date: Date;
  constructor(
    private ngxService: NgxUiLoaderService,
    private modalService: NgbModal,
    private route: Router,
    private transservice: TransactionService,
    private toastr: ToastrService,
    private auth: AuthenticationService,
    private routers: ActivatedRoute,
    ) {this.token = localStorage.getItem('_cu'); }


  ngOnInit() {
       // date values
       this.maxDate.setDate(this.maxDate.getDate() + 7);
       this.bsRangesValue = [this.bsValue, this.maxDate];
       this.myurl = this.route.url;
       localStorage.setItem("url", this.myurl);
       this.datePickerConfig = Object.assign({},
          {containerClass: 'theme-dark-blue',
          showWeekNumbers: false});
    this.getfraudulenttransactiondata(1);
    // this.state();
  }

  // tslint:disable-next-line: use-life-cycle-interface
  ngAfterContentInit() {
    this.checktokexpiry();
  }

  profile(object) {
    this.transactionid = object.transactionid;
    if (this.transactionid === '') {
      return;
    }
    const navextras: NavigationExtras = {
      queryParams: {
        id: this.transactionid,
        origin: 'fraud'
      }
    };
    this.transactionid = object.transactionid;
    this.origin = object.origin;
    this.transservice.setdatasession(object);
    this.route.navigate(['Rac/Transactions/TransactionProfile'], navextras);
  }




  getfraudulenttransactiondata(page: number) {
    this.show = false;
    this.showSpinner = true;
    // this.checktokexpiry();
    this.pages.length = 0;
    this.tabledata.length = 0;
    this.transservice.getfraudtransactions(page).subscribe((datagot) => {
          this.result = datagot;
        },
        (err) => {
        },
        () => {
              this.show = false;
              this.previous = this.result.data.hasPrev;
              this.nextpage = this.result.data.hasNext;
              this.tabledata = this.result.data.itemsList;
              this.state();
              setTimeout(() => {
                this.showSpinner = false; // stop foreground spinner of the master loader with 'default' taskId
              }, 0);
              for (let i = 1; i <= this.result.data.totalPages; i++ ) {
                  if ( i > 1) {
                  // this.nextpage = i;
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
  // console.log(filtered);
  this.show = false;
  this.showSpinner = true;
  filtered.page = 1;
  Object.keys(filtered).forEach((key) => (filtered[key] == null || filtered[key] === '' && key !== 'amount'  ) && delete filtered[key]);
  this.transservice.filterTransactions(filtered)
    .subscribe(
      (data) => {
          this.result = data;
      }, (err) => {
        this.result = {status: false, msg: 'Network Error' };
      }, () => {
        this.showSpinner = true;
        // this.modalService.dismissAll();
        this.result.status ? this.ready() : this.ShowError() ;
        this.modalService.dismissAll();
      }
    );

}

 ready() {
  this.tabledata = [];
  this.showSpinner = true;
  this.show = false;
  this.previous = this.result.data.prevPage;
  this.nextpage = this.result.data.nextPage;
  this.tabledata = this.result.data.docs;
  setTimeout(() => {
    this.showSpinner = false;
  }, 0);
  for (let i = 1; i <= this.result.data.docs.totalPages; i++ ) {
       if ( i > 1) {
        // this.nextpage = i;
       } else {
        this.pages.push({page: i});
       }
  }

  if (!this.tabledata || !this.tabledata.length) {
    // this.toastr.error('No data found');
    this.show = true;

  } else {
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

  openBackDropCustomClass(content) {
    this.modalService.open(content, {backdropClass: 'light-blue-backdrop'});
  }

  onDateChanged(event: IMyDateModel) {
    this.firstDate = new Date().toLocaleDateString();
    this.secondDate =  new Date().toLocaleDateString();
    this.showSpinner = true;
    this.show = false;
    this.category = 'confirmed';
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
        if (this.result.data) {
          this.tabledata = this.result.data.docs;
          // this.toastr.info('Data filtered');
          // setTimeout(() => {
            this.showSpinner = false; // stop foreground spinner of the master loader with 'default' taskId
          // }, 0);
        }
        if (!Array.isArray(this.tabledata) || !this.tabledata.length) {
          this.show = true;
          // this.toastr.info('No data found');
        } else {
          this.show = false;
        }

            this.result.status ? this.success() : this.ShowError() ;
            this.modalService.dismissAll();
      });
  }

  success(): void {
    // this.toastr.info(this.result.msg);
    // this.dawnloadurlurl = baseurl + 'getExcelFile?filename=' + this.urldata.split('/')[1] + '&token=' + this.token;
    this.modalService.dismissAll();
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
    // this.toastr.error(this.result.msg);
  }

  download() {
    this.showBar = true;
    this.transservice.downfraudulent({startdate: this.firstDate, enddate: this.secondDate})
    .subscribe((resultdata) => {
      this.result = resultdata;

    }, (err) => {
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
          // this.result.status ? this.success2() : this.ShowError() ;
          // this.modalService.dismissAll();
    });

  }


  success2(): void {
    // this.toastr.info(this.result.msg);
    this.dawnloadurlurl = baseurl + 'getExcelFile?filename=' + this.urldata + '&token=' + this.token;
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
  
// state() {
//   if (this.clickState === 0) {
//      this.tabledata.sort(function(a, b) {
//       const c: any = new Date(a.createdAt);
//       const d: any = new Date(b.createdAt);
//       return d - c;
//       });
//   this.clickState = 1;
//   } else {
//        this.tabledata.sort(function(a, b) {
//        const c: any = new Date(a.createdAt);
//        const d: any = new Date(b.createdAt);
//        return c - d;
//        });
//     this.clickState = 0;
//   }
// }


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
