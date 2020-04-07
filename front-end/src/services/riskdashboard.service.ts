import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { baseurl, baseurl2, baseurl3 } from './config';

@Injectable({
  providedIn: 'root'
})
export class RiskdashboardService {

  constructor(
    private http: HttpClient
  ) { }

  confirmedFraud() {
    return this.http.post(baseurl3 + 'lastTenConfirmedFraud', '');
  }

  // bar graph
  barChartActivity() {
    return this.http.post(baseurl3 + 'lastSevenDaysTrend', '');
  }

  doughnutChartActivity() {
    return this.http.post(baseurl3 + 'lastSevenDaysActivity', '');
  }

}
