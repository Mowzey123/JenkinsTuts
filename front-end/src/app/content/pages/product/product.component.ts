import { SharedDataService } from './../../../../services/shared-data.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  result: any;
  prodresult: any;
  productslist: any;
  pages: any;
  nextpage: any;
  previous: any;

  constructor(
    private productservice: SharedDataService,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    this.getProducts(1);
  }

  add(value) {
    this.productservice.addProduct(value)
    .subscribe( res => {
      this.result = res;
    }, err => {
    }, () => {
      if (!this.result.status) {
        this.toastr.error(this.result.error[0].val);
      } else {
        this.toastr.success(this.result.msg);
        this.getProducts(1);
      }
    });
  }

  getProducts(page: number) {
    // this.productservice.getProduct(page)
    //   .subscribe(res => {
    //     this.prodresult = res;
    //     this.productslist = this.prodresult.data;
    //   });

      this.productservice.getProduct(page)
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
      this.productslist = this.result.data.docs;
      
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
        if (!Array.isArray(this.productslist) || !this.productslist.length) {
        // this.show = true;
      } else {
        // this.show = false;
      }
    });
  }

  getnextransactiondata() {
    // this.showSpinner = true;
    this.pages = [];
    this.nextpage = this.nextpage;
    this.pages.push({page: this.nextpage});
    this.productservice.getProduct(this.nextpage).subscribe((datagot) => {
        this.result = datagot;
      },
      (err) => {
      },
      () => {
        this.previous = this.result.data.hasPrev;
        this.nextpage = this.result.data.hasNext;
        this.productslist = this.result.data.docs;

       
          // setTimeout(() => {
          //   this.showSpinner = false;
          //  }, 0);
    });
  }


  done() {
    // this.show = false;
    this.previous = this.result.data.hasPrev;
    this.nextpage = this.result.data.hasNext;
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


  previousmethod() {
    // this.showSpinner = true;
    this.pages = [];
    this.pages.push({page: this.previous});
    this.productservice.getProduct(this.previous).subscribe((res) => {
          this.result = res;
        },
        (err) => {
        },
        () => {
          this.previous = this.result.data.hasPrev;
            this.nextpage = this.result.data.hasNext;
            this.productslist = this.result.data.docs;
            // setTimeout(() => {
            //   this.showSpinner = false;
            // }, 0);
        });
  }

  removeProduct(id) {
    this.productservice.deleteProduct(id).subscribe( res => {
      this.result = res;
    },
    (error) => {
      this.result = {status: false, msg: 'Network Problem'};
    },
    () => {
      this.toastr.error('Product Deleted');
      this.getProducts(1);
    });
  }

}
