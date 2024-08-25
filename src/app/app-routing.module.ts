import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeLayoutComponent } from './home-layout/home-layout.component';
import { SignupComponent } from './signup/signup.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { authGuard } from './shared/services/auth.guard';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  {
    path: '',
    component: HomeLayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'sif', loadChildren: () => import('./modules/salary-info-file/salary-info-file.module').then(m => m.SalaryInfoFileModule), canActivate: [authGuard] },
      { path: 'pif', loadChildren: () => import('./modules/personal-information-file/personal-information-file.module').then(m => m.PersonalInformationFileModule), canActivate: [authGuard] },
      { path: 'prf', loadChildren: () => import('./modules/personal-relationship-file/personal-relationship-file.module').then(m => m.PersonalRelationshipFileModule), canActivate: [authGuard] },
      { path: 'dif', loadChildren: () => import('./modules/department-information-file/deparment-file.module').then(m => m.DeparmentFileModule), canActivate: [authGuard] },
      { path: 'ack-nck', loadChildren: () => import('./modules/ack-nck/ack-nck.module').then(m => m.AckNckModule), canActivate: [authGuard] },
      { path: 'dcr', loadChildren: () => import('./modules/dcr/dcr.module').then(m => m.DcrModule), canActivate: [authGuard] },
      { path: 'rfr', loadChildren: () => import('./modules/request-for-refund/request-for-refund.module').then(m => m.RequestForRefundModule), canActivate: [authGuard] },
      { path: 'dashboard', loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule), canActivate: [authGuard] },
      { path: 'profile', loadChildren: () => import('./modules/profile/profile.module').then(m => m.ProfileModule), canActivate: [authGuard] },
    ]
  }  ,
  { path: '**', component: NotFoundComponent } // Wildcard route should be the last route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
