import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { BureauService } from 'src/services/bureau.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/services';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-search-profile',
  templateUrl: './search-profile.component.html',
  styleUrls: ['./search-profile.component.css']
})
export class SearchProfileComponent implements OnInit {
  @ViewChild('LoginModal') LogiModal: TemplateRef<any>;
  sum: Number; 
  data: any;
  confidencelevel: any;
  resultdata: any;
  constructor(
    private modalService: NgbModal,
    private bureauservice: BureauService,
    private toastr: ToastrService,
    public router: Router,
    private auth: AuthenticationService,

  ) {

  }

    ngOnInit() {
      this.bureauservice.currentdata
      .subscribe( res => {
        this.data = res;
        if (Object.entries(this.data).length > 1 ){
          this.resultdata = this.data.transactions;
        }
        this.sum = 0;
        if (Object.entries(this.data).length > 1 ) {
          this.resultdata = this.data.transactions;
        }

        if (this.resultdata !== undefined || this.resultdata.length !== 0) {
          for (let i = 0; i < this.resultdata.length; i++) {
            this.sum += this.resultdata[i].amount;
          }
      }

        this.confidencelevel = this.data.computations.sum;
      });
      if (Object.entries(this.data).length < 1 ) {
        this.router.navigate(['/Rac/Fraudsearch']);
      }
    }

    // tslint:disable-next-line: use-life-cycle-interface
   ngAfterContentInit() {
    this.checktokexpiry();
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
