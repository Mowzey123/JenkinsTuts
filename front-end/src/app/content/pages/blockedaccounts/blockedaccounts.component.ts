import { BureauService } from 'src/services/bureau.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-blockedaccounts',
  templateUrl: './blockedaccounts.component.html',
  styleUrls: ['./blockedaccounts.component.css']
})
export class BlockedaccountsComponent implements OnInit {

  result: any;
  accounts: any;
  previous: any;
  nextpage: any;
  pages: any;

  constructor(
    private bureauservice: BureauService,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    this.getBlockedAccs(1);
  }

  // getBlockedAccs() {
  //   this.bureauservice.getBlockedAccs()
  //     .subscribe(res => {
  //       this.result = res;
  //       this.accounts = this.result.data.docs;
  //     });
  // }





  
  getBlockedAccs(page: number) {
    this.bureauservice.getBlockedAccs(page)
      .subscribe (
        res => {
          this.result = res;
      }, err => {
        this.toastr.error(err);
    }, () => {
      
      // this.showSpinner = true;
      // this.transactions.status ? this.successful() : this.displayError();
      // this.show = false;
      this.previous =  this.result.data.prevPage;
      this.nextpage =  this.result.data.nextPage;
      this.accounts = this.result.data.docs;
      
      // this.resultdata =  this.result.data.docs;
      // this.showSpinner = false; // stop foreground spinner of the master loader with 'default' taskId
      for (let i = 1; i <= this.result.data.totalPages; i++ ) {
          if ( i > 1) {
          // this.nextpage = i;
          } else {

          this.pages = [];
          this.pages.push({page: i});
          }
        }
        if (!Array.isArray(this.accounts) || !this.accounts.length) {
        // this.show = true;
      } else {
        // this.show = false;
      }
    });
  }

  successful() {

    setTimeout(() => {
      // this.showSpinner = false;
     }, 0);
    this.accounts = this.result.data.docs;
  }

  displayError() {
    this.toastr.error('this.resultdata.mgs');
    // setTimeout(() => {
    //   this.showSpinner = false;
    //  }, 0);
    //  this.show = true;
  }


  getnextransactiondata() {
    // this.showSpinner = true;
    this.pages = [];
    this.nextpage = this.nextpage;
    this.pages.push({page: this.nextpage});
    this.bureauservice.getBlockedAccs(this.nextpage).subscribe((datagot) => {
        this.result = datagot;
      },
      (err) => {
      },
      () => {
        this.previous = this.result.data.hasPrevPage;
        this.nextpage = this.result.data.hasNextPage;
        this.accounts = this.result.data.docs;
          // setTimeout(() => {
          //   this.showSpinner = false;
          //  }, 0);
    });
  }


  done() {
    // this.show = false;
    this.previous = this.result.data.hasPrev;
    this.nextpage = this.result.data.hasNext;
    this.accounts = this.result.data.docs;
    // this.state();
    // setTimeout(() => {
    // this.showSpinner = false;
    // }, 0);

    for (let i = 1; i <= this.result.data.totalPages; i++ ) {
        if ( i > 1) {
        } else {
          this.pages.push({page: i});
        }
    }
    // if (!Array.isArray(this.accounts) || !this.accounts.length) {
    //     this.show = true;
    // } else {
    //   this.show = false;
    // }

  }

  ShowError(): void {
    if (this.result.msg === 'Service request failed') {
      this.toastr.error(this.result.error[0].val);
      // this.show = false;
    } else {
      this.toastr.error(this.result.msg);
    }
  }


  previousmethod() {
    // this.showSpinner = true;
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
            this.accounts = this.result.data.docs;
            // setTimeout(() => {
            //   this.showSpinner = false;
            // }, 0);
        });
  }

}
