import { BureauService } from 'src/services/bureau.service';
import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import {IAngularMyDpOptions, IMyDateModel} from 'angular-mydatepicker';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/services';
import { bureaUrl } from 'src/services/config';

@Component({
  selector: 'app-fraud-manager',
  templateUrl: './fraud-manager.component.html',
  styleUrls: ['./fraud-manager.component.css']
})
export class FraudManagerComponent implements OnInit {
  @ViewChild('LoginModal') LogiModal: TemplateRef<any>;

  toDelete: any;
  transactions: any;
  resultdata: any;
  filteredData: any;
  myDpOptions: IAngularMyDpOptions = {
    dateRange: true,
    dateFormat: 'dd/mm/yyyy',
    alignSelectorRight: false,
    openSelectorTopOfInput: false,
    // other options are here...
  };
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

  constructor(
    private modalService: NgbModal,
    private route: Router,
    private bureauservice: BureauService,
    private toastr: ToastrService,
    private auth: AuthenticationService,
    ) { 

      this.token = localStorage.getItem('_cu');

    }

    modalReference = null;
    transactionid = '';
    select: any = '';
    result: any;
    selected: any;
    pages = [];
    nextpage: number;
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
    closeResult: string;

  ngOnInit() {
    this.fetchData(1);
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    // this.modalService.open(content, {backdropClass: 'light-blue-backdrop'});

  }
  getDismissReason(reason: any) {
    this.modalService.dismissAll();

  }


  opens(contents, id) {
    this.toDelete = id;
    this.modalService.open(contents, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

  }
  dismiss() {
    this.modalService.dismissAll();

  }

   // tslint:disable-next-line: use-life-cycle-interface
   ngAfterContentInit() {
    this.checktokexpiry();
  }

  fetchData(page: number) {
    this.show = false;
    this.showSpinner = true;
    this.bureauservice.getRecords(page)
      .subscribe (
        res => {
        this.transactions = res;
      }, err => {
        this.toastr.error(err);
    }, () => {
      this.showSpinner = true;
      // this.transactions.status ? this.successful() : this.displayError();
      this.show = false;
      this.previous = this.transactions.data.prevPage;
      this.nextpage = this.transactions.data.nextPage;
      this.resultdata = this.transactions.data.docs;
      this.showSpinner = false; // stop foreground spinner of the master loader with 'default' taskId
      for (let i = 1; i <= this.transactions.data.totalPages; i++ ) {
          if ( i > 1) {
          // this.nextpage = i;
          } else {

          this.pages = [];
          this.pages.push({page: i});
          }
        }
        if (!Array.isArray(this.resultdata) || !this.resultdata.length) {
        this.show = true;
      } else {
        this.show = false;
      }
    });
  }

  successful() {

    setTimeout(() => {
      this.showSpinner = false;
     }, 0);
    this.resultdata = this.transactions.data.docs;
  }

  displayError() {
    this.toastr.error('this.resultdata.mgs');
    setTimeout(() => {
      this.showSpinner = false;
     }, 0);
     this.show = true;
  }


  getnextransactiondata() {
    this.showSpinner = true;
    this.pages = [];
    this.nextpage = this.nextpage;
    this.pages.push({page: this.nextpage});
    this.bureauservice.getRecords(this.nextpage).subscribe((datagot) => {
        this.result = datagot;
      },
      (err) => {
      },
      () => {
        this.previous = this.result.data.hasPrev;
        this.nextpage = this.result.data.hasNext;
          this.resultdata = this.result.data.docs;
          setTimeout(() => {
            this.showSpinner = false;
           }, 0);
    });
  }


  done() {
    this.show = false;
    this.previous = this.result.data.hasPrevPage;
    this.nextpage = this.result.data.hasNextPage;
    this.resultdata = this.result.data.docs;
    // this.state();
    setTimeout(() => {
    this.showSpinner = false;
    }, 0);

    for (let i = 1; i <= this.result.data.totalPages; i++ ) {
        if ( i > 1) {
        } else {
          this.pages.push({page: i});
        }
    }
    if (!Array.isArray(this.resultdata) || !this.resultdata.length) {
        this.show = true;
    } else {
      this.show = false;
    }

  }

  ShowError(): void {
    if (this.result.msg === 'Service request failed') {
      this.toastr.error(this.result.error[0].val);
      this.show = false;
    } else {
      this.toastr.error(this.result.msg);
    }
  }


  previousmethod() {
    this.showSpinner = true;
    this.pages = [];
    this.pages.push({page: this.previous});
    this.bureauservice.getRecords(this.previous).subscribe((datagot) => {
          this.result = datagot;
        },
        (err) => {
        },
        () => {
          this.previous = this.result.data.hasPrevPage;
            this.nextpage = this.result.data.hasNextPage;
            this.resultdata = this.result.data.docs;
            setTimeout(() => {
              this.showSpinner = false;
            }, 0);
        });
  }

  onDateChanged(event: IMyDateModel) {
    this.firstDate = new Date().toLocaleDateString();
    this.secondDate =  new Date().toLocaleDateString();
    this.showSpinner = true;
    this.show = false;
    this.data = event.dateRange.formatted;
    this.mydate = this.data.split(' - ');
    if (this.mydate.length  < 2) {
      this.firstDate = new Date().toLocaleDateString();
      this.endDate = new Date();
      this.endDate.setDate(this.endDate.getDate() + 3);
      this.secondDate = this.endDate.toLocaleDateString();
    } else if (Array.isArray(this.mydate) || this.mydate.length) {
      this.firstDate = this.mydate[0];
      this.secondDate = this.mydate[1];
    }
    this.bureauservice.dateSearch({startdate:  this.firstDate, enddate: this.secondDate})
    .subscribe((res) => {
      this.result = res;
      this.resultdata = this.result.data.docs;
      this.showSpinner = false;

    }, err => {

    }, () => {
      if (this.resultdata === undefined || this.resultdata.length === 0) {
        // this.resultdata = this.result.data.docs;
      this.showSpinner = false;
      this.show = true;
      }
    });
}

  openBackDropCustomClass(content) {
    this.modalService.open(content, {backdropClass: 'light-blue-backdrop'});
  }

  profile(object) {
    this.route.navigate(['Rac/Recordprofile'], { queryParams: { id: object._id } });
  }


  postRecord() {
    this.route.navigate(['Rac/Postrecord']);
  }


  save(filtered) {
    Object.keys(filtered).forEach((key) => (filtered[key] == null || filtered[key] == '' && key !== 'amount'  ) && delete filtered[key]);

    this.showSpinner = true;
    this.show = false;

    this.bureauservice.tableSearch(filtered)
      .subscribe(
        (res) => {
            this.resultdata = res;
            this.modalService.dismissAll();
        }, (err) => {
          // this.result = {status: false, msg: 'Network Error' };
        }, () => {
          this.filteredData = this.resultdata.data.docs;
          this.resultdata = this.filteredData;
          this.showSpinner = false;
          if (this.resultdata === undefined || this.resultdata.length === 0) {
          this.showSpinner = false;
          this.show = true;
          }
        }
      );
   }

   download() {
    this.showBar = true;
    this.bureauservice.downloadexelsheet({startdate: this.firstDate, enddate: this.secondDate})
    .subscribe((res) => {
      this.result = res;
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
    this.dawnloadurlurl = bureaUrl + 'getExcelFile?filename=' + this.urldata + '&token=' + this.token;
    this.showBar = false;
    window.open(this.dawnloadurlurl);
  }

   numberWithCommas(x: any) {
    const calx = Math.abs(x);
    // tslint:disable-next-line: use-isnan
    if (calx) {
      const newx = Number(calx) === NaN ? calx : calx.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      return newx;
    } else {
      const anotherx = 0;
      return anotherx;
    }
   }

   removeRecord() {
    this.bureauservice.removeRecord(this.toDelete).subscribe(res =>{
      this.result = res;
      },
      (error) => {
        this.result = {status: false, msg: 'Network Problem'};
      },
      () => {
        this.modalService.dismissAll();
        this.toastr.error('Record Deleted');
        this.fetchData(1);
      });
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
