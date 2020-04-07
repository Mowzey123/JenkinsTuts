import { Component, OnInit } from '@angular/core';
import { ThemeConfig } from 'src/app/config';
declare let Chart: any;

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  colors: any;

  public lineChart;
  public areaChart;
  public doughnutChart;
  public stackedBarChart;
  constructor() { }

  ngOnInit() {
    var colors = ThemeConfig.colors;
    var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var DAYS = ["Sunday", "Munday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var DAYS_S = ["S", "M", "T", "W", "T", "F", "S"];
    var color = Chart.helpers.color;

    /*
     * Line Chart Data
     */
    this.lineChart = {
        type: 'line',
        data: [
            {data: [30, 50, 35, 70, 58, 88, 70], label: 'Dataset'},
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

       /*
         * Doughnut Chart Data
         */
        this.doughnutChart = {
          type: 'doughnut',
          data: [57, 21],
          labels: ['In-Store Sales', 'Online Sales'],
          colors: [{ backgroundColor: [colors.primary, colors.danger] }],
          legend: false,
          options: {
              cutoutPercentage: 65,
          }
      };

  }

}
