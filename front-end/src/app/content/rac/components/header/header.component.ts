import { AuthenticationService, UserService } from '../../../../../services';
import { Component, OnInit, AfterViewInit, OnDestroy} from '@angular/core';
import { Subject } from 'rxjs';
import {Router} from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { TranslationLoaderService } from '../../../../../app/core/services/translation-loader.service';
import { ComponenRegistryService } from '../../../../../app/core/services/component-registry.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { SummaryService } from 'src/services/summary.service';


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent



implements OnInit, AfterViewInit, OnDestroy {

  sideBar: any;
  quickSidebar: any;
   test: any = '';
  // tslint:disable-next-line:variable-name
  private _unsubscribeAll: Subject<any>;
  email: any;
  firstname: any;
  lastname: any;
  loginForm: any;
  result: any;
  public data = { email: '', password: ''};
  companyname: any;


  constructor(
        public route: Router,
        // tslint:disable-next-line:variable-name
        // tslint:disable-next-line:variable-name
        public _translationLoaderService: TranslationLoaderService,
        // tslint:disable-next-line:variable-name
        private _componenRegistryService: ComponenRegistryService,
        private authservice: AuthenticationService,
        private userservice: UserService,
        private  auth: AuthenticationService,
        private summeryservive: SummaryService

    ) {
        this._unsubscribeAll = new Subject();
    }

    ngOnInit() {
      const token = this.auth.getAuthToken();
      const helper = new JwtHelperService();
      const decodedToken = helper.decodeToken(token);
      this.email = decodedToken.email;
      this.firstname = decodedToken.firstname;
      this.lastname = decodedToken.lastname;
      this.companyname = decodedToken.companyname;
      this._componenRegistryService.onRegistryChanged
              .pipe(takeUntil(this._unsubscribeAll))
              .subscribe(registry => {
                  this.sideBar = this._componenRegistryService.getComponent('sidenav');
                  this.quickSidebar = this._componenRegistryService.getComponent('quick-sidebar');
            });
      // this.triggerClick();
      this.getSummarytilesdata();    }


    getSummarytilesdata() {
        this.summeryservive.transactionFraudTrends().subscribe((tilesdata) => {
          this.result = tilesdata;
        },
        (error) => {
          this.result = {status: false, msg: 'Network Problem'};
        },
        () => {
          this.test = this.result.msg;
        });
    }

    ngAfterViewInit() {}


  toggleSidebar(event): void {
      event.preventDefault();
      this.sideBar.sidebarToggleHandler();
  }

  toggleQuickSidebar(event): void {
      event.preventDefault();
      this.quickSidebar.toggleOpen();
  }

  setLanguage(lang): void {
      this._translationLoaderService.setLanguage(lang);
  }

  ngOnDestroy(): void {
      // Unsubscribe from all subscriptions
      this._unsubscribeAll.next();
      this._unsubscribeAll.complete();
  }

  logout() {
      this.authservice.logout();
  }

  userSettings() {
    this.authservice.logout();
    this.route.navigate(['Rac/User-Settings']);
  }

  triggerClick() {
      const element: HTMLElement = document.getElementById('sidebar-toggler') as HTMLElement;
      element.click();
  }
}
