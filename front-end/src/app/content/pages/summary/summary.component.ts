import { RiskdashboardService } from './../../../../services/riskdashboard.service';
import { SummaryService } from './../../../../services/summary.service';
import { Component, OnInit, AfterViewInit, ViewChild, TemplateRef } from '@angular/core';
import { ThemeConfig } from '../../../../app/config';
import {Router, NavigationExtras} from '@angular/router';
import {NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import {NgbDate, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService, TransactionService } from './../../../../services';
import {BsDatepickerConfig} from 'ngx-bootstrap/datepicker';
import {interval} from './../../../../services/config';

declare let Chart: any;

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})

export class SummaryComponent implements OnInit {
  color = 'primary';
  mode = 'indeterminate';
  values = 50;
  onholdwidth: any;
  fraudwidth: any;
  successwidth: any;
  spinnerDiameter = 1;
  showSpinner = false;
  show = false;
  @ViewChild('LoginModal') LogiModal: TemplateRef<any>;
  clickState: any = 0;
  public doughnutChart;
  public stackedBarChart2;
  selected: any = '';
  days = [];
  // data = [];
  alertsdatatiles = { onholdtoday: 0,  confirmedfraudtoday: 0,  resolvedtransactionstoday: 0, passed: 0};
  alertsdatatilestotal = { onholdtoday: 0,  confirmedfraudtoday: 0,  resolvedtransactionstoday: 0, passed: 0};
  totaltransactiontiles = [];
  count1: any = 0;
  count2: any = 0 ;
  count3: any = 0;
  count4: any = 0;
  result: any;
  fraudres: any;
  succesfulres: any;
  onholdres: any;
  fraudData = [];
  label = [];
  label2 = [];
  Months = [];
  transactionid: '';
  pieChartData = [0, 0, 0];
  ChartData = [0, 0, 0, 0, 0, 0, 0];
  fraudulentData = [0, 0, 0, 0, 0, 0, 0];
  onholdData = [0, 0, 0, 0, 0, 0, 0];
  term;
  fraud: any;
  onhold: any;
  successfull: any;
  sum: any;
  public: any;
  latestfraud = [];
  getdays = [];
  passarr = [];
  fraudarr = [];
  onholdarr = [];
  origin = '';

  fraudalert  = 0;
  successalert = 0;
  onholdalert = 0;
  resolvedalert = 0;


    // date
    bsValue = new Date();
    bsRangeValue: Date;
    maxDate = new Date();
    datePickerConfig: Partial<BsDatepickerConfig>;
    date: Date;


  constructor(
    private riskdahboardservice: RiskdashboardService,
    private route: Router,
    private modalService: NgbModal,
    private summeryservive: SummaryService,
    private transservice: TransactionService,
    private toast: ToastrService,
    private auth: AuthenticationService) { }

  ngOnInit() {
    this.getDay();
    this.getRecentFraud();
    this.getSummarytilesdata();
    this.doughnutChartData();
    this.barChartData();
  }

  // tslint:disable-next-line: use-life-cycle-interface
  ngAfterContentInit() {
    this.checktokexpiry();
  }

  // startInterval() {
  //   setInterval(this.getSummarytilesdata, interval);
  // }


  getSummarytilesdata() {
    this.summeryservive.getMessages()
    .subscribe((res) => {
      this.result = res;


    // tslint:disable-next-line: no-unused-expression
    this.result.status === 'fraud' ? this.incrementFraud(this.result.count) : '';
    // tslint:disable-next-line: no-unused-expression
    this.result.status === 'succesfull' ? this.incrementSuccess(this.result.count) : '';
    // tslint:disable-next-line: no-unused-expression
    this.result.status === 'onhold'  ? this.incrementPending(this.result.count) : '';
    // tslint:disable-next-line: no-unused-expression
    this.result.status === 'resolved' ? this.incrementResolved(this.result.count) : '';

    });

      this.summeryservive.getSummarytilesdata().subscribe((tilesdata) => {
        this.result = tilesdata;
      },
      (error) => {
        this.result = {status: false, msg: 'Network Problem'};
      },
      () => {
        // tslint:disable-next-line:max-line-length
        if (this.result.msg !== 'No Transaction registered yet') {
            if (Array.isArray(this.result.data.onholdtoday)) {
              this.alertsdatatiles.onholdtoday = this.result.data.onholdtoday[0].count;
              this.alertsdatatilestotal.onholdtoday = this.result.data.onholdtoday[0].total;
            }
            if (Array.isArray(this.result.data.confirmedfraudtoday)) {
            this.alertsdatatiles.confirmedfraudtoday = this.result.data.confirmedfraudtoday[0].count;
            this.alertsdatatilestotal.confirmedfraudtoday = this.result.data.confirmedfraudtoday[0].total;
            }
            if (Array.isArray(this.result.data.resolvedtransactionstoday)) {
              this.alertsdatatiles.resolvedtransactionstoday = this.result.data.resolvedtransactionstoday[0].count;
              this.alertsdatatilestotal.resolvedtransactionstoday = this.result.data.resolvedtransactionstoday[0].total;
            }
            if (Array.isArray(this.result.data.passed)) {
              this.alertsdatatiles.passed = this.result.data.passed[0].count;
              this.alertsdatatilestotal.passed = this.result.data.passed[0].total;
            }
          }

      });

  }

  incrementSuccess(count:number){
    this.alertsdatatiles.passed += count;
  }

  incrementResolved(count: number){
    this.alertsdatatiles.resolvedtransactionstoday += count;
  }

  incrementFraud(count: number) {
    this.alertsdatatiles.confirmedfraudtoday += count;
  }

  incrementPending(count: number) {
    this.alertsdatatiles.onholdtoday += count;
  }


  // Recent Fraud Data

  getRecentFraud() {
    this.riskdahboardservice.confirmedFraud()
      .subscribe(res => {
        this.result = res;
        this.latestfraud = this.result.data;
                   
        // this.latestfraud.forEach((key)=>{
        //   this.amount =  Math.abs(key.transactiondata.amount.amount);
        // });
      });
  }


  doughnutChartData() {
    
    this.chartMethod();

    this.riskdahboardservice.doughnutChartActivity()
      .subscribe(res => {
        this.result =  res;
        this.fraud = this.result.data.fraud[0].count;
        this.onhold = this.result.data.onhold[0].count;
        this.successfull = this.result.data.succesfull[0].count;
        this.sum = this.fraud + this.onhold + this.successfull;

        if (isNaN(this.fraud / this.sum * 100) || (this.fraud / this.sum * 100) == Infinity) {
          this.fraudres = 0;

        } else {
          this.fraudres = (this.fraud / this.sum * 100);

        }

        if (isNaN(this.onhold / this.sum * 100) || (this.onhold / this.sum * 100) == Infinity) {
          this.onholdres = 0;

        } else {
          this.onholdres = (this.onhold / this.sum * 100);
        }
        
        if (isNaN(this.successfull / this.sum * 100) || (this.successfull / this.sum * 100) == Infinity) {
          this.succesfulres = 0;

        } else {
          this.succesfulres = (this.successfull / this.sum * 100);
        }

        this.progressBardata();
        this.pieChartData[0] = this.succesfulres;
        this.pieChartData[1] = this.onholdres;
        this.pieChartData[2] = this.fraudres;
        this.chartMethod();
      });

  }

  getDay() {
    const today = new Date();
    const newday = today.getDay() == 0 ? 7 : today.getDay();
    const weekdays = [1, 2, 3, 4 , 5, 6, 7];
    const sortedDays = [];
    const lastdays = [];


    for (let i = newday; i >= 1; i--) {
        sortedDays.push(i);
    }

  

    for (let i = sortedDays[0]; i < weekdays.length; i++) {
        lastdays.push(weekdays[i]);
    }

    // sorting nextArr
    const sortedlastdays = lastdays.sort();
    
    

    const finaldays = sortedDays.reverse();

    const sortedweekday = [...sortedlastdays, ...finaldays];

    

    const daysNo = { '1': 'MON', '2': 'TUE', '3': 'WED', '4': 'THUR', '5': 'FRI', '6': 'SAT', '7': 'SUN' };
    const apiObj = [{ _id: 1, count: 23 }, { _id: 4, count: 34 }, { _id: 3, count: 56 }];
    const obj = { MON: 0, TUE: 0, WED: 0, THUR: 0, FRI: 0, SAT: 0, SUN: 0 };



    // Days organised in string formart
    const arr = sortedweekday;
    this.getdays = arr.map(key => {
        return daysNo[`${key}`];
    });


    apiObj.forEach((key: any, index: number) => {
      switch (key._id) {
        case 2:
          obj.MON = key.count;
          break;
        case 3:
          obj.TUE = key.count;
          break;
        case 4:
           obj.WED = key.count;
          break;
        case 5:
          obj.THUR = key.count;
          break;
        case 6:
          obj.FRI = key.count;
          break;
        case 7:
          obj.SAT = key.count;
          break;
        case 1:
          obj.SUN = key.count;
      }

    });


    // const passarr = [];
    const passarr = this.getdays.map((key: any, index: any) => {
      return obj[`${key}`];
    });


    const countArr = this.getdays.map(key => {
      return obj[key];
    });

  }



  barChartData() {
    const obj = { MON: 0, TUE: 0, WED: 0, THUR: 0, FRI: 0, SAT: 0, SUN: 0 };
    const obj1 = { MON: 0, TUE: 0, WED: 0, THUR: 0, FRI: 0, SAT: 0, SUN: 0 };
    const obj2 = { MON: 0, TUE: 0, WED: 0, THUR: 0, FRI: 0, SAT: 0, SUN: 0 };

    this.chartMethod();

    this.riskdahboardservice.barChartActivity()
      .subscribe(res => {
        this.result =  res;
        const barData = this.result.data.successful;
        const onhold = this.result.data.onhold;
        const fraud = this.result.data.fraud;

      barData.forEach((key: any, index: number) => {
        switch (key._id) {
          case 2:
            obj.MON = key.count;
            break;
          case 3:
            obj.TUE = key.count;
            break;
          case 4:
            obj.WED = key.count;
            break;
          case 5:
            obj.THUR = key.count;
            break;
          case 6:
            obj.FRI = key.count;
            break;
          case 7:
            obj.SAT = key.count;
            break;
          case 1:
            obj.SUN = key.count;
        }
      });

      onhold.forEach((key: any, index: number) => {
        switch (key._id) {
          case 2:
            obj1.MON = key.count;
            break;
          case 3:
            obj1.TUE = key.count;
            break;
          case 4:
            obj1.WED = key.count;
            break;
          case 5:
            obj1.THUR = key.count;
            break;
          case 6:
            obj1.FRI = key.count;
            break;
          case 7:
            obj1.SAT = key.count;
            break;
          case 1:
            obj1.SUN = key.count;
        }
      });

      fraud.forEach((key: any, index: number) => {
        switch (key._id) {
          case 2:
            obj2.MON = key.count;
            break;
          case 3:
            obj2.TUE = key.count;
            break;
          case 4:
            obj2.WED = key.count;
            break;
          case 5:
            obj2.THUR = key.count;
            break;
          case 6:
            obj2.FRI = key.count;
            break;
          case 7:
            obj2.SAT = key.count;
            break;
          case 1:
            obj2.SUN = key.count;
        }
      });



    // const passarr = [];
    this.passarr = this.getdays.map((key: any, index: any) => {
      return obj[`${key}`];
    });

    this.onholdarr = this.getdays.map((key: any, index: any) => {
      return obj1[`${key}`];
    });

    this.fraudarr = this.getdays.map((key: any, index: any) => {
      return obj2[`${key}`];
    });

 
        this.chartMethod();
      });

  }




  chartMethod() {
    const colors = ThemeConfig.colors;
    const DAYS = ['Sunday', 'Munday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const DAYS_S = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    const color = Chart.helpers.color;



     this.stackedBarChart2 = {
      type: 'bar',
      data: [
          {
              // tslint:disable-next-line: max-line-length
              // data: [this.ChartData[0], this.ChartData[1], this.ChartData[2], this.ChartData[3], this.ChartData[4], this.ChartData[5], this.ChartData[6] ],
              data: this.passarr,
              label: 'Successful',
              stack: 'Stack 0'
          },
          {
              // tslint:disable-next-line: max-line-length
              // data: [this.onholdData[0], this.onholdData[1], this.onholdData[2], this.onholdData[3], this.onholdData[4], this.onholdData[5], this.onholdData[6]],
              data: this.onholdarr,
              label: 'On Hold',
              stack: 'Stack 0'
          },
          {
              // tslint:disable-next-line: max-line-length
              // data: [this.fraudData[0], this.fraudData[1], this.fraudData[2], this.fraudData[3], this.fraudData[4], this.fraudData[5], this.fraudData[6] ],
              data: this.fraudarr,
              label: 'Fraudulent',
              stack: 'Stack 0'
          },
      ],
      labels: this.getdays,
      options: {
          scaleShowVerticalLines: false,
          responsive: true,
          maintainAspectRatio: false,
      },
      colors: [
          {
              backgroundColor: colors.primary,
          },
          {
              backgroundColor: colors.danger,
          },
          {
              backgroundColor: colors.pink,
          },
      ],
      };


    this.doughnutChart = {
      type: 'doughnut',
      data: [this.pieChartData[0], this.pieChartData[1], this.pieChartData[2]],
      labels: ['Successful', 'On Hold', 'Fraudulent'],
      colors: [{ backgroundColor: [colors.primary, colors.danger, colors.pink] }],
      legend: true,
      options: {
          maintainAspectRatio: false,
          legend: {
            position: 'right',
            align: 'end'

          },
          cutoutPercentage: 70,
          layout: {
            padding: {
                left: 2,
            }
          }
      }
    };

  }




    progressBardata() {
      this.fraudwidth =  Math.round( this.fraudres * 10 ) / 10 + '%' ;
      this.onholdwidth =  Math.round( this.onholdres * 10 ) / 10 + '%' ;
      this.successwidth =  Math.round( this.succesfulres * 10 ) / 10 + '%' ;
    }

  // Date Toggle



  pendingTransactions() {
    this.route.navigate(['./Rac/Transactions/Pendingtransactions']);
  }

  confirmedFraud() {
    this.route.navigate(['./Rac/Transactions/Fraudprevented']);
  }

  resolvedTransactions() {
    this.route.navigate(['./Rac/Transactions/Resolvedtransactions']);
  }


  successfulTransactions() {
    this.route.navigate(['./Rac/Transactions/Successfultransactions']);
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



  profile(object) {
    this.transactionid = object.transactionid;
    if (this.transactionid === '') {
      return;
    }
    const navextras: NavigationExtras = {
      queryParams: {
        id: this.transactionid,
        origin: 'fraud'
      }
    };
    this.transactionid = object.transactionid;
    this.origin = object.origin;
    this.transservice.setdatasession(object);
    this.route.navigate(['Rac/Transactions/TransactionProfile'], navextras);
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
