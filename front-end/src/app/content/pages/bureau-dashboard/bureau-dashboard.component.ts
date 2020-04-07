import { BureauService } from 'src/services/bureau.service';
import { Component, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { ThemeConfig } from 'src/app/config';
import { Router } from '@angular/router';
declare let Chart: any;

@Component({
  selector: 'app-bureau-dashboard',
  templateUrl: './bureau-dashboard.component.html',
  styleUrls: ['./bureau-dashboard.component.css']
})
export class BureauDashboardComponent implements OnInit {
   colors: any;
   result: any;
   recordstoday: 0;
   totalrecords: 0;
   blockedaccs: 0;
   searchcount: 0;
   latestrecords: any;
   ChartData = [0, 0, 0, 0, 0, 0, 0 ];
   productFraud: any;
   paymentFraud: any;
   productFraudwidth: any;
   paymentFraudwidth: any;
   doughnutChartData = [0, 0];
   amount: any;
   productfraudperc: any;
   paymentfraudperc: any;


  public doughnutChart;
  public lineChart;

  public barChart;
  public chartActiveTimePeriod = 'this_week';
  public chartTimePeriodData: any;

  constructor(
      private bureauservice: BureauService,
      private route: Router,

  ) { }

  ngOnInit() {
    this.getRecordsToday();
    this.getTotalRecords();
    this.getBlockedsAccs();
    this.searchCount();
    this.latestTransactions();
    this.addedRecordsMonthlyTrend();
    this.getFraudTypeData();
  }

  getRecordsToday() {
    this.bureauservice.getRecordsToday()
      .subscribe(res => {
        this.result = res;
        this.recordstoday = this.result.count ? this.result.count : 0;
      });
  }

  getTotalRecords() {
      this.bureauservice.totalRecords()
        .subscribe( res => {
            this.result = res;
            this.totalrecords = this.result.count ? this.result.count : 0;
        });
  }

  getBlockedsAccs() {
    this.bureauservice.blockedAccs()
    .subscribe( res => {
        this.result = res;
        this.blockedaccs = this.result.count ? this.result.count: 0;
    });
  }

  profile(object) {
    this.route.navigate(['Rac/Recordprofile'], { queryParams: { id: object._id } });
  }

  searchCount() {
      this.bureauservice.searchCount()
      .subscribe(res => {
          this.result = res;
          this.searchcount = this.result.count ? this.result.count: 0;
      });
  }

  latestTransactions() {
        this.bureauservice.latestTransactions()
        .subscribe(res => {
            this.result = res;
            this.latestrecords = this.result.count;
        });
    }
    addedRecordsMonthlyTrend() {
        this.bureauservice.addedRecordsMonthlyTrend()
        .subscribe(res => {
            this.result = res;
            const barchartdata = this.result.data;
            barchartdata.forEach((key) => {
                this.ChartData[key._id - 1] = key.count;
              });
            // this.latestrecords = this.result.count;
        });
    }

    getFraudTypeData() {
        this.chartmethod();

        this.bureauservice.fraudTypeData()
            .subscribe(res => {
                this.result = res;
                const fraudTypedata = this.result.data;
                fraudTypedata.forEach(key => {
                   this.productFraud = key.productfraud;
                   this.paymentFraud = key.payment;
                });
                this.getpercentage();
                this.chartmethod();

            });

    }

    getpercentage() {
        const sum = this.productFraud + this.paymentFraud;

        if (isNaN(this.productFraud / sum * 100) || (this.productFraud / sum * 100) === Infinity) {
          this.productfraudperc = 0;


        } else {
          this.productfraudperc = (this.productFraud / sum * 100);

        }
        if (isNaN(this.paymentFraud / sum * 100) || (this.paymentFraud / sum * 100) === Infinity) {
          this.paymentfraudperc = 0;

        } else {
          this.paymentfraudperc = (this.paymentFraud / sum * 100);
        }

        this.doughnutChartData[0] = this.paymentfraudperc;
        this.doughnutChartData[1] = this.productfraudperc;
        this.paymentFraudwidth =  Math.round( this.paymentfraudperc * 10 ) / 10 + '%' ;
        this.productFraudwidth =  Math.round( this.productfraudperc * 10) / 10 + '%' ;
    }

    chartmethod() {
        const colors = ThemeConfig.colors;
        // var colors = ThemeConfig.colors;
        let MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        let MONTHS_S = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        let DAYS = ['Sunday', 'Munday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        let DAYS_S = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
        let DAYS_SS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        let color = Chart.helpers.color;


        this.doughnutChart = {
          type: 'doughnut',
          data: [this.doughnutChartData[0], this.doughnutChartData[1]],
          labels: ['Payment Fraud', 'Product Fraud'],
          colors: [{ backgroundColor: [colors.primary, colors.danger] }],
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

          /*
             * Line Chart Data
             */
            this.lineChart = {
              type: 'line',
              data: [
                  // tslint:disable-next-line: max-line-length
                  {data: [this.ChartData[0], this.ChartData[1], this.ChartData[2], this.ChartData[3], this.ChartData[4], this.ChartData[5], this.ChartData[6]], label: 'Records'},
              ],
              labels: DAYS_S,
              legend: true,
              colors: [
                  {
                      borderColor: colors.primary,
                      backgroundColor: color(colors.primary).alpha(0.5).rgbString(),
                      fill: false,
                      borderWidth: 4,
                      pointHitRadius: 30,
                      pointBackgroundColor: '#fff',
                      pointBorderColor: colors.primary,
                      pointHoverBorderColor: '#fff',
                      pointHoverBackgroundColor: colors.primary,
                      pointRadius: 5,
                      pointBorderWidth: 2,
                      pointHoverRadius: 7,
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

    blockedAccounts() {
      this.route.navigate(['./Rac/Blockedaccounts']);
    }

    totalRecords() {
      this.route.navigate(['./Rac/Fraudmanager']);
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
}
