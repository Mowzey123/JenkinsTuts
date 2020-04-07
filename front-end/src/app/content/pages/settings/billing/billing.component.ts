import { Component, OnInit, ViewEncapsulation, ViewChild, TemplateRef } from '@angular/core';
import {NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';
import { TransactionService } from '../../../../../services/transaction.service';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../../../../../services';
@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css']
})

export class BillingComponent implements OnInit {
  @ViewChild('LoginModal') LogiModal: TemplateRef<any>;
  result: any;
  list: any;
  // tslint:disable-next-line:max-line-length
  constructor(
    private auth: AuthenticationService,
    private modalService: NgbModal,
    private toastr: ToastrService, private billservice: TransactionService, private route: Router) { }

  ngOnInit() {
    this.getbills();
  }

    // tslint:disable-next-line: use-life-cycle-interface
    ngAfterContentInit() {
      this.checktokexpiry();
    }

  openBackDropCustomClass(content) {
    this.modalService.open(content, {backdropClass: 'light-blue-backdrop'});
  }

  getbills() {
    const id = localStorage.getItem('_cu');
    this.billservice.getBillingDetails(id).subscribe((billsdata) => {
          this.result = billsdata;
      }, (err) => {
          this.result = {stauts: false, msg: 'Network Problem' };
      }, () => {
        this.list = this.result.data;
        // console.log(this.result);
         // this.result.stauts ? this.success() : this.ShowError() ;
      });
  }

  success(): void {
    this.toastr.success(this.result.msg);
  }

  ShowError(): void {
    this.toastr.success(this.result.msg);
  }
  details() {
    this.route.navigate(['./Rac/Settings/BillingDetails/666']);
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
