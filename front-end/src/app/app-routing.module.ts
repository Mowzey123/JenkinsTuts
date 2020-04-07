import { FraudManagerComponent } from './content/pages/fraud-manager/fraud-manager.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginComponent} from './auth/login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { RacComponent } from './content/rac/rac.component';
import { RacModule } from './content/rac/rac.module';
import { UsersComponent } from './content/pages/settings/users/users.component';
import { ProfileComponent } from './content/pages/settings/profile/profile.component';
import { HomeComponent } from './auth/home/home.component';
import { LoadingComponent } from './content/loading/loading.component';
import { AuthGuard } from '../@helpers';
import { ConfirmingemailComponent } from './content/confirming/confirming.component';

// tslint:disable-next-line:max-line-length
import { PagenotfoundComponent } from './content/pages/pagenotfound/pagenotfound.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { BureauDashboardComponent } from './content/pages/bureau-dashboard/bureau-dashboard.component';




const routes: Routes = [
    {path: 'loading', component: LoadingComponent},
    {path: 'home', component: HomeComponent},
    {path: '', component: LoginComponent},
    {path: 'Logout', component: LoginComponent},
    {path: 'PageNotFound', component: PagenotfoundComponent},
    {path: 'ConfirmingEmail/:token/:role', component: ConfirmingemailComponent},
    {path: 'ressetPassword/:token', component: ResetPasswordComponent},
    {path: 'VMCA', component: RacComponent, canActivate: [AuthGuard], children: [
      {
        path: 'Bureaudashboard',
        component: BureauDashboardComponent
      },
      {
        path: 'Fraudmanager',
        component: FraudManagerComponent,
      },
      {path: 'Settings', children: [
        {path: 'Profile', component: ProfileComponent},
        {path: 'Users', component: UsersComponent}
      ]},
      ]},
    { path: '**', redirectTo: 'PageNotFound' }
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    RacModule,
  ],
  declarations: [],
  exports: [],
})
export class AppRoutingModule { }
