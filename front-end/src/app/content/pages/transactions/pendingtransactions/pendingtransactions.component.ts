import { Component, OnInit,  AfterViewInit, ViewChild, TemplateRef } from '@angular/core';
import {Router, NavigationExtras} from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import {NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import { TransactionService } from '../../../../../services/transaction.service';
import { ToastrService } from 'ngx-toastr';
import { baseurl } from '../../../../../services/config';
import { AuthenticationService } from 'src/services';
import {BsDatepickerConfig} from 'ngx-bootstrap/datepicker';
import { IMyDateModel, IAngularMyDpOptions } from 'angular-mydatepicker';


@Component({
  selector: 'app-pendingtransactions',
  templateUrl: './pendingtransactions.component.html',
  styleUrls: ['./pendingtransactions.component.css']
})

export class PendingtransactionsComponent implements OnInit {
  myDpOptions: IAngularMyDpOptions = {
    dateRange: true,
    dateFormat: 'dd/mm/yyyy',
    alignSelectorRight: false,
    openSelectorTopOfInput: false,
    // other options are here...
  };
  origin = '';
  myDateInit: Boolean = true;
  model: IMyDateModel = null;
  selectedcat: any = 'onhold';
  selectedsub: any = 'mlapi';
  selectedsub1: any = 'rules';
  selectedsub2: any = 'blacklist';
  color = 'primary';
  mode = 'indeterminate';
  values = 50;
  spinnerDiameter = 1;
  showSpinner = false;
  show: boolean;
  show1: boolean;
  show2: boolean;
  selected: any = '';
  data: any;
  selectedOption = false;
  transaction: '';
  comment = '';
  endDate: any;
  mydate: any;
  mydata: any;
  @ViewChild('LoginModal') LogiModal: TemplateRef<any>;
  datatableElement: DataTableDirective;
  dtOptions: DataTables.Settings = {paging: false};
  tabledata = [];
  ruledata = [];
  arraydata = [];
  blacklistdata = [];
  // data = mydata;
  initialamt: any = 0;
  clickState: any = 0;
  result: any;
  pages = [];
  pagesblacklist = [];
  pagesrules = [];
  nextpage: any;
  previous: any;
  next: any;
  prev: any;
  algodata = [];
  nextpageruledata: any;
  previousruledata: any;
  previousblacklist: any;
  nextpageblacklist: any;
  urldata: any;
  display = '';
  dawnloadurlurl = '';
  token = '';
  term;
  transactionid: '';
  algocount: any;
  blacklistcount: any;
  rulescount: any;
  // date
  bsValue = new Date();
  bsRangeValue: Date;
  maxDate = new Date();
  datePickerConfig: Partial<BsDatepickerConfig>;
  date: Date;
  closeResult: string;
  firstDate: any;
  secondDate: any;
  searchres: any;



  constructor(
    private route: Router, private modalService: NgbModal ,
    private transservice: TransactionService,
    private toastr: ToastrService,
    private auth: AuthenticationService
    ) {this.token = localStorage.getItem('_cu'); }

  ngOnInit() {
        this.maxDate.setDate(this.maxDate.getDate() + 7);
        this.datePickerConfig = Object.assign({},
           {containerClass: 'theme-dark-blue',
           showWeekNumbers: false});
        this.getpendingtransactiondata(1);
        this.getBlackListedTransactions(1);
        this.getRulesListedTransactions(1);
        this.state();
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
    // this.checktokexpiry();
    const navextras: NavigationExtras = {
      queryParams: {
        id: this.transactionid,
        origin: 'notfraud'
      }
    };
    this.transactionid = object.transactionid;
    this.origin = object.origin;
    this.transservice.setdatasession(object);
    this.route.navigate(['Rac/Transactions/PendingProfile'], navextras);
  }
// Pending Transactions
  getpendingtransactiondata(page: number) {
    this.show1 = false;
    this.showSpinner = true;
    this.pages.length = 0;
    this.tabledata.length = 0;
    this.transservice.getpendingtransactions(page)
      .subscribe((datagot) => {
            this.result = datagot;
            this.algocount = this.result.data.itemCount;

          },
          (err) => {

          },
          () => {
              this.show1 = false;
              this.previous = this.result.data.hasPrev;
              this.nextpage = this.result.data.hasNext;
              this.algodata = this.result.data.itemsList;
              setTimeout(() => {
                this.showSpinner = false;
              }, 0);
              for (let i = 1; i <= this.result.data.pageCount; i++ ) {
                  if ( i > 1) {
                  } else {
                    this.pages.push({page: i});
                  }
              }
              if (!Array.isArray(this.algodata) || !this.algodata.length || this.algodata.length === 0) {
                this.show1 = true;
              } else {
                this.show1 = false;
              }
          });
  }

  getnextransactiondata() {
      // this.checktokexpiry();
    // swaps
      this.pages = [];
      this.algodata = [];
      this.next = this.result.data.next;
      this.pages.push({page: this.next});
      this.transservice.getpendingtransactions(this.next)
      .subscribe((datagot) => {
            this.result = datagot;
            this.previous = this.result.data.hasPrev;
            this.nextpage = this.result.data.hasNext;
          },
          (err) => {
          },
          () => {
            this.algodata = this.result.data.itemsList;
    });
  }

  previousmethod() {
      // this.checktokexpiry();
      this.pages = [];
      this.tabledata = [];
      this.prev = this.result.data.prev;
      this.pages.push({page: this.prev});
      this.transservice.getpendingtransactions(this.prev)
      .subscribe((datagot) => {
            this.result = datagot;
          },
          (err) => {
          },
          () => {
            this.previous = this.result.data.hasPrev;
            this.nextpage = this.result.data.hasNext;
            this.algodata  = this.result.data.itemsList;

          });
  }

  // rules Transactions
  getRulesListedTransactions(page: number) {
    this.show2 = false;
    this.showSpinner = true;
    this.pagesrules.length = 0;
    this.ruledata = [];
    this.transservice.getRulesListedTransactions(page)
      .subscribe((datagot) => {
            this.result = datagot;
            this.rulescount = this.result.data.itemCount;

          },
          (err) => {
          },
          () => {
              this.show2 = false;
              this.previousruledata = this.result.data.hasPrev;
              this.nextpageruledata = this.result.data.hasNext;
              this.ruledata = this.result.data.itemsList;
              setTimeout(() => {
                this.showSpinner = false;
              }, 0);
              for (let i = 1; i <= this.result.data.pageCount; i++ ) {
                  if ( i > 1) {
                  } else {
                    this.pagesrules.push({page: i});
                  }
              }
              if (!Array.isArray(this.ruledata) || !this.ruledata.length) {
                this.show2 = true;
              } else {
                this.show2 = false;
              }
          });
  }

  getnexruletransactiondata() {
    this.pagesrules = [];
    this.tabledata = [];
    this.next = this.result.data.next;
    this.pagesrules.push({page: this.next});
    this.transservice.getRulesListedTransactions(this.next)
    .subscribe((datagot) => {
          this.result = datagot;
        },
        (err) => {
        },
        () => {
          this.previousruledata = this.result.data.hasPrev;
          this.nextpageruledata = this.result.data.hasNext;
          this.ruledata = this.result.data.itemsList;
  });
  }

  previousrulemethod() {
      // this.checktokexpiry();
      this.pagesrules = [];
      this.tabledata = [];

      this.prev = this.result.data.prev;
      this.pagesrules.push({page: this.prev});

      this.transservice.getRulesListedTransactions(this.prev)
      .subscribe((datagot) => {
            this.result = datagot;
          },
          (err) => {
          },
          () => {
            this.previousruledata = this.result.data.hasPrev;
            this.nextpageruledata = this.result.data.hasNext;
            this.ruledata = this.result.data.itemsList;
          });
  }

  // blacklisted Transactions
  getBlackListedTransactions(page: number) {
    this.show = false;
    this.showSpinner = true;
    this.pagesblacklist.length = 0;
    this.tabledata.length = 0;
    
    this.transservice.getBlackListedTransactions(page)
      .subscribe((datagot) => {
            this.result = datagot;
            this.blacklistcount = this.result.data.itemCount;


          },
          (err) => {
          },
          () => {
              this.show = false;
              this.previousblacklist = this.result.data.hasPrev;
              this.nextpageblacklist = this.result.data.hasNext;
              this.blacklistdata = this.result.data.itemsList;

              setTimeout(() => {
                this.showSpinner = false;
              }, 0);
              for (let i = 1; i <= this.result.data.pageCount; i++ ) {
                  if ( i > 1) {
                  } else {
                    this.pagesblacklist.push({page: i});
                  }
              }
              if (!Array.isArray(this.blacklistdata) || !this.blacklistdata.length) {
                this.show = true;
              } else {
                this.show = false;
              }
          });
  }

  getnextBlacklistdata() {
    // this.checktokexpiry();
  // swaps
    this.pagesblacklist = [];
    this.tabledata = [];
    this.next = this.result.data.next;
    this.pagesblacklist.push({page: this.next});
    this.transservice.getRulesListedTransactions(this.next)
    .subscribe((datagot) => {
          this.result = datagot;
        },
        (err) => {
        },
        () => {
          this.previousblacklist = this.result.data.hasPrev;
          this.nextpageblacklist = this.result.data.hasNext;
          this.blacklistdata = this.result.data.itemsList;
  });
  }

  previousBlacklist() {
      // this.checktokexpiry();
      this.pagesblacklist = [];
      this.tabledata = [];
      this.prev = this.result.data.prev;
      this.pagesblacklist.push({page: this.prev});
      this.transservice.getRulesListedTransactions(this.prev)
      .subscribe((datagot) => {
            this.result = datagot;
          },
          (err) => {
          },
          () => {
            this.previousblacklist = this.result.data.hasPrev;
            this.nextpageblacklist = this.result.data.hasNext;
            this.blacklistdata = this.result.data.itemsList;
          });
  }

  openBackDropCustomClass(date) {
    this.modalService.open(date, {backdropClass: 'light-blue-backdrop'});
  }


  onDateChanged(event: IMyDateModel) {
    this.show1 = false;
    this.showSpinner = true;
    this.selectedcat = 'onhold';
    this.selectedsub = 'mlapi';
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
    this.transservice.downexelsheet(
      {
        startdate: this.firstDate,
        enddate: this.secondDate,
        category: this.selectedcat,
        subcategory: this.selectedsub
      })
      .subscribe((resultdata) => {
        this.result = resultdata;
      }, (err) => {
            this.result = {status: false, msg: 'Network Problem'};
            this.modalService.dismissAll();
      }, () => {
        this.urldata = this.result.data;
        this.result.status ? this.successfulAlgo() : this.ShowError() ;
        this.modalService.dismissAll();
      });
  }

  successfulAlgo(): void {
    // this.toastr.info(this.result.msg);
    this.algodata = this.result.data.itemsList;
    setTimeout(() => {
      this.showSpinner = false;
     }, 0);

     if (!Array.isArray(this.algodata) || !this.algodata.length || this.algodata.length === 0) {
      this.show1 = true;
    } else {
      this.show1 = false;
    }
  }

  download() {
    this.transservice.downloadpending({startdate: this.firstDate, enddate: this.secondDate})
    .subscribe((resultdata) => {
      this.result = resultdata;
    }, (err) => {
          this.modalService.dismissAll();
          this.result = {status: false, msg: 'Network Problem'};
    }, () => {
          this.urldata = this.result.data;
          this.result.status ? this.success2() : this.ShowError() ;
    });

  }


  success2(): void {
    // this.toastr.info(this.result.msg);
    this.dawnloadurlurl = baseurl + 'getExcelFile?filename=' + this.urldata + '&token=' + this.token;
    window.open(this.dawnloadurlurl);

  }

  onDateChanged2(event: IMyDateModel) {
    this.ruledata = [];
    this.selectedcat = 'onhold';
    this.selectedsub = 'rules';
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
    this.transservice.downexelsheet(
      {
        startdate: this.firstDate,
        enddate: this.secondDate,
        category: this.selectedcat,
        subcategory: this.selectedsub
      })
      .subscribe((resultdata) => {
        this.result = resultdata;
      }, (err) => {
            this.result = {status: false, msg: 'Network Problem'};
            this.modalService.dismissAll();
      }, () => {
        this.urldata = this.result.data;
        this.result.status ? this.success() : this.ShowError() ;
        this.modalService.dismissAll();
      });
  }


  success(): void {
    // this.toastr.info(this.result.msg);
    this.ruledata = this.result.data.itemsList;
    setTimeout(() => {
      this.showSpinner = false;
     }, 0);

     if (!Array.isArray(this.ruledata) || !this.ruledata.length || this.ruledata.length === 0) {
      this.show2 = true;
    } else {
      this.show2 = false;
    }
  }

  ShowError(): void {
    if (this.result.msg === 'Service request failed') {
        this.toastr.error(this.result.error[0].val);
      } else {
        this.toastr.error(this.result.msg);
      }
  }


  download1() {
    this.transservice.downloadpendingbyblacklist({startdate: this.firstDate, enddate: this.secondDate})
    .subscribe((resultdata) => {
      this.result = resultdata;
    }, (err) => {
          this.modalService.dismissAll();
          this.result = {status: false, msg: 'Network Problem'};
    }, () => {
          this.urldata = this.result.data;
          this.result.status ? this.success1() : this.ShowError1() ;
          // this.modalService.dismissAll();
    });

  }


  success1(): void {
    // this.toastr.info(this.result.msg);
    this.dawnloadurlurl = baseurl + 'getExcelFile?filename=' + this.urldata + '&token=' + this.token;
    window.open(this.dawnloadurlurl);
  }

  ShowError1(): void {
    if (this.result.msg === 'Service request failed') {
      this.toastr.error(this.result.error[0].val);
    } else {
      this.toastr.error(this.result.msg);
    }
    // this.toastr.error(this.result.msg);
  }


  onDateChanged1(event: IMyDateModel) {

    this.show = false;
    this.showSpinner = true;
    this.selectedcat = 'onhold';
    this.selectedsub = 'blacklist';
    // this.bsRangeValue = value;
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
    this.transservice.downexelsheet(
      {
        startdate: this.firstDate,
        enddate: this.secondDate,
        category: this.selectedcat,
        subcategory: this.selectedsub
      })
      .subscribe((resultdata) => {
        this.result = resultdata;
        this.blacklistdata = this.result.data.itemsList;
      }, (err) => {
            this.result = {status: false, msg: 'Network Problem'};
            this.modalService.dismissAll();
      }, () => {
        this.urldata = this.result.data;
       
        this.result.status ? this.successd() : this.ShowError3() ;
        this.modalService.dismissAll();
      });
  }


  successd(): void {
    this.blacklistdata = this.result.data.itemsList;

    setTimeout(() => {
      this.showSpinner = false;
     }, 0);

    if (!Array.isArray(this.blacklistdata) || !this.blacklistdata.length || this.blacklistdata.length === 0 ) {
      this.show = true;

    } else {
      this.show = false;
    }
  }

  ShowError3(): void {
    if (this.result.msg === 'Service request failed') {
      this.toastr.error(this.result.error[0].val);
    } else {
      this.toastr.error(this.result.msg);
    }
  }

  download3() {
    this.transservice.downloadpendingbyrules({startdate: this.firstDate, enddate: this.secondDate})
    .subscribe((resultdata) => {
      this.result = resultdata;

    }, (err) => {
          this.modalService.dismissAll();
          this.result = {status: false, msg: 'Network Problem'};
    }, () => {
          this.urldata = this.result.data;
          this.result.status ? this.success4() : this.ShowError4() ;
    });

  }


  success4(): void {
    // this.toastr.info(this.result.msg);
    this.dawnloadurlurl = baseurl + 'getExcelFile?filename=' + this.urldata + '&token=' + this.token;
    window.open(this.dawnloadurlurl);
  }

  ShowError4(): void {
    if (this.result.msg === 'Service request failed') {
      this.toastr.error(this.result.error[0].val);
    } else {
      this.toastr.error(this.result.msg);

    }
    // this.toastr.error(this.result.error[0].val);
  }

  // search filter

  save1(filtered1) {
    filtered1.page = 1;
    // tslint:disable-next-line: max-line-length
    Object.keys(filtered1).forEach((key) => (filtered1[key] == null || filtered1[key] === '' && key !== 'amount'  ) && delete filtered1[key]);
    this.transservice.filterTransactions(filtered1)
      .subscribe(
        (data) => {
            this.searchres = data;
        }, (err) => {
          this.result = {status: false, msg: 'Network Error' };
        }, () => {
          this.searchres.status ? this.ready1() : this.ShowError() ;
          this.modalService.dismissAll();
        }
      );

   }
   ready1() {
    this.show = false;
    this.previous = this.searchres.data.hasPrev;
    this.nextpage = this.searchres.data.hasNext;
    this.algodata = this.searchres.data.itemsList;


    for (let i = 1; i <= this.searchres.data.pageCount; i++ ) {
         if ( i <= 1) {
          this.pages.push({page: i});
         }
    }

    if (this.algodata.length === 0) {
      this.show = true;
    } else {
      this.show = false;
    }
    this.toastr.info('Transactions Filtered');
   }



  save2(filtered2) {
    filtered2.page = 1;
    // tslint:disable-next-line: max-line-length
    Object.keys(filtered2).forEach((key) => (filtered2[key] == null || filtered2[key] === '' && key !== 'amount'  ) && delete filtered2[key]);
    this.transservice.filterTransactions(filtered2)
      .subscribe(
        (data) => {
            this.searchres = data;
        }, (err) => {
          this.result = {status: false, msg: 'Network Error' };
        }, () => {
          this.searchres.status ? this.ready2() : this.ShowError() ;
          this.modalService.dismissAll();
        }
      );

   }
   ready2() {
    this.show = false;
    this.previous = this.searchres.data.hasPrev;
    this.nextpage = this.searchres.data.hasNext;
    this.blacklistdata = this.searchres.data.itemsList;
    for (let i = 1; i <= this.searchres.data.pageCount; i++ ) {
         if ( i <= 1) {
          this.pages.push({page: i});
         }
    }

    if (this.blacklistdata.length === 0) {
      this.show = true;
    } else {
      this.show = false;
    }
    this.toastr.info('Transactions Filtered');
   }

  // Method for getting filtered array
  save3(filtered3) {
    filtered3.page = 1;
    // tslint:disable-next-line: max-line-length
    Object.keys(filtered3).forEach((key) => (filtered3[key] == null || filtered3[key] === '' && key !== 'amount'  ) && delete filtered3[key]);
    this.transservice.filterTransactions(filtered3)
      .subscribe(
        (data) => {
            this.searchres = data;
        }, (err) => {
          this.result = {status: false, msg: 'Network Error' };
        }, () => {
          this.searchres.status ? this.ready3() : this.ShowError() ;
          this.modalService.dismissAll();
        }
      );

   }
   ready3() {
    this.show = false;
    this.previous = this.searchres.data.hasPrev;
    this.nextpage = this.searchres.data.hasNext;
    this.ruledata = this.searchres.data.itemsList;

    for (let i = 1; i <= this.searchres.data.pageCount; i++ ) {
         if ( i <= 1) {
          this.pages.push({page: i});
         }
    }

    if (this.ruledata.length === 0) {
      this.show = true;
    } else {
      this.show = false;
    }
    this.toastr.info('Transactions Filtered');
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

// end search filter

  approveModal(content) {
    this.modalService.open(content, {windowClass: 'dark-modal'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReasons2(reason)}`;
    });
  }

  private getDismissReasons2(reason: any) {
    this.modalService.dismissAll();
  }


  declineModal(decline) {
    this.modalService.open(decline, {windowClass: 'dark-modal'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReasons1(reason)}`;
    });
  }

  private getDismissReasons1(reason: any) {
    this.modalService.dismissAll();
  }


  delineTransaction() {
    this.tabledata = this.result.data.itemsList;
    this.transservice.declinetransaction({
      transactionid: this.tabledata[0].transactionid,
      comment : this.comment}).subscribe((data) => {

    }, (err) => {
      this.result = {status: false, msg: 'Network Error' };

    }, () => {
      this.toastr.info('Transaction Declined');
      this.modalService.dismissAll();
    });
  }

  approveTransaction() {
    this.tabledata = this.result.data.itemsList;
    this.transservice.approvetransaction({
      transactionid: this.tabledata[0].transactionid,
      comment : this.comment}).subscribe((data) => {

    });
    this.toastr.success('Transaction Approved');
    this.modalService.dismissAll();
  }


  checktokexpiry() {
    setTimeout(() => {
      if (this.auth.checkiftokenisabouttoexpire() === 'true') {
        const ngbModalOptions: NgbModalOptions = {
          backdrop : 'static',
          keyboard : false,
          // backdropClass: 'light-blue-backdrop'
        };
        this.modalService.open(this.LogiModal, ngbModalOptions);
      } else {}
    }, 0);
  }

  openDecline(updecline) {
    this.modalService.open(updecline, {backdropClass: 'light-blue-backdrop'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any) {
    this.modalService.dismissAll();
  }

  openApprove(upapprove) {
    this.modalService.open(upapprove, {backdropClass: 'light-blue-backdrop'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReasons(reason)}`;
    });
  }

  private getDismissReasons(reason: any) {
    this.modalService.dismissAll();
  }


  state() {
    if (this.clickState === 0) {
       this.algodata.sort(function(a, b) {
        const c: any = new Date(a.transactionData[0].createdAt);
        const d: any = new Date(b.transactionData[0].createdAt);
        return d - c;
        });
    this.clickState = 1;
    } else {
         this.algodata.sort(function(a, b) {
         const c: any = new Date(a.transactionData[0].createdAt);
         const d: any = new Date(b.transactionData[0].createdAt);
         return c - d;
         });
      this.clickState = 0;
    }
  }

  state1() {
    if (this.clickState === 0) {
       this.blacklistdata.sort(function(a, b) {
        const c: any = new Date(a.transactionData[0].createdAt);
        const d: any = new Date(b.transactionData[0].createdAt);
        return d - c;
        });
    this.clickState = 1;
    } else {
         this.blacklistdata.sort(function(a, b) {
         const c: any = new Date(a.transactionData[0].createdAt);
         const d: any = new Date(b.transactionData[0].createdAt);
         return c - d;
         });
      this.clickState = 0;
    }
  }

  state2() {
    if (this.clickState === 0) {
       this.blacklistdata.sort(function(a, b) {
        const c: any = new Date(a.transactionData[0].createdAt);
        const d: any = new Date(b.transactionData[0].createdAt);
        return d - c;
        });
    this.clickState = 1;
    } else {
         this.blacklistdata.sort(function(a, b) {
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
