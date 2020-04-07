import { Component, OnInit, AfterViewInit, ViewChild, TemplateRef } from '@angular/core';
import {Router, NavigationExtras} from '@angular/router';
import {NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import {NgbDate, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import {BsDatepickerConfig} from 'ngx-bootstrap/datepicker';
import { SummaryService } from 'src/services/summary.service';
import { TransactionService, AuthenticationService } from 'src/services';
import { ThemeConfig } from 'src/app/config';
import {interval} from './../../../../../services/config';
import { count } from 'rxjs/operators';

declare let Chart: any;

@Component({
  selector: 'app-transactionreports',
  templateUrl: './transactionreports.component.html',
  styleUrls: ['./transactionreports.component.css']
})
export class TransactionreportsComponent implements OnInit {
  color = 'primary';
  mode = 'indeterminate';
  values = 50;
  spinnerDiameter = 1;
  showSpinner = false;
  show = false;
  @ViewChild('LoginModal') LogiModal: TemplateRef<any>;
  clickState: any = 0;
  colors: any;
  DAYS_S: any;
  public doughnutChart;
  public doughnutChart0;
  public doughnutChart1;
  public doughnutChart2;
  public doughnutChart3;
  public doughnutChart4;
  public barChart;
  public lineChart;
  public lineChart2;
  selected: any = '';
  data = [];
  alertsdatatiles = { onholdtoday: 0,  confirmedfraudtoday: 0,  resolvedtransactionstoday: 0, passed: 0};
  alertsdatatilestotal = { onholdtoday: 0,  confirmedfraudtoday: 0,  resolvedtransactionstoday: 0, passed: 0};
  hoveredDate: NgbDate;
  fromDate: NgbDate;
  toDate: NgbDate;
  currentdates: any;
  result: any;
  FraudTiles: any;
  totaltransactiontiles = [];
  MstRtlySuspectedFraud = [];
  FdVsSusted = [];
  FdVsTotal = [];
  result11: any;
  result1: any;
  result2: any;
  result3: any;
  result4: any;
  result5: any;
  result6: any;
  result7: any;
  confirmedtoday: any = 0;
  confirmedweek: any = 0;
  confirmedmonth: any = 0;
  confirmedyear: any = 0;
  count1: any = 0;
  count2: any = 0 ;
  count3: any = 0;
  count4: any = 0;
  datatotransvsfraud = [];
  pieChart1 = [];
  pieChart2 = [];
  pieaChart3 = [];
  pieChart4 = [];
  pieChart5: any = [0, 0, 0];
  totaltoday: any = 0;
  totalweek: any = 0;
  totalmonth: any = 0;
  totalyear: any = 0;
  counttoday: any = 0;
  counteweek: any = 0;
  countmonth: any = 0;
  countyear: any = 0;
  dataobject: any;
  result8: any;
  result9: any;
  result10: any;
  result13: any;
  sustoday: any;
  suscount1: any;
  susweek: any;
  suscount2: any;
  susmonth: any;
  suscount3: any;
  susyear: any;
  suscount4: any;
  calicarray = [];
  suspected =  { today: 0, week: 0, month: 0, year: 0};
  lastdata = { today: 0, week: 0, month: 0, year: 0 };
  chartdata2 = [0, 0, 0, 0, 0, 0];
  barChartdata = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  barChartdata2 = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  barChartdata3 = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  label = [];
  label2 = [];
  label6 = [];
  label7 = [];
  Months = [];
  transactionid: '';
  term;

  // Fraud Trends
  
  datafraud = [];
  dataonhold = [];
  datasuccessful = [];

  //summary Fraud trends
  onholdTrends: any;

  mobilemoney: any;
  wallet: any;
  bankcard: any;

    // date
    bsValue = new Date();
    bsRangeValue: Date;
    maxDate = new Date();
    datePickerConfig: Partial<BsDatepickerConfig>;
    date: Date;

    
    monthNames = ['January', 'February',
    'March', 'April', 'May', 'June',
    'July', 'August', 'September',
     'October', 'November', 'December'
    ];

  constructor(
    private route: Router,
    private modalService: NgbModal,
    private summeryservive: SummaryService,
    private transservice: TransactionService,
    private toast: ToastrService,
    private auth: AuthenticationService) { }

  ngOnInit() {
    // this.DAYS_S = ['00.00', '04:00', '08:00', '12:00', '04:00', '08:00', '00:00'];
    this.DAYS_S = ['00:00', '1:00am', '2:00am', '3:00am', '4:00am', '5:00am',
    '6:00am', '7:00am', '8:00am', '9:00am', '10:00am', '11:00am', '12:00', '1:00pm',
     '2:00pm', '3:00pm', '4:00pm', '5:00pm', '6:00pm', '7:00pm', '8:00pm', '9:00pm', '10:00pm', '11:00pm'],


     this.maxDate.setDate(this.maxDate.getDate() + 7);
     this.datePickerConfig = Object.assign({},
        {containerClass: 'theme-dark-blue',
        showWeekNumbers: false}
     );


    
    //  this.getSummarytilesdata();
     this.confirmedFraudTiles();
     this.suspiciousFraudTiles();
    //  this.getdatathisyear() ;

     this. MostRecentlySuspectedFraud();
     this.totalTransactionTiles();
     this.confirmedFraudByTime();
    //  this.transactionFraudTrends();
     this.Chartmethod();
     this.summaryFraudTrends();
    //  this.suspiciousFraudTrends();
     this.transactionFraudTrends();
     this.totalTransactionsVsFraudTransactions();
     this.OnholdbyMethod();
     this.confirmedFraudByPaymentMethod();
     this.confirmedFraudByProduct();
     this.onHoldByProduct();
     this.onHoldByMethod();
     this.Chartmethod();
  }

  // tslint:disable-next-line: use-life-cycle-interface
  ngAfterContentInit() {
    this.checktokexpiry();
  }



  MostRecentlySuspectedFraud() {
    this.summeryservive.MostRecentlySuspectedFraud().subscribe((totaltranstilesdata) => {
      this.result3 = totaltranstilesdata;
    },
    (error) => {
      this.result3 = {status: false, msg: 'Network Problem'};
    },
    () => {
      if (this.result3.msg !== 'No Transaction registered yet' && this.result3.data !== 0) {
              this.data = this.result3.data.slice(0, 9);
      }
    });
  }


// Transactions on hold by category
  OnholdbyMethod() {
    this.summeryservive.onholdbyMethod().subscribe((totaltranstilesdata) => {
      this.result4 = totaltranstilesdata;
    },
    (error) => {
      this.result4 = {status: false, msg: 'Network Problem'};
    },
    () => {
      if (this.result4.data.length !== 0 ) {
        // if ( Array.isArray(this.result4.data) || this.result4.data.length) {
        // tslint:disable-next-line: max-line-length
          const mlapi: any = ((this.result4.data[0].bymlapi) / (this.result4.data[0].bymlapi + this.result4.data[0].byblacklist + this.result4.data[0].byrulesengine)) * 100;
          // tslint:disable-next-line: max-line-length
          // tslint:disable-next-line: max-line-length
          const blacklist: any = ((this.result4.data[0].byblacklist) / (this.result4.data[0].bymlapi + this.result4.data[0].byblacklist + this.result4.data[0].byrulesengine)) * 100;
          // tslint:disable-next-line: max-line-length
          const rulesengine: any = ((this.result4.data[0].byrulesengine) / (this.result4.data[0].bymlapi + this.result4.data[0].byblacklist + this.result4.data[0].byrulesengine)) * 100;
          // const percentage2: any = (100 - percentage1);
          this.FdVsSusted[0] = Math.max(mlapi).toFixed(1) + '0';
          this.FdVsSusted[1] = Math.max(blacklist).toFixed(1) + '0';
          this.FdVsSusted[2] = Math.max(rulesengine).toFixed(1) + '0';
        // }

        this.Chartmethod();
      }
    });

  }

// Fraudulent transactions &  Successful transactions
  totalTransactionsVsFraudTransactions() {
    this.showSpinner = true;
    this.show = false;
    this.summeryservive.totalFraudVsSuccessful().subscribe((res) => {
      this.result5 = res;
    },
    (error) => {
      this.result5 = {status: false, msg: 'Network Problem'};
    },
    () => {
      if (this.result5.msg !== 'No Transaction registered yet') {
        if ( this.result5.data[0].fraudulenttransactions  && this.result5.data[0].fraudulenttransactions) {

          const percentage1: any = (this.result5.data[0].fraudulenttransactions / (this.result5.data[0].succesfultransactions)) * 100;
          const percentage2: any = (100 - percentage1);
          this.pieChart1[0] = Math.max(percentage1).toFixed(1) + '0';
          this.pieChart1[1] = Math.max(percentage2).toFixed(1) + '0';
            this.showSpinner = false;

        } else if (this.result5.data[0].fraudulenttransactions ) {
          this.pieChart1[0] = Math.max(100).toFixed(1) + '0';
          this.pieChart1[1] = Math.max(0).toFixed(1) + '0';
          this.showSpinner = false;

        } else if (this.result5.data[0].succesfultransactions) {
        this.pieChart1[0] = Math.max(0).toFixed(1) + '0';
        this.pieChart1[1] = Math.max(100).toFixed(1) + '0';
        this.showSpinner = false;
        } else {
          this.show = true;
        }
        this.Chartmethod();
      }
    });
  }

  confirmedFraudTiles() {
    this.summeryservive.confirmedFraudTiles().subscribe((res) => {
      this.result1 = res;
    },
    (error) => {
      this.result1 = {status: false, msg: 'Network Problem'};
    },
    () => {
      this.confirmedtoday = this.result1[0].todaytotal;
      this.count1  = this.result1[0].todaycount;
      this.confirmedweek = this.result1[0].weektotal;
      this.count2  = this.result1[0].weekcount;
      this.confirmedmonth = this.result1[0].monthtotal;
      this.count3  = this.result1[0].monthcount;
      this.confirmedyear = this.result1[0].yeartotal;
      this.count4  = this.result1[0].yearcount;
    });
  }

  suspiciousFraudTiles() {
    this.summeryservive.suspiciousFraudTiles().subscribe((res) => {
      this.result11 = res;
    },
    (error) => {
      this.result11 = {status: false, msg: 'Network Problem'};
    },
    () => {
      this.result11.forEach((key:any, index: number) => {
        this.sustoday = key.todaytotal;
        this.suscount1  = key.todaycount;
        this.susweek = key.weektotal;
        this.suscount2  = key.weekcount;
        this.susmonth = key.monthtotal;
        this.suscount3  = key.monthcount;
        this.susyear = key.yeartotal;
        this.suscount4  = key.yearcount;
      });
    });
  }

  totalTransactionTiles = () => {
    this.summeryservive.totalTransactionTiles().subscribe((totaltranstilesdata) => {
      this.result2 = totaltranstilesdata;
    },
    (error) => {
      this.result2 = {status: false, msg: 'Network Problem'};
    },
    () => {
      this.totaltoday = this.result2[0].todaytotal;
      this.counttoday = this.result2[0].todaycount;
      this.totalweek = this.result2[0].weektotal;
      this.counteweek = this.result2[0].weekcount;
      this.totalmonth = this.result2[0].monthtotal;
      this.countmonth = this.result2[0].monthcount;
      this.totalyear = this.result2[0].yeartotal;
      this.countyear = this.result2[0].yearcount;
      
    //   if (this.result2.msg !== 'No Transaction registered yet') {
    //     if ( this.result2.data.transactionstoday.length > 0 ) {
    //      this.totaltoday = this.result2.data.transactionstoday[0].total;
    //      this.counttoday = this.result2.data.transactionstoday[0].count;
    //    }

    //     if ( this.result2.data.weektransactions.length > 0) {
    //     this.totalweek = this.result2.data.weektransactions[0].total;
    //     this.counteweek = this.result2.data.weektransactions[0].count;

    //   }

    //     if ( this.result2.data.monthtransactions.length > 0 ) {
    //      this.totalmonth = this.result2.data.monthtransactions[0].total;
    //      this.countmonth = this.result2.data.monthtransactions[0].count;
    //   }
    //  }
    });
  }

  // Fraud charts
  confirmedFraudByPaymentMethod( ) {
    this.showSpinner = true;
    this.show = false;
     this.summeryservive.confirmedFraudByPaymentMethod().subscribe((databypayement) => {
       this.result6 = databypayement;
     }, ( ) => {

     }, () => {
      let sum = 0;
      if (this.result6.msg !== 'No Transaction registered yet') {
          if (this.result6.data.length > 1) {
            // tslint:disable-next-line:prefer-for-of
            for (let i = 0; i < this.result6.data.length; i++) {
              sum += this.result6.data[i].count;
            }

            // tslint:disable-next-line:prefer-for-of
            for (let i = 0; i < this.result6.data.length; i++) {
               const  percentage = (this.result6.data[i].count / sum) * 100;
               this.pieChart2.push(Math.max(percentage, 2.8).toFixed(1) + '0');
               setTimeout(() => {
                this.showSpinner = false;
               }, 2000);
               this.label2.push(this.result6.data[i]._id + ':' + ' ' + Math.max(percentage, 2.8).toFixed(1 ) + '%' );
               if (!Array.isArray(this.pieChart2) || !this.pieChart2.length) {
                this.show = true;
              } else {
                this.show = false;
              }
            }

          } else if (this.result6.data.length === 1) {
            this.pieChart2.push(100);
            this.label2.push(this.result6.data[0]._id);
            setTimeout(() => {
              this.showSpinner = false;
             }, 2000);
          } else {
            this.showSpinner = false;
            this.show = true;
          }
      } else {
        this.showSpinner = false;
        this.show = true;
      }
      this.Chartmethod();
      }
     );
  }

  confirmedFraudByProduct() {
    this.summeryservive.confirmedFraudByProduct().subscribe((productdata) => {
      this.result7 = productdata;
      this.showSpinner = true;
       }, (error) => {},
// tslint:disable-next-line: no-unused-expression
    () => {
      let sum = 0;

      if (this.result7.msg !== 'No Transaction registered yet') {
        if (this.result7.data.length > 0) {
          // tslint:disable-next-line:prefer-for-of
          for (let i = 0; i < this.result7.data.length; i++) {
            sum += this.result7.data[i].count;

          }

          // tslint:disable-next-line:prefer-for-of
          for (let i = 0; i < this.result7.data.length; i++) {
             const  percentage = (this.result7.data[i].count / sum) * 100;
             this.pieaChart3.push(Math.max(percentage, 2.8).toFixed(1) + '0');
             this.label.push(this.result7.data[i]._id + ':' + ' ' + Math.max(percentage, 2.8).toFixed(1 ) + '%' );
             setTimeout(() => {
              this.showSpinner = false;
             }, 0);
             if (!Array.isArray(this.pieaChart3) || !this.pieaChart3.length) {
              this.show = true;
            } else {
              this.show = false;
            }

          }

        } else if (this.result7.data.length ===  1) {
          this.pieaChart3.push(100);
          this.label.push(this.result7.data[0]._id);
          setTimeout(() => {
            this.showSpinner = false;
           }, 0);
        } else {
          this.showSpinner = false;
          this.show = true;
        }
      } else {
        this.showSpinner = false;
        this.show = true;
      }
      this.Chartmethod();
    });
  }


  // On Hold Charts
  onHoldByProduct(){
    let value;
    let arr;
    let sum = 0;
    let count;
    this.summeryservive.onHoldByProduct()
      .subscribe(res=>{
        value = res;
        arr = value.data;

        arr.forEach((val, index) => {
          sum += val.count
        });
        arr.forEach((val, index) => {
          count =  val.count;
          const perc = (count / sum) * 100;
          this.pieChart4.push(Math.max(perc, 2.8).toFixed(1) + '0');
          setTimeout(() => {
          this.showSpinner = false;
          }, 2000);
          this.label6.push(val._id + ':' + ' ' + Math.max(perc, 2.8).toFixed(1 ) + '%' );
          if (!Array.isArray(this.pieChart4) || !this.pieChart4.length) {
          this.show = true;
          } else {
            this.show = false;
          }
        });
      });
  }

  onHoldByMethod(){
    let value;
    let arr;
    let sum2 = 0;
    let count;
    this.summeryservive.onHoldByMethod()
      .subscribe(res=>{
        value = res;
        arr = value.data;

        arr.forEach((val, index) => {
          sum2 = val.mobilemoney + val.wallet + val.bankcard;
        });

        

        arr.forEach((val, index) => {
          count =  val.count;

          if (isNaN((val.mobilemoney / sum2) * 100) || (val.mobilemoney / sum2) * 100 == Infinity) {
            this.mobilemoney = 0;
  
          } else {
            this.mobilemoney = (val.mobilemoney / sum2) * 100;
          }

          
          if (isNaN((val.wallet / sum2) * 100) || (val.wallet / sum2) * 100 == Infinity) {
            this.wallet = 0;
  
          } else {
            this.wallet = (val.wallet / sum2) * 100;
          }

          if (isNaN((val.bankcard / sum2) * 100) || (val.bankcard / sum2) * 100 == Infinity) {
            this.bankcard = 0;
  
          } else {
            this.bankcard = (val.bankcard / sum2) * 100;
          }
          this.pieChart5[0] = this.mobilemoney;
          this.pieChart5[1] = this.wallet;
          this.pieChart5[2] = this.bankcard;
        });
      });
  }


  confirmedFraudByTime() {
    this.summeryservive.confirmedFraudByTime().subscribe((res) => {
       this.result8 = res;
    }, (error) => {
      this.result8 = {status: false, msg: 'Network Problem'};

    }, () => {
      if (this.result8.msg !== 'No Transaction registered yet') {
      // tslint:disable-next-line:prefer-for-of
      for ( let i = 0; i < this.result8.fraudbytime.length;  i++) {
        this.barChartdata[this.result8.fraudbytime[i]._id] = this.result8.fraudbytime[i].count;
      }
      for ( let i = 0; i < this.result8.suspectedbytime.length;  i++) {
        this.barChartdata2[this.result8.suspectedbytime[i]._id] = this.result8.suspectedbytime[i].count;
      }
      for ( let i = 0; i < this.result8.succesfulbytime.length;  i++) {
        this.barChartdata3[this.result8.succesfulbytime[i]._id] = this.result8.succesfulbytime[i].count;
      }
      this.Chartmethod();
    }
  });

  }

// Transaction Trends

  transactionFraudTrends() {
    this.summeryservive.transactionFraudTrends().subscribe((res) => {
      this.result9 = res;
    }, (error) => {
      this.result9 = {status: false, msg: 'Network Problem'};

    }, () => {
      
      let trends = this.result9.fraudtrends;

      const monthData = { January: 0, February: 0, March: 0, April: 0, May: 0, June: 0, July: 0, August: 0, September: 0, October: 0, November: 0, December: 0};
      const monthData2 = { January: 0, February: 0, March: 0, April: 0, May: 0, June: 0, July: 0, August: 0, September: 0, October: 0, November: 0, December: 0};
      const monthData3 = { January: 0, February: 0, March: 0, April: 0, May: 0, June: 0, July: 0, August: 0, September: 0, October: 0, November: 0, December: 0};



      
      trends.forEach((key: any, index: number) => {
        switch (key._id) {
          case 1:
            monthData.January = key.fraud;
            monthData3.January = key.succesful;
            monthData2.January = this.result9.onholdtrends[index].onhold
            break;
          case 2:
            monthData.February = key.fraud;
            monthData3.February = key.succesful;
            monthData2.February = this.result9.onholdtrends[index].onhold
            break;
          case 3:
            monthData.March = key.fraud;
            monthData3.March = key.succesful;
            monthData2.March = this.result9.onholdtrends[index].onhold
            break;
          case 4:
            monthData.April = key.fraud;    
            monthData3.April = key.succesful;
            monthData2.April = this.result9.onholdtrends[index].onhold
            break;
          case 5:
            monthData.May = key.fraud;
            monthData3.May = key.succesful;
            monthData2.May = this.result9.onholdtrends[index].onhold
            break;
          case 6:
            monthData.June = key.fraud;
            monthData3.June = key.succesful;
            monthData2.June = this.result9.onholdtrends[index].onhold

            break;
          case 7:
            monthData.July = key.fraud;
            monthData3.July = key.succesful;
            monthData2.July = this.result9.onholdtrends[index].onhold
          case 8:
            monthData.August = key.fraud;
            monthData3.August = key.succesful;
            monthData2.August = this.result9.onholdtrends[index].onhold
            break;
          case 9:
            monthData.September = key.fraud;
            monthData3.September = key.succesful;
            monthData2.September = this.result9.onholdtrends[index].onhold
            break;
          case 10:
            monthData.October = key.fraud;
            monthData3.October = key.succesful;
            monthData2.October = this.result9.onholdtrends[index].onhold
            break;    
          case 11:
            monthData.November = key.fraud; 
            monthData3.November = key.succesful;
            monthData2.November = this.result9.onholdtrends[index].onhold
            break;    
          case 12:
            monthData.December = key.fraud;
            monthData3.December = key.succesful;
            monthData2.December = this.result9.onholdtrends[index].onhold
            break;    
        }
      });

      const today = new Date();
      for (let i = 6; i > 0; i -= 1) {
          const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
          this.Months.push(this.monthNames[d.getMonth()]);
          this.datafraud.push(monthData[this.monthNames[d.getMonth()]]);
          this.datasuccessful.push(monthData3[this.monthNames[d.getMonth()]]);
          this.dataonhold.push(monthData2[this.monthNames[d.getMonth()]]);
      }
  });
  }


  summaryFraudTrends() {
    this.summeryservive.summaryFraudTrends()
      .subscribe(res =>{
        this.result10 = res
      } 
      ,
      error => {

      }, () => {

        let fraudPerc = this.result10.data;
        fraudPerc.forEach(key => {
          this.lastdata.today = !isNaN((key.totalFraudstoday/key.totaltransactionstoday) * 100)  ? (key.totalFraudstoday/key.totaltransactionstoday) * 100 : 0;
          this.lastdata.week = !isNaN((key.totalFraudsweek/key.totaltransactionsweek) * 100) ? (key.totalFraudsweek/key.totaltransactionsweek) * 100 : 0;
          this.lastdata.month = !isNaN((key.totalFraudsmonth/key.totaltransactionsmonth) * 100)  ? (key.totalFraudsmonth/key.totaltransactionsmonth) * 100 : 0;
          this.lastdata.year = !isNaN((key.totalFraudsyear/key.totaltransactionsyear) * 100)  ? (key.totalFraudsyear/key.totaltransactionsyear) * 100 : 0;
        });
    });

    this.summeryservive.summaryOnholdTrends()
      .subscribe(res =>{
        this.onholdTrends = res;
      },
      error => {

      },() => {
        let onholdPerc = this.onholdTrends.data;
        onholdPerc.forEach(key => {
          this.suspected.today = !isNaN((key.totalFraudstoday/key.totaltransactionstoday) * 100) ? (key.totalFraudstoday/key.totaltransactionstoday) * 100 : 0;
          this.suspected.week = !isNaN((key.totalFraudsweek/key.totaltransactionsweek) * 100) ? (key.totalFraudsweek/key.totaltransactionsweek) * 100 : 0;
          this.suspected.month = !isNaN((key.totalFraudsmonth/key.totaltransactionsmonth) * 100) ? (key.totalFraudsmonth/key.totaltransactionsmonth) * 100 : 0;
          this.suspected.year = !isNaN((key.totalFraudsyear/key.totaltransactionsyear) * 100) ? (key.totalFraudsyear/key.totaltransactionsyear) * 100 : 0;
        });
      });

  }





  openBackDropCustomClass(content) {
    this.modalService.open(content, {backdropClass: 'light-blue-backdrop'});
  }


  Chartmethod() {
    const colors = ThemeConfig.colors;
    const color = Chart.helpers.color;
    this.doughnutChart0 = {
      type: 'doughnut',
      // tslint:disable-next-line: max-line-length
      labels: ['Algorithm' + ':' + ' ' + `${this.FdVsSusted[0]}` + '%', 'Blacklist'+ ':' + ' ' + `${this.FdVsSusted[1]}` + '%', 'Rules engine' + ':' + ' ' + `${this.FdVsSusted[2]}` + '%',],
      colors: [{ backgroundColor: [colors.primary, colors.danger, colors.pink] }],
      legend: true,
      options: {
        maintainAspectRatio: false,
          responsive: true,
          legend: {
            position: 'right',
            align: 'end'
          },
          cutoutPercentage: 70
    }

    };

    this.doughnutChart = {
      type: 'doughnut',
      labels: ['Fraudulent' + ':' + ' ' + `${this.pieChart1[0]}` + '%', 'Successful Transactions'],
      colors: [{ backgroundColor: [colors.danger, colors.primary ] }],
      legend: true,
      options: {
        maintainAspectRatio: false,
        responsive: true,
        legend: {
          position: 'right',
          align: 'end'

        },
        cutoutPercentage: 70
    }
    };

    this.doughnutChart1 = {
      type: 'doughnut',
      data:  this.pieaChart3,
      labels:  this.label,
      colors: [{ backgroundColor: [colors.primary, colors.purple, colors.danger, colors.pink] }],
      legend: true,
      options: {
        maintainAspectRatio: false,
        responsive: true,
        legend: {
          position: 'right',
          align: 'start'
        },
        cutoutPercentage: 70

      }
    };

    this.doughnutChart2 = {
      type: 'doughnut',
      data: this.pieChart2,
      labels: this.label2,
      colors: [{ backgroundColor: [colors.primary, colors.purple, colors.danger] }],
      legend: true,
      options: {
        maintainAspectRatio: false,
        responsive: true,
        legend: {
          position: 'right',
          align: 'start'
        },
        cutoutPercentage: 70
      }
    };

    this.doughnutChart3 = {
      type: 'doughnut',
      data: this.pieChart4,
      labels: this.label6,
      colors: [{ backgroundColor: [colors.primary, colors.purple, colors.danger, colors.pink] }],
      legend: true,
      options: {
        maintainAspectRatio: false,
        responsive: true,
        legend: {
          position: 'right',
          align: 'start'
        },
        cutoutPercentage: 70
      }
    };

    this.doughnutChart4 = {
      type: 'doughnut',
      data: [this.pieChart5[0], this.pieChart5[1], this.pieChart5[2]],
      labels: ['Mobile money' + ':' + ' ' + `${this.pieChart5[0]}` + '%', 'Wallet'+ ':' + ' ' + `${this.pieChart5[1]}` + '%', 'Bank Card' + ':' + ' ' + `${this.pieChart5[2]}` + '%',],

      colors: [{ backgroundColor: [colors.primary, colors.pink, colors.danger] }],
      legend: true,
      options: {
        maintainAspectRatio: false,
        responsive: true,
        legend: {
          position: 'right',
          align: 'start'
        },
        cutoutPercentage: 70
      }
    };
    
    this.barChart = {
      type: 'bar',
      data: [
          // tslint:disable-next-line:max-line-length
          {data:  this.barChartdata, label: 'Fraudulent transactions'},
          // {data: [28, 48, 40, 19, 86, 27, 90, 30, 70], label: 'Time'}
      ],
      // tslint:disable-next-line:max-line-length
      labels: ['12:00am', '1:00am', '2:00am', '3:00am', '4:00am', '5:00am', '6:00am', '7:00am', '8:00am', '9:00am', '10:00am', '11:00am', '12:00', '1:00pm', '2:00pm', '3:00pm', '4:00pm', '5:00pm', '6:00pm', '7:00pm', '8:00pm', '9:00pm', '10:00pm', '11:00pm'],
      legend: true,
      colors: [
          {backgroundColor: colors.success},
          {backgroundColor: colors.success},
      ],
      options: {
          scaleShowVerticalLines: false,
          responsive: true,
          maintainAspectRatio: false,
      },
      chartClicked(e: any): void {
      },
      chartHovered(e: any): void {
      }
    };
        /*
         * Line Chart Data
         */
    this.lineChart = {
            type: 'line',
            data: [
                {data: this.datafraud, label: 'Fraudulent Transactions'},
                {data: this.dataonhold, label: 'On hold Transactions'},
                {data: this.datasuccessful, label: 'succesful Transactions'}
            ],
            labels: this.Months,
            legend: true,
            colors: [
              {
                borderColor: colors.danger,
                fill: false,
                borderWidth: 4,
                pointHitRadius: 30,
                pointBackgroundColor: '#fff',
                pointBorderColor: colors.danger,
                pointHoverBorderColor: '#fff',
                pointHoverBackgroundColor: colors.danger,
                pointRadius: 5,
                // lineTension: 0.1,
                pointBorderWidth: 2,
                pointHoverRadius: 6,
              },
              {
                  borderColor: colors.cyan,
                  fill: false,
                  borderWidth: 4,
                  pointHitRadius: 30,
                  pointBackgroundColor: '#fff',
                  pointBorderColor: colors.cyan,
                  pointHoverBorderColor: '#fff',
                  pointHoverBackgroundColor: colors.cyan,
                  pointRadius: 5,
                  // lineTension: 0.1,
                  pointBorderWidth: 2,
                  pointHoverRadius: 6,
              },
              {
                borderColor: colors.primary,
                fill: false,
                borderWidth: 4,
                pointHitRadius: 30,
                pointBackgroundColor: '#fff',
                pointBorderColor: colors.primary,
                pointHoverBorderColor: '#fff',
                pointHoverBackgroundColor: colors.primary,
                pointRadius: 5,
                // lineTension: 0.1,
                pointBorderWidth: 2,
                pointHoverRadius: 6,
            }
            ],
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                        }
                    }]
                },
            },
    };

    this.lineChart2 = {
      type: 'line',
      data: [
          {data: this.barChartdata, label: 'Fraudulent'},
          {data: this.barChartdata2, label: 'On Hold'},
          {data: this.barChartdata3, label: 'Successful'},
      ],
      labels: this.DAYS_S,
      legend: true,
      colors: [
          {
              borderColor: colors.danger,
              fill: false,
              borderWidth: 4,
              pointHitRadius: 30,
              pointBackgroundColor: '#fff',
              pointBorderColor: colors.danger,
              pointHoverBorderColor: '#fff',
              pointHoverBackgroundColor: colors.danger,
              pointRadius: 0,
              pointBorderWidth: 2,
              pointHoverRadius: 6,
          },
          {
              borderColor: colors.cyan,
              fill: false,
              borderWidth: 4,
              pointHitRadius: 30,
              pointBackgroundColor: '#fff',
              pointBorderColor: colors.cyan,
              pointRadius: 0,
              pointBorderWidth: 2,
              pointHoverRadius: 6,
          },
          {
            borderColor: colors.primary,
            fill: false,
            borderWidth: 4,
            pointHitRadius: 30,
            pointBackgroundColor: '#fff',
            pointBorderColor: colors.primary,
            pointRadius: 0,
            pointBorderWidth: 2,
            pointHoverRadius: 6,
        },
      ],
      options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero: true,
                  }
              }]
          },
      },
  };

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
  this.checktokexpiry();
  const navextras: NavigationExtras = {
    queryParams: {
      id: this.transactionid,
    }
  };
  this.transservice.setdatasession(object);
  this.route.navigate(['Rac/Transactions/PendingProfile'], navextras);
}


  numberWithCommas(x: any) {
    // tslint:disable-next-line: use-isnan
    if (x) {
      const newx = Number(x) === NaN ? x : x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      return newx;
    } else {
      const anotherx = 0;
      return anotherx;
    }
   }

}
