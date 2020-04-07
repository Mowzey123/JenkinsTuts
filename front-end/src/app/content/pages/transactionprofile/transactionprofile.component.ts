import { Profiledata } from './../../../interfaces/profiledata';
import { TransactionService } from './../../../../services/transaction.service';
import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { AuthenticationService } from '../../../../services';
import { NgbModal, NgbModalOptions, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-transactionprofile',
  templateUrl: './transactionprofile.component.html',
  styleUrls: ['./transactionprofile.component.css']
})

export class TransactionprofileComponent implements OnInit {
  @ViewChild('LoginModal') LogiModal: TemplateRef<any>;
  profdata: Profiledata;
  url: any;
  transactionid   = '';
  origin   = '';
  data: any;
  logdata: any;
  status: boolean;
  testarrey = [];
  result2: any;
  result3: any;
  profiledata = [];
  SubscriptionId = '';
  comment: any = '';
  id: any;
  datacard = {Amount: 0, ProviderId: '', productid: '', TransactionStartTime: ''};
  closeResult: string;

  constructor(
               private route: ActivatedRoute,
               private transact: TransactionService,
               private toastr: ToastrService,
               private auth: AuthenticationService,
               private modalService: NgbModal,
               private router: Router,
               ) { }

  ngOnInit() {
        this.route.queryParams.subscribe(params => {
          this.transactionid = params.id;
          this.origin = params.origin;
        });
        this.gettransactionprofiles();
        this.gettransactionlogs();
        this.url = localStorage.getItem("url");

  }

    // tslint:disable-next-line: use-life-cycle-interface
    ngAfterContentInit() {
      this.checktokexpiry();
    }

  gettransactionprofiles() {
    this.transact.getTransactionProfile(this.transactionid, this.origin).subscribe((transactdata) => {
      this.result2 = transactdata;
      this.status = this.result2.data[0].finalstatus;
      this.data = this.result2.data[0].transactionData[0];

    }, () => {
    },
    () => {

      this.profdata = {
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

      this.profdata.acctno = this.result2.data[0].transactionData[0].account[0].userId;
      this.profdata.amount = this.result2.data[0].transactionData[0].amount;
      this.profdata.paymentmethod = this.result2.data[0].transactionData[0].paymentMethod[0].name;
      this.profdata.product = this.result2.data[0].transactionData[0].product[0].name;
      this.profdata.deviceid = this.result2.data[0].transactionData[0].device[0].deviceId;
      this.profdata.imei = this.result2.data[0].transactionData[0].device[0].imei;
      this.profdata.channelid = this.result2.data[0].transactionData[0].device[0].channelId;
      this.profdata.channelid = this.result2.data[0].transactionData[0].device[0].channelId;
      this.profdata.transactionid = this.result2.data[0].transactionid;
      this.profdata.finalstatus = this.result2.data[0].finalstatus;
      this.profdata.date = this.result2.data[0].transactionData[0].createdAt;
      this.profdata.creationDate = this.result2.data[0].transactionData[0].account[0].creationDate;
      this.profdata.blacklisted = this.result2.data[0].transactionData[0].blacklisted;
      this.profdata.rulesflag = this.result2.data[0].transactionData[0].rulesflag;
      this.profdata.fraudflag = this.result2.data[0].transactionData[0].fraudflag;
      this.profdata.listedunder = this.result2.data[0].transactionData[0].listedunder;
      this.profdata.fraudmessage = this.result2.data[0].transactionData[0].fraudmessage;
      this.profdata.rulesengineaction = this.result2.data[0].transactionData[0].rulesengineaction;

      // this.data = this.result2.data;
      // this.testarrey.push(this.data.transactiondata);


    });


  }

  gettransactionlogs() {
    this.transact.getTransactionLogs(this.transactionid).subscribe((transactdata) => {
      this.result3 = transactdata;
    }, () => {

    },
    () => {
      this.logdata = this.result3.data;
    });
  }

  reportfraud(status) {

    this.transact.reportfraudontransactiion({transactionid: this.transactionid, status: this.status, comment: this.comment})
    .subscribe((data) => {
      this.result2 = data;
    }, (err) => {
      this.result2 = {status: false, msg: 'Network Error' };

    }, () => {
      this.modalService.dismissAll();
      this.toastr.success('Status Updated');

      this.gettransactionprofiles();
      this.gettransactionlogs();
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


  openBackDropCustomClass(update) {
    this.modalService.open(update, {backdropClass: 'light-blue-backdrop'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any) {
    // if (reason === ModalDismissReasons.ESC) {
    //   return 'by pressing ESC';
    // } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    //   return 'by clicking on a backdrop';
    // } else {
    //   return  `with: ${reason}`;
    // }
    this.modalService.dismissAll();
  }


  // openBackDropCustomClass(update) {
  //   this.modalService.open(update, {backdropClass: 'light-blue-backdrop'});

  // }

  openBackDropCustomClass1(warning) {
    this.modalService.open(warning, {backdropClass: 'light-blue-backdrop'});
    // this.modalService.dismissAll();
  }

  openBackDropCustomClass3(warningupdate) {
    this.modalService.open(warningupdate, {backdropClass: 'light-blue-backdrop'});
    // this.modalService.dismissAll();
  }

  openBackDropCustomClass2(content) {
    this.modalService.open(content, {backdropClass: 'light-blue-backdrop'});
  }

  numberWithCommas(x: any) {
    // tslint:disable-next-line: use-isnan
    const calx = Math.abs(x);
    if (calx) {
      const newx = Number(calx) === NaN ? calx : calx.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      return newx;
    } else {
      const anotherx = 0;
      return anotherx;
    }
  }

}
