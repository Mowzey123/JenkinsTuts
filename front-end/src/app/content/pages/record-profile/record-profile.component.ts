import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { BureauService } from 'src/services/bureau.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/services';

@Component({
  selector: 'app-record-profile',
  templateUrl: './record-profile.component.html',
  styleUrls: ['./record-profile.component.css']
})
export class RecordProfileComponent implements OnInit {
  @ViewChild('LoginModal') LogiModal: TemplateRef<any>;

  transactionid   = '';
  data: any;
  recdata: any;
  id: any;
  constructor(
    private bureauservice: BureauService,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private router: Router,
    private auth: AuthenticationService,
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.transactionid = params.id;
    });
    this.getrecordProfile();
  }
   // tslint:disable-next-line: use-life-cycle-interface
 ngAfterContentInit() {
  this.checktokexpiry();
}


  back() {
    // this.notification.setSessionfordata({});
    this.router.navigate(['Rac/Fraudmanager']);
  }

  getrecordProfile() {
    this.bureauservice.getTransactionProfile(this.transactionid)
      .subscribe(
        res => {
          this.data = res;
          this.recdata = this.data.recipient;
          this.data = this.data.data;
          this.id = this.data.transactionId;
        }
      );
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
