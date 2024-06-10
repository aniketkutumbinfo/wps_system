import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeLayoutComponent } from './home-layout/home-layout.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'login', pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component: HomeLayoutComponent,
    children: [
      {
        path: '', redirectTo: 'sif', pathMatch: 'full'
      },
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
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
