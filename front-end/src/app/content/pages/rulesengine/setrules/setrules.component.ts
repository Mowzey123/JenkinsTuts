import { RulesService } from '../../../../../services/rules.service';
import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from 'src/services';


@Component({
  selector: 'app-setrules',
  templateUrl: './setrules.component.html',
  styleUrls: ['./setrules.component.css']
})
export class SetrulesComponent implements OnInit {
  deleteId: any;
  color = 'primary';
  mode = 'indeterminate';
  values = 50;
  spinnerDiameter = 1;
  showSpinner = false;
  show = false;

  @ViewChild('LoginModal') LogiModal: TemplateRef<any>;
  result: any;
  list = [];
  days = [];
  months = [];
  weekday = [];
  alldays = [];
  newArray = [];
  myArray = [];
  specificdate: any;
  closeResult: string;

  constructor(
     private router: Router,
     private rules: RulesService,
     private toastr: ToastrService,
     private auth: AuthenticationService,
     private modalService: NgbModal) { }

  ngOnInit() {
    this.getUploadedRules();

  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  getDismissReason(reason: any) {
    throw new Error("Method not implemented.");
  }


  showDialog(notification) {
    this.modalService.open(notification, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }



  // tslint:disable-next-line: use-life-cycle-interface
  ngAfterContentInit() {
    this.checktokexpiry();
  }

  addRule() {
    this.router.navigate(['Rac/Rulesengine']);
  }

  getUploadedRules() {
    this.showSpinner = true;
    this.show = false;
    this.rules.fetchCreatedRulesmethod().subscribe((rulesdata) => {
        this.result = rulesdata;
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

  ourdays(x) {
    this.newArray  = x.map((item) => {
      if (item === 0) {
          return 'Sunday';
      } else if (item === 1) {
          return 'Monday';
      } else if (item === 2) {
        return 'Tuesday';
      } else if (item === 3) {
        return 'Wednesday';
      } else if (item === 4) {
        return 'Thurday';
      } else if (item === 5) {
        return 'Friday';
      } else if (item === 6) {
        return 'Saturday';
      }
  });

    return ' ' + ',' + ' ' + 'day' + ' ' + 'is' + ' ' + this.newArray + ' ' + 'and';
  }

  ourmonths(x) {
    this.myArray  = x.map((item) => {
      if (item === 1) {
          return 'January';
      } else if (item === 2) {
          return 'February';
      } else if (item === 3) {
        return 'March';
      } else if (item === 3) {
        return 'April';
      } else if (item === 5) {
        return 'May';
      } else if (item === 6) {
        return 'June';
      } else if (item === 7) {
        return 'July';
      } else if (item === 8) {
        return 'August';
      } else if (item === 9) {
        return 'September';
      } else if (item === 10) {
        return 'October';
      } else if (item === 11) {
        return 'November';
      } else if (item === 12) {
        return 'December';
      }
  });

    return  ' ' + 'month' + ' ' + 'is' + ' ' + this.myArray;

  }
  opens(contents, id) {
    this.deleteId = id;
    this.modalService.open(contents, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

  }

  deleterule() {
    this.rules.deleteRule(this.deleteId).subscribe((resultdelete) => {
      this.result = resultdelete;
    },
    (error) => {
      this.result = {status: false, msg: 'Network Problem'};
    },
    () => {
      this.modalService.dismissAll();
      this.toastr.success('Rule Deleted');
      // this.showDialog(notification);
      this.getUploadedRules();
    });
  }

  editrule(item) {
    this.rules.seteditsession(item);
    this.router.navigate(['/Rac/EditRules']);
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

  numberWithCommas(x: any) {
    // tslint:disable-next-line: use-isnan
    const newx = Number(x) === NaN ? x : x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return newx;
  }

  addspaces(x) {
    switch (x) {
      case 'isequalto':
        x = 'is equal to';
        break;
      case 'isnotequal':
        x = 'is not equal';
        break;
      case 'islessthan':
        x = 'is less than';
        break;
      case 'isgreaterthan':
        x = 'is greater than' ;
        break;
      case 'paymentMethod':
        x = 'Payment Method' ;
        break;
      case 'transactionId':
        x = 'Transaction Id' ;
        break;
      case 'transactionDate':
        x = 'Transaction Date' ;
        break;
      case 'deviceId':
        x = 'Device Id';
        break;
      case 'mobilemoney':
        x = 'Mobile Money';
        break;
      case 'transactionDate':
        x = 'Transaction Date';
        break;
      case 'userId':
        x = 'User Id';
        break;
      case 'bankcard':
        x = 'Bank Card';
        break;
      default:
        break;
    }
    return x;
  }

  dismiss() {
    this.modalService.dismissAll();

  }

}
