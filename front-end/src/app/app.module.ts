import { RiskdashboardService } from './../services/riskdashboard.service';
import { BureauService } from 'src/services/bureau.service';
import { ConfirmingemailComponent } from './content/confirming/confirming.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { AppRoutingModule } from './app-routing.module';
import {GettingStartedComponent} from '../app/content/pages/getting-started/getting-started.component';
import {LoginComponent} from './auth/login/login.component';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { SplashScreenService } from './core/services/splash-screen.service';
import { AppComponent } from './app.component';
import { BackdropComponent } from './core/components/backdrop/backdrop.component';
import { ThemeConfigService } from './core/services/theme-config.service';
import { SidebarModule } from './content/rac/components/sidebar/sidebar.module';
import { NavigationModule } from './content/rac/components/navigation/navigation.module';
import { FooterModule } from './content/rac/components/footer/footer.module';
import { HeaderModule } from './content/rac/components/header/header.module';
import { TransactionprofileComponent } from './content/pages/transactionprofile/transactionprofile.component';
import { UsersComponent } from './content/pages/settings/users/users.component';
import { SubheaderModule } from './content/rac/components/subheader/subheader.module';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { SummaryComponent } from './content/pages/summary/summary.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { DataTablesModule } from 'angular-datatables';
import { ProfileComponent } from './content/pages/settings/profile/profile.component';
import { ApiComponent } from './content/pages/settings/api/api.component';
import { BillingComponent } from './content/pages/settings/billing/billing.component';
import { PendingtransactionsComponent } from './content/pages/transactions/pendingtransactions/pendingtransactions.component';
import { BillingdetailsComponent } from './content/pages/settings/billing/billingdetails/billingdetails.component';
import { HomeComponent } from './auth/home/home.component';
import { FraudpreventedComponent } from './content/pages/transactions/fraudprevented/fraudprevented.component';
import { RulesengineComponent } from './content/pages/rulesengine/rulesengine.component';
import {NgbModule, NgbAlert, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { JwtModule } from '@auth0/angular-jwt';
import { LoadingComponent } from './content/loading/loading.component';
import { BlacklistaccountsComponent } from './content/pages/blacklist/blacklistaccounts/blacklistaccounts.component';
import { BlacklistcardsComponent } from './content/pages/blacklist/blacklistcards/blacklistcards.component';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BillingService } from '../services/billing.service';
import { SharedDataService } from '../services/shared-data.service';
import { BlacklistService } from '../services/blacklist.service';
import { JwtInterceptor } from '../@helpers';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {  AuthenticationService, TransactionService, ApiService, RulesService} from '../services';
import { AuthGuard } from '../@helpers';
import { InternationalPhoneNumberModule } from 'ngx-international-phone-number';
import { NotificationService } from '../services/notification.service';
import { SummaryService } from '../services/summary.service';
import { ResolvedtransactionsComponent } from './content/pages/transactions/resolvedtransactions/resolvedtransactions.component';
import { PendingprofileComponent } from './content/pages/transactions/pendingtransactions/pendingprofile/pendingprofile.component';
// tslint:disable-next-line:max-line-length
import { DevicesComponent } from './content/pages/blacklist/devices/devices.component';
import { RulesComponent } from './content/pages/rulesengine/rules/rules.component';
import { SetrulesComponent } from './content/pages/rulesengine/setrules/setrules.component';
import { AttributesComponent } from './content/pages/settings/attributes/attributes.component';
import { TimeformatterPipe } from './content/pages/rulesengine/setrules/timeformatter.pipe';
import { CurrencyformatterPipe } from './content/pages/summary/currencyformatter.pipe';
import { EditrulesComponent } from './content/pages/rulesengine/editrules/editrules.component';
import { PagenotfoundComponent } from './content/pages/pagenotfound/pagenotfound.component';
import { ModalComponent } from './content/pages/modal/modal.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { SuccessTransactionsComponent } from './content/pages/transactions/success-transactions/success-transactions.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { CardComponent } from './content/rac/components/card/card.component';
import { MatTableModule, MatTabsModule, MatProgressSpinnerModule, MatProgressBarModule, MatIcon, MatIconModule, MatBadgeModule, MatFormField, MatLabel, MatFormFieldModule, MatInputModule } from '@angular/material';
import { AlltransactionsComponent } from './content/pages/transactions/alltransactions/alltransactions.component';
import { MobilemoneyComponent } from './content/pages/blacklist/mobilemoney/mobilemoney.component';
import { APP_BASE_HREF } from '@angular/common';
import { AlertModule, BsDropdownModule } from 'ngx-bootstrap';
// import { MyDateRangePickerModule } from 'mydaterangepicker';
import { AngularMyDatePickerModule } from 'angular-mydatepicker';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { BureauDashboardComponent } from './content/pages/bureau-dashboard/bureau-dashboard.component';
import { FraudSearchComponent } from './content/pages/fraud-search/fraud-search.component';
import { FraudManagerComponent } from './content/pages/fraud-manager/fraud-manager.component';
import { RecordProfileComponent } from './content/pages/record-profile/record-profile.component';
import { PostRecordComponent } from './content/pages/post-record/post-record.component';
import { SearchProfileComponent } from './content/pages/search-profile/search-profile.component';
import { BureauApiComponent } from './content/pages/bureau-api/bureau-api.component';

import { ProductComponent } from './content/pages/product/product.component';
import { OverviewComponent } from './content/pages/billing/overview/overview.component';
import { BillsComponent } from './content/pages/billing/bills/bills.component';
import { PaymentsettingsComponent } from './content/pages/billing/paymentsettings/paymentsettings.component';
import { ReportsComponent } from './content/pages/billing/reports/reports.component';
import { TransactionreportsComponent } from './content/pages/transactions/transactionreports/transactionreports.component';
import { BlockedaccountsComponent } from './content/pages/blockedaccounts/blockedaccounts.component';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { socketUrl } from 'src/services/config';
import { CardtypeComponent } from './content/pages/billing/cardtype/cardtype.component';
import { SocketioService } from '../services/socketio.service';

// const config: SocketIoConfig = { url: 'https://3.133.132.16'};
const config: SocketIoConfig = { url: socketUrl};
// const config: SocketIoConfig = { url: `${socketUrl}`, options:{query:{token:localStorage.getItem('_cu')}}};


const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
};
export function tokenGetter() {
  return localStorage.getItem('access_token');
}
@NgModule({
  declarations: [
    AppComponent,
    BackdropComponent,
    ConfirmingemailComponent,
    LoginComponent,
    GettingStartedComponent,
    TransactionprofileComponent,
    UsersComponent,
    SummaryComponent,
    ProfileComponent,
    ApiComponent,
    BillingComponent,
    ResolvedtransactionsComponent,
    AlltransactionsComponent,
    PendingtransactionsComponent,
    BillingdetailsComponent,
    HomeComponent,
    PendingprofileComponent,
    FraudpreventedComponent,
    RulesengineComponent,
    BlacklistaccountsComponent,
    BlacklistcardsComponent,
    LoadingComponent,
    DevicesComponent,
    RulesComponent,
    SetrulesComponent,
    AttributesComponent,
    TimeformatterPipe,
    CurrencyformatterPipe,
    EditrulesComponent,
    ModalComponent,
    PagenotfoundComponent,
    SuccessTransactionsComponent,
    CardComponent,
    MobilemoneyComponent,
    ResetPasswordComponent,
    BureauDashboardComponent,
    FraudSearchComponent,
    FraudManagerComponent,
    RecordProfileComponent,
    PostRecordComponent,
    SearchProfileComponent,
    BureauApiComponent,
    ProductComponent,
    OverviewComponent,
    BillsComponent,
    PaymentsettingsComponent,
    ReportsComponent,
    TransactionreportsComponent,
    BlockedaccountsComponent,
    CardtypeComponent,
  ],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    SocketIoModule.forRoot(config),
    MatIconModule,
    NgbAlertModule,
    AngularMyDatePickerModule,
    BrowserModule,
    Ng2SearchPipeModule,
    NgbModule,
    RouterModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SidebarModule,
    SubheaderModule,
    ChartsModule,
    NavigationModule,
    PerfectScrollbarModule,
    HeaderModule,
    FooterModule,
    MatTableModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    NgxPaginationModule,
    InternationalPhoneNumberModule,
    NgxDatatableModule,
    DataTablesModule,
    MatBadgeModule,
    NgxMaskModule,
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
    ToastrModule.forRoot(),
    AlertModule.forRoot(),
    LoadingBarModule.forRoot(),
    TranslateModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter
      }
    }),

    BsDropdownModule.forRoot(),

  ],
  providers: [
    ThemeConfigService,
    SplashScreenService,
    { provide: PERFECT_SCROLLBAR_CONFIG, useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG},
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    JwtHelperService,
    ApiService,
    BlacklistService,
    SummaryService,
    BillingService,
    NotificationService,
    RulesService,
    AuthGuard,
    BureauService,
    SharedDataService,
    SocketioService,
    RiskdashboardService
  ],
  bootstrap: [AppComponent],
})

export class AppModule {
  constructor() {

 }
}
