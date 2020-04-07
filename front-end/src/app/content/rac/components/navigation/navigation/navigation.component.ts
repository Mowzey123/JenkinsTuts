import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/services';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  navigation: any = [];
  role: any = '';
  constructor(  private auth: AuthenticationService,
    ) {
    this.navigation = [
    {
      heading: true,
      title: 'VCMA MENU'
    },
    {
      title: 'Dashboard',
      url: './Bureaudashboard',
      icon: 'fa fa-list-ul'
    },
    {
      title: 'Your Records',
      url: './Fraudmanager',
      icon: 'fa fa-database',
    },
    {
      heading: true,
      title: 'ACCOUNT'
    },
    {
      title: 'Profile',
      url: 'Settings/Profile',
      icon: 'fa fa-user',
    },
    {
      title: 'Users',
      url: 'Settings/Users',
      icon: 'fa fa-users',
    },
  ];
}



  ngOnInit() {
  }

}
