import { ToastrService } from 'ngx-toastr';
import { TransactionService } from './../../../../../../services/transaction.service';
import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from './../../../../../../services';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Profiledata } from './../../../../../interfaces/profiledata';



@Component({
  selector: 'app-pendingprofile',
  templateUrl: './pendingprofile.component.html',
  styleUrls: ['./pendingprofile.component.css']
})
export class PendingprofileComponent implements OnInit {
  @ViewChild('LoginModal') LogiModal: TemplateRef<any>;
  
  profiledata: Profiledata;
  origin = '';
  data: any;
  logdata: any;
  transactionid: any = '';
  comment = '';
  result2: any;
  result3: any;
  testarrey: any;
  transervice: any;
  closeResult: string;
  transid: any;
  statusdata: any;


  constructor(
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private transact: TransactionService,
    private auth: AuthenticationService,
   ) { }

   ngOnInit() {
    // this.checktokexpiry();
    this.route.queryParams.subscribe(params => {
      this.transactionid = params.id;
      this.origin = params.origin;
    });
    this.gettransactionprofiles();
    this.gettransactionlogs();

}

  // tslint:disable-next-line: use-life-cycle-interface
  ngAfterContentInit() {
    this.checktokexpiry();
  }


gettransactionprofiles() {
this.checktokexpiry();
this.transact.getTransactionProfile(this.transactionid,this.origin ).subscribe((transactdata) => {
  this.result2 = transactdata;
  this.data = this.result2.data[0].transactionData[0];
  // console.log(this.result2);
}, () => {

},
() => {

  this.profiledata = {

    acctno: '',
    date: '',
    creationDate: '',
    amount: 0,
    paymentmethod: '',
    product: '',
    deviceid: '',
    imei: '',
    finalstatus: '',
    channelid: '',
    transactionid: '',
    blacklisted: true,
    rulesflag: '',
    listedunder: '',
    fraudflag: '',
    fraudmessage: '',
    rulesengineaction: ''

  };

  this.profiledata.acctno = this.result2.data[0].transactionData[0].account[0].userId;
  this.profiledata.amount = this.result2.data[0].transactionData[0].amount;
  this.profiledata.paymentmethod = this.result2.data[0].transactionData[0].paymentMethod[0].name;
  this.profiledata.product = this.result2.data[0].transactionData[0].product[0].name;
  this.profiledata.deviceid = this.result2.data[0].transactionData[0].device[0].deviceId;
  this.profiledata.imei = this.result2.data[0].transactionData[0].device[0].imei;
  this.profiledata.channelid = this.result2.data[0].transactionData[0].device[0].channelId;
  this.profiledata.channelid = this.result2.data[0].transactionData[0].device[0].channelId;
  this.profiledata.transactionid = this.result2.data[0].transactionid;
  this.profiledata.finalstatus = this.result2.data[0].finalstatus;
  this.profiledata.date = this.result2.data[0].transactionData[0].createdAt;
  this.profiledata.creationDate = this.result2.data[0].transactionData[0].account[0].creationDate;

  this.profiledata.blacklisted = this.result2.data[0].transactionData[0].blacklisted;
  this.profiledata.rulesflag = this.result2.data[0].transactionData[0].rulesflag;
  this.profiledata.fraudflag = this.result2.data[0].transactionData[0].fraudflag;
  this.profiledata.listedunder = this.result2.data[0].transactionData[0].listedunder;
  this.profiledata.fraudmessage = this.result2.data[0].transactionData[0].fraudmessage;
  this.profiledata.rulesengineaction = this.result2.data[0].transactionData[0].rulesengineaction;

});
}

gettransactionlogs() {
  this.checktokexpiry();
  this.transact.getTransactionLogs(this.transactionid).subscribe((transactdata) => {
    this.result3 = transactdata;
    // console.log(this.result3);
  }, () => {
  },
  () => {
    this.logdata = this.result3.data;
  });
}


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
    // if (reason === ModalDismissReasons.ESC) {
    //   return 'by pressing ESC';
    // } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    //   return 'by clicking on a backdrop';
    // } else {
    //   return  `with: ${reason}`;
    // }
    this.modalService.dismissAll();
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

  delineTransaction() {
    this.checktokexpiry();
    this.transact.declinetransaction({
      transactionid: this.profiledata.transactionid,
      comment : this.comment}).subscribe((data) => {
    });
    this.showsuccess();
  }

  approveTransaction() {
    this.checktokexpiry();
    this.transact.approvetransaction({
      transactionid: this.profiledata.transactionid,
      comment : this.comment}).subscribe((data) => {
    });
    this.modalService.dismissAll();
    this.toastr.success('Transaction Approved');
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


  showsuccess(): void {
    this.modalService.dismissAll();
    this.toastr.info('Transaction Declined');
  }

  openBackDropCustomClass2(logs) {
    this.modalService.open(logs, {backdropClass: 'light-blue-backdrop'});
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

