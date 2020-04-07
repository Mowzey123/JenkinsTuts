import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, AfterViewInit, ViewChild, TemplateRef, HostListener } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, RouteConfigLoadStart, RouteConfigLoadEnd, NavigationCancel } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { TranslationLoaderService } from './core/services/translation-loader.service';
import { SplashScreenService } from './core/services/splash-screen.service';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { BackdropService } from '../app/core/services/backdrop.service';
import { locale as enLang } from './config/i18n/en';
import { locale as ruLang } from './config/i18n/ru';
import { locale as frLang } from './config/i18n/fr';
import { SocketioService } from '../services/socketio.service';

declare let MetisMenu: any;
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, AfterViewInit {
  // @ViewChild('LoginModal') LogiModal: TemplateRef<any>;

  constructor(
        private router: Router,
        private loader: LoadingBarService,
        private _splashScreenService: SplashScreenService,
        private _translateService: TranslateService,
        private _translationLoaderService: TranslationLoaderService,
        private _backdropService: BackdropService,
        // private userIdle: UserIdleService,
        private modalService: NgbModal,
        private socketService: SocketioService

    ) {
        // Set translations
        this._translateService.addLangs(['en', 'ru', 'fr']);
        this._translationLoaderService.loadTranslations(enLang, ruLang, frLang);
        this._translateService.setDefaultLang('ru');
        this._translationLoaderService.setInitLang();
    }


    ngOnInit() {
        this.socketService.setupSocketConnection();
    //   this.loadcss();
    }


    ngAfterViewInit(): void  {
        this._splashScreenService.init();
    }

    loadcss(): void {
      this.router.events.subscribe(event => {
          if (event instanceof NavigationStart) {
              // set page progress bar loading to start on NavigationStart event router
              this.loader.start();
          }

          if (event instanceof RouteConfigLoadStart) {
              this.loader.increment(35);
          }
          if (event instanceof RouteConfigLoadEnd) {
              this.loader.increment(75);
          }

          if (event instanceof NavigationEnd || event instanceof NavigationCancel) {
              this._backdropService.hide();
              // set page progress bar loading to end on NavigationEnd event router
              this.loader.complete();
          }
      });
    }

}
