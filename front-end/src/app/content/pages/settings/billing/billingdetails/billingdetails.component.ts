import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { TransactionService} from '../../../../../../services/transaction.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from '../../../../../../services';
@Component({
  selector: 'app-billingdetails',
  templateUrl: './billingdetails.component.html',
  styleUrls: ['./billingdetails.component.css']
})
export class BillingdetailsComponent implements OnInit {
  @ViewChild('LoginModal') LogiModal: TemplateRef<any>;
  billingdetails = { companyname: '', address: '', city: '', state: '', zip: '', country: ''};
  cardetails = {cardno: '', exp: '', holdername: ''};
  countries = ['Uganda', 'Tanzania', 'Kenya', 'Rwanda', 'Burundi'];
  result: any;
  constructor(private cardservice: TransactionService,
              private toastr: ToastrService,
              private modalService: NgbModal,
              private auth: AuthenticationService) { }

  ngOnInit() {
    // this.checktokexpiry();
  }

  // tslint:disable-next-line: use-life-cycle-interface
  ngAfterContentInit() {
    this.checktokexpiry();
  }

  savecarddata() {
      this.checktokexpiry();
      this.cardservice.saveCard(this.cardetails).subscribe((data) => {
         this.result = data;
      },
      (err) => {
        this.result = {status: false, msg: 'Network Problem'};
      },
      () => {
        this.result.status ? this.successmethod() : this.ShowError() ;
    });
  }


  savecarddetails() {
      this.checktokexpiry();
      this.cardservice.saveBillingDetails(this.billingdetails).subscribe((data) => {
       this.result = data;
      },
      (err) => {
        this.result = {status: false, msg: 'Network Problem'};
      },
      () => {
        this.result.status ? this.successmethod() : this.ShowError() ;
    });
  }

  successmethod() {
    this.toastr.success(this.result.msg);
  }

  ShowError(): void {
    this.toastr.error(this.result.msg);
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
