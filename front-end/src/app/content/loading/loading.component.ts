import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {
  // msg = 'Loading ...';
  result: any;
  count = 0;
  constructor(private router: Router) {
   }

  ngOnInit() {
    this.donavigation();
  }

  donavigation() {
    setTimeout(() => {
        window.location.replace('/VMCA/Bureaudashboard');
        // this.router.navigate(['/VMCA/Bureaudashboard']);
    }, 0);
  }
}
