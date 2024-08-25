import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeLayoutComponent } from './home-layout/home-layout.component';
import { SignupComponent } from './signup/signup.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { authGuard } from './shared/services/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  {
    path: '',
    component: HomeLayoutComponent,
    canActivate: [authGuard],  // Applying guard to HomeLayout and child routes
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'sif',
        loadChildren: () => import('./modules/salary-info-file/salary-info-file.module').then(m => m.SalaryInfoFileModule)
      },
      {
        path: 'pif',
        loadChildren: () => import('./modules/personal-information-file/personal-information-file.module').then(m => m.PersonalInformationFileModule)
      },
      {
        path: 'prf',
        loadChildren: () => import('./modules/personal-relationship-file/personal-relationship-file.module').then(m => m.PersonalRelationshipFileModule)
      },
      {
        path: 'dif',
        loadChildren: () => import('./modules/department-information-file/deparment-file.module').then(m => m.DeparmentFileModule)
      },
      {
        path: 'ack-nck',
        loadChildren: () => import('./modules/ack-nck/ack-nck.module').then(m => m.AckNckModule)
      },
      {
        path: 'dcr',
        loadChildren: () => import('./modules/dcr/dcr.module').then(m => m.DcrModule)
      },
      {
        path: 'rfr',
        loadChildren: () => import('./modules/request-for-refund/request-for-refund.module').then(m => m.RequestForRefundModule)
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('./modules/profile/profile.module').then(m => m.ProfileModule)
      },
    ]
  },
  { path: '**', component: NotFoundComponent } // Wildcard route should be the last route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
